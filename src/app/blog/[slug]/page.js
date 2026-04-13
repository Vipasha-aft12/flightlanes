import { Suspense } from 'react';
import BlogDetailPage from '@/components/blogdetail/BlogDetailPage';

export const metadata = {
  title: 'Blog Post | Flightlanes',
  description: 'Travel tips and guides from our experts.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center py-5"><div className="spinner-border text-teal" /></div>}>
      <BlogDetailPage />
    </Suspense>
  );
}
