import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { requireAdmin, verifyAuth } from '@/lib/auth';

/*
 * DELETE /api/admin/users/[id] — remove a user (admin only).
 * Guardrail: you cannot delete your own account.
 * Guardrail: you cannot delete the last remaining admin.
 */
export async function DELETE(request, { params }) {
  const auth = await requireAdmin();
  if (auth instanceof Response) return auth;

  try {
    await dbConnect();
    const { id } = await params;
    const currentUserId = await verifyAuth();

    if (id === currentUserId) {
      return NextResponse.json({ error: 'You cannot delete your own account' }, { status: 400 });
    }

    const target = await User.findById(id);
    if (!target) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    /* If the target is an admin, ensure we keep at least one admin in the system */
    if (target.role === 'admin') {
      const adminCount = await User.countDocuments({ role: 'admin' });
      if (adminCount <= 1) {
        return NextResponse.json(
          { error: 'Cannot delete the last remaining admin' },
          { status: 400 }
        );
      }
    }

    await User.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

/*
 * PUT /api/admin/users/[id] — update a user (admin only).
 * Supports updating name, role, password (optional).
 * Email is intentionally not editable to keep login-log history consistent.
 */
export async function PUT(request, { params }) {
  const auth = await requireAdmin();
  if (auth instanceof Response) return auth;

  try {
    const body = await request.json();
    await dbConnect();
    const { id } = await params;
    const currentUserId = await verifyAuth();

    const user = await User.findById(id);
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    /* Apply permitted updates */
    if (typeof body.name === 'string' && body.name.trim()) user.name = body.name.trim();

    if (body.role === 'admin' || body.role === 'editor') {
      /* Prevent demoting the last admin */
      if (user.role === 'admin' && body.role !== 'admin') {
        const adminCount = await User.countDocuments({ role: 'admin' });
        if (adminCount <= 1) {
          return NextResponse.json(
            { error: 'Cannot demote the last remaining admin' },
            { status: 400 }
          );
        }
        /* Also prevent demoting yourself */
        if (id === currentUserId) {
          return NextResponse.json(
            { error: 'You cannot change your own role' },
            { status: 400 }
          );
        }
      }
      user.role = body.role;
    }

    if (typeof body.password === 'string' && body.password.length > 0) {
      if (body.password.length < 6) {
        return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
      }
      user.password = body.password; /* re-hashed by the pre-save hook */
    }

    await user.save();
    return NextResponse.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        updatedAt: user.updatedAt,
      },
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
