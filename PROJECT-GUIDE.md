# Flightlanes Admin + Blog Automation — Complete Project Guide

This document explains **every file** in the project, how they connect, and how to make changes.

---

## Quick Setup (5 minutes)

```bash
tar -xzf flightlanes-with-admin.tar.gz && cd flightlanes-final
npm install
cp .env.example .env.local   # then fill in your values
node --env-file=.env.local scripts/seed.js
npm run dev
# Site:  http://localhost:3000
# Admin: http://localhost:3000/admin
```

---

## Where to add API keys

Open `.env.local` and fill in each value:

```env
MONGODB_URL=mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/flightlanes
JWT_SECRET=<run: openssl rand -hex 32>
CLOUDINARY_CLOUD_NAME=<your cloud name>
CLOUDINARY_API_KEY=<your api key>
CLOUDINARY_API_SECRET=<your api secret>

# ⭐ CLAUDE API KEY — get from https://console.anthropic.com/settings/keys
ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxx

UNSPLASH_ACCESS_KEY=<from https://unsplash.com/developers>
BLOG_INGEST_SECRET=<run: openssl rand -hex 32>
```

Add these SAME values in Vercel → Settings → Environment Variables before deploying.

---

## Google Sheet Setup (Blog Automation)

### Step 1: Create the sheet

1. Go to https://sheets.new → name it "Flightlanes Blog Queue"
2. Row 1 headers: Title | Category | Publish | Status | Published URL | Notes
3. Column C → Insert → Checkbox
4. Column B → Data → Data Validation → Dropdown: Destinations, Flights, Hotels, Cars, Packages, Cruises, Tips, Deals

### Step 2: Add Apps Script

Extensions → Apps Script → delete placeholder → paste:

```javascript
const API_URL = "https://flightlanes.vercel.app/api/blogs/generate";
const API_SECRET = "PASTE-YOUR-BLOG_INGEST_SECRET-HERE";

function onEditInstallable(e) {
  const sheet = e.source.getActiveSheet();
  const range = e.range;
  if (range.getColumn() !== 3 || range.getRow() < 2 || e.value !== "TRUE") return;

  const row = range.getRow();
  const title = sheet.getRange(row, 1).getValue();
  const category = sheet.getRange(row, 2).getValue();
  if (!title || !category) {
    sheet.getRange(row, 4).setValue("Error: title and category required");
    sheet.getRange(row, 3).setValue(false);
    return;
  }

  sheet.getRange(row, 4).setValue("Generating...");
  SpreadsheetApp.flush();

  try {
    const response = UrlFetchApp.fetch(API_URL, {
      method: "post", contentType: "application/json",
      headers: { Authorization: "Bearer " + API_SECRET },
      payload: JSON.stringify({ title, category }),
      muteHttpExceptions: true,
    });
    const data = JSON.parse(response.getContentText());
    if (response.getResponseCode() === 200 && data.success) {
      sheet.getRange(row, 4).setValue("Published");
      sheet.getRange(row, 5).setValue(data.url);
      sheet.getRange(row, 6).setValue("Done in " + Math.round(data.durationMs/1000) + "s");
    } else {
      sheet.getRange(row, 4).setValue("Failed");
      sheet.getRange(row, 6).setValue(data.error || "Unknown error");
      sheet.getRange(row, 3).setValue(false);
    }
  } catch (err) {
    sheet.getRange(row, 4).setValue("Error");
    sheet.getRange(row, 6).setValue(err.toString());
    sheet.getRange(row, 3).setValue(false);
  }
}
```

### Step 3: Create installable trigger (CRITICAL)

Simple onEdit CANNOT make HTTP calls. You MUST use an installable trigger:
1. Apps Script → sidebar → Triggers (clock icon)
2. "+ Add Trigger" → function: onEditInstallable → Event: On edit
3. Save → Authorize when prompted

### Step 4: Test

Row 2: any title + category → tick Publish → wait ~40s → column D shows "Published" + column E shows live URL.

---

## Complete File Map

### Root Config

| File | Purpose |
|------|---------|
| `middleware.js` | Protects /admin/* routes. Redirects to /admin/login if no valid JWT cookie. Uses `jose` library (Edge-compatible). |
| `.env.example` | Template for all environment variables needed |
| `next.config.js` | Image domain allowlist (unsplash, cloudinary, etc.) |
| `jsconfig.json` | Enables `@/` import alias → maps to `./src/` |
| `scripts/seed.js` | One-time script: populates MongoDB with 20 airlines + 11 destinations |

### src/lib/ — Shared Utilities

| File | What it does | Used by | Env vars |
|------|-------------|---------|----------|
| `mongodb.js` | Connects to MongoDB with connection caching | Every API route that touches DB | `MONGODB_URL` |
| `auth.js` | JWT create/verify helpers | All /api/admin/* routes, /api/auth/* | `JWT_SECRET` |
| `claude.js` | Sends prompt to Claude API, returns structured blog JSON | /api/blogs/generate | `ANTHROPIC_API_KEY` |
| `unsplash.js` | Searches Unsplash for travel photos | /api/blogs/generate | `UNSPLASH_ACCESS_KEY` |

### src/models/ — Database Schemas

| Model | Key fields | Used by |
|-------|-----------|---------|
| `User.js` | name, email, password (hashed), role | /api/auth/* |
| `Airline.js` | name, code, slug, category, badge, heroImg, cardImg, about[], stats[], features[], routes[], quickInfo[], status | /api/admin/airlines/*, /api/public/airlines/* |
| `Destination.js` | name, slug, continent, region, flag, tagline, heroImg, cardImg, about[], stats[], highlights[], tips[], quickInfo[], status | /api/admin/destinations/*, /api/public/destinations/* |
| `Blog.js` | title, slug, category, categoryIcon, excerpt, content (HTML), heroImage {url,alt,credit}, author, readingTime, faqs[], metaTitle, metaDescription, keywords[], status | /api/admin/blogs/*, /api/public/blogs/*, /api/blogs/generate |

### src/app/api/ — API Routes

**Auth (no protection):**

| Route | Method | What it does |
|-------|--------|-------------|
| `/api/auth/signup` | POST | Creates user with hashed password, returns JWT cookie |
| `/api/auth/login` | POST | Verifies password, returns JWT cookie |
| `/api/auth/me` | GET | Returns current user from cookie (or 401) |
| `/api/auth/logout` | POST | Clears JWT cookie |

**Admin (protected — require login):**

| Route | Methods | What it does |
|-------|---------|-------------|
| `/api/admin/airlines` | GET, POST | List all airlines / Create new |
| `/api/admin/airlines/[id]` | GET, PUT, DELETE | Read / Update / Delete single airline |
| `/api/admin/destinations` | GET, POST | List all / Create new |
| `/api/admin/destinations/[id]` | GET, PUT, DELETE | Read / Update / Delete single |
| `/api/admin/blogs` | GET, POST | List all / Create new |
| `/api/admin/blogs/[id]` | GET, PUT, DELETE | Read / Update / Delete single |
| `/api/admin/stats` | GET | Dashboard counts + recent items |
| `/api/admin/upload` | POST | Upload image to Cloudinary, return URL |

**Public (no auth, read-only):**

| Route | What it does |
|-------|-------------|
| `/api/public/airlines` | Published airlines (used by /airlines page) |
| `/api/public/airlines/[slug]` | Single airline by slug (used by /airlines/delta detail page) |
| `/api/public/destinations` | Published destinations |
| `/api/public/destinations/[slug]` | Single destination by slug |
| `/api/public/blogs` | Published blogs |
| `/api/public/blogs/[slug]` | Single blog by slug |

**Blog generation (protected by BLOG_INGEST_SECRET):**

| Route | What it does |
|-------|-------------|
| `/api/blogs/generate` | THE BRAIN: Claude → Unsplash → Cloudinary → MongoDB. Called by Google Apps Script. |

### src/app/admin/ — Admin Panel Pages

| File | What it renders |
|------|----------------|
| `layout.js` | Admin shell: dark sidebar, topbar, user info. Hides site navbar/footer. Manages auth state. |
| `page.js` | Redirects /admin → /admin/dashboard |
| `login/page.js` | Login + signup form |
| `dashboard/page.js` | Stats cards (airlines, destinations, blogs count) + recent items |
| `airlines/page.js` | Airlines table + add/edit form with Cloudinary upload |
| `destinations/page.js` | Destinations table + add/edit form with Cloudinary upload |
| `blogs/page.js` | Blogs table + add/edit form with Cloudinary upload |

### src/components/ — Public Frontend

| Component | Page | Fetches from |
|-----------|------|-------------|
| `airlines/AirlinesPage.jsx` | /airlines | /api/public/airlines |
| `airlinedetail/AirlineDetailPage.jsx` | /airlines/[slug] | /api/public/airlines/[slug] |
| `destinations/DestinationsPage.jsx` | /destinations | /api/public/destinations |
| `destinationdetail/DestinationDetailPage.jsx` | /destinations/[slug] | /api/public/destinations/[slug] |
| `blog/BlogPage.jsx` | /blog | /api/public/blogs |
| `blogdetail/BlogDetailPage.jsx` | /blog/[slug] | /api/public/blogs/[slug] |

---

## Data Flow Diagrams

### Admin editing (airlines/destinations/blogs)

```
Admin form → POST/PUT /api/admin/airlines → saves to MongoDB
                                                  ↓
Public page → GET /api/public/airlines → reads from MongoDB → renders
```

### Blog automation (Google Sheet → live post)

```
Google Sheet (user ticks checkbox)
    ↓
Apps Script → POST /api/blogs/generate (with BLOG_INGEST_SECRET)
    ↓
generate/route.js calls:
    ├── claude.js → Claude API → generates blog JSON (title, content, SEO, FAQs)
    ├── unsplash.js → Unsplash API → finds matching travel photo
    ├── cloudinary → uploads photo → returns CDN URL
    └── Blog.create() → saves complete post to MongoDB
    ↓
Returns { success: true, url: "https://flightlanes.vercel.app/blog/..." }
    ↓
Apps Script → writes URL back to sheet column E
    ↓
Visitors → /blog page fetches from /api/public/blogs → shows the new post
```

---

## How to Make Common Changes

**Add a new airline:** Admin → Airlines → Add airline → fill form → Save

**Generate a blog post:** Add row in Google Sheet → tick Publish. Or: Admin → Blogs → Add blog post (manual)

**Change Claude writing style:** Edit `src/lib/claude.js` — modify SYSTEM_PROMPT and buildUserPrompt()

**Add a blog category:** 1) `src/components/blog/BlogPage.jsx` → CATS array, 2) `src/app/admin/blogs/page.js` → ICONS object, 3) Google Sheet dropdown

**Add a field to airlines:** 1) `src/models/Airline.js` add field, 2) admin form add input, 3) detail component render it

**Change image crop size:** Edit `src/app/api/admin/upload/route.js` → transformation array

**Change admin sidebar:** Edit `src/app/admin/layout.js` → nav array (~line 70)

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Apps Script "Unauthorized" | BLOG_INGEST_SECRET in script ≠ .env.local |
| 504 timeout on blog generation | Need Vercel Pro (60s timeout). Free tier = 10s. |
| Admin shows site navbar | CSS selectors in admin layout.js need updating |
| "Mongoose buffering timed out" | MongoDB URI wrong or IP not allowlisted in Atlas |
| Claude returns bad JSON | Re-run. If persistent, strengthen system prompt in claude.js |
| Images don't load on site | Add domain to next.config.js images.remotePatterns |
| Login works locally not on Vercel | Add JWT_SECRET to Vercel env vars |
