# Flightlanes — Complete Project Documentation
### Every file and folder explained in simple words

---

## 📁 ROOT FILES (Project Configuration)

### `package.json`
**What it does:** Lists all the software packages (dependencies) your project needs to run.
**Key packages:**
- `next` — The framework that powers the website (Next.js 14)
- `react` / `react-dom` — The library that builds the user interface
- `bootstrap` — CSS framework for grids, utility classes like `d-flex`, `col-6`, `row`
- `mongodb` / `mongoose` — Database connection for storing/fetching hotel data, bookings
**Commands:**
- `npm run dev` — Start the site locally at http://localhost:3000
- `npm run build` — Build for production
- `npm start` — Run the production build

### `jsconfig.json`
**What it does:** Tells Next.js that `@/` means `./src/`. So when you write `import X from '@/components/search/SearchBox'`, it actually looks in `./src/components/search/SearchBox`.
**Why it matters:** Without this, every import would need ugly relative paths like `../../components/search/SearchBox`.

### `next.config.js`
**What it does:** Configures Next.js settings. Currently allows loading images from any external URL (Unsplash, etc.) using `remotePatterns`.
**When to edit:** If you want to add redirects, environment variables, or restrict image domains.

### `.env.local`
**What it does:** Stores SECRET values that should never be shared publicly.
**Contains:**
- `MONGODB_URL` — Your MongoDB Atlas connection string
- `NEXT_PUBLIC_BASE_URL` — Your site URL (http://localhost:3000 for local)
- `NEXT_PUBLIC_FLIGHT_URL` — External flight API endpoint
- `NEXT_PUBLIC_CAR_API` — External car API endpoint
**Important:** Variables starting with `NEXT_PUBLIC_` are visible in the browser. Others are server-only.

---

## 📁 `src/app/` — PAGES (What users see)

In Next.js 14, **every `page.js` file inside `src/app/` becomes a URL on your site.** The folder path = the URL.

### `src/app/layout.js` — THE MASTER LAYOUT
**What it does:** Wraps EVERY page on the entire site. Think of it as the "frame" around every page.
**What it renders:**
```
<html>
  <body>
    <Navbar />          ← Top navigation bar (on every page)
    {children}          ← Whatever page the user is on
    <Footer />          ← Bottom footer (on every page)
    <ChatButton />      ← Floating chat widget
    <FadeUpObserver />  ← Scroll animation handler
    <BootstrapClient /> ← Loads Bootstrap JS for dropdowns/modals
  </body>
</html>
```
**Imports:**
- `bootstrap/dist/css/bootstrap.min.css` — Bootstrap CSS (needed for hotel module, booking pages)
- `./globals.css` — Your custom CSS (all 3,993 lines)
**When to edit:** To add a new global element (like a banner), change fonts, or add analytics scripts.

### `src/app/globals.css` — THE MASTER STYLESHEET (3,993 lines)
**What it does:** Contains ALL the CSS for the entire site. Every class used anywhere comes from here.
**Sections inside:**
1. **CSS Variables** (`:root`) — Colors like `--teal`, `--orange`, `--gold`, font sizes, border radius
2. **Nav CSS** — `.nav-inner`, `.logo`, `.nav-links`, `.btn-cta`, `.hamburger`, `.mobile-menu`
3. **Hero CSS** — `.hero`, `.hero-bg`, `.hero-grad`, `.hero-content`, `.hero-badge`
4. **Search Box CSS** — `.search-box`, `.search-tabs`, `.search-tab`, `.search-form`, `.search-row`, `.form-group`, `.search-btn`, `.trip-pills`
5. **Listing / Results CSS** — `.rl-layout`, `.rl-filters`, `.rl-summary-bar`
6. **Flight Card CSS** — `.fl-card`, `.fl-card-airline`, `.fl-price`
7. **Car Card CSS** — `.car-card`, `.car-img-col`, `.car-body`, `.car-price-col`
8. **Cruise Card CSS** — `.crs-card`, `.crs-img`, `.crs-body`, `.crs-price-col`
9. **Package Card CSS** — `.pkg-result-card`, `.pkg-res-img`, `.pkg-res-body`
10. **Detail Page CSS** — `.hd-widget`, `.hd-wg-head`, `.wg-breakdown`, `.wg-cta`, `.wg-guarantees`
11. **Booking CSS** — `.bkp-card`, `.bkp-stepbar`, `.bkp-step`, `.bkp-confirmed-circle`
12. **Hotel Module CSS** — `.ht-card`, `.ht-card-outer`, `.ht-price-main`, `.hd-gallery-layout`
13. **Footer CSS** — `footer`, `.footer-grid`, `.footer-brand`
14. **Room & Guest Picker CSS** — `.rg-overlay`, `.rg-card`, `.rg-room`, `.rg-counter`, `.rg-btn`
15. **Autocomplete CSS** — `.destination-suggestions`, `.airport-suggestions`
16. **Responsive breakpoints** — `@media(max-width:900px)`, `@media(max-width:640px)`

**How to edit:** Search for the class name you want to change. For example, to change the orange button color, search `.btn-cta` or `.search-btn`.

### `src/app/page.js` — HOMEPAGE (`/`)
**URL:** `http://localhost:3000/`
**What it renders:** The main homepage with 20+ sections — Hero with SearchBox, TrustStrip, Deals, Destinations, Stats, WhyUs, Gallery, Trending, Reviews, FAQ, Newsletter, etc.
**Imports from:** `@/components/homepage/` (each section is its own component)

---

## 📁 FLIGHT MODULE

### `src/app/flights/page.js` — Flight Landing (`/flights`)
**What it shows:** Hero section with SearchBox (defaultTab="flights"), plus flight-specific sections like TrustStrip, DealsTicker, PopularRoutes, CompareTable, WhySection, TipsSection, ReviewsSection, CTASection.
**Search behavior:** SearchBox opens with Flights tab active. Clicking "Search Flights" goes to `/flights/results`.

### `src/app/flights/results/page.js` — Flight Results (`/flights/results`)
**What it shows:** Summary bar at top, FilterSidebar on left (price, stops, airlines, departure time), FlightCard list on right.
**Key components:** `SummaryBar`, `FilterSidebar`, `FlightCard`

### `src/app/flights/booking/[id]/page.js` — Flight Booking (`/flights/booking/abc123`)
**What it shows:** 4-step booking flow — Passenger Details → Seat Selection → Payment → Confirmation.
**The `[id]`:** The square brackets mean this is a dynamic route. The `id` part comes from the URL. So `/flights/booking/flight-123` passes `id = "flight-123"` to the page.

### `src/app/flights/flightlanding.css` — Extra CSS for flight landing page

---

## 📁 HOTEL MODULE

### `src/app/hotels/page.js` — Hotel Landing (`/hotels`)
**What it shows:** Hero with SearchBox (defaultTab="hotels"), then 13 hotel-specific sections: TrustStrip, DealsTicker, Stats, Destinations, Deals, FeaturedHotels, WhyUs, Gallery, Reviews, Guides, Loyalty, Newsletter.

### `src/app/hotels/listing/page.js` — Hotel Listing (`/hotels/listing`)
**What it shows:** Summary bar, filter sidebar (price slider, star rating, property type, amenities), and hotel cards.
**Filtering:** Uses `useMemo` to filter hotels by `maxPrice` and `minStars` in real-time. Also sorts by recommended/price/rating.
**Data source:** Tries to fetch from API first. If API fails, falls back to `generateClientHotels()` which creates dummy data.

### `src/app/hotels/[id]/page.js` — Hotel Detail (`/hotels/grand-paris-1`)
**What it shows:** Photo gallery, hotel info, amenities grid, room options, policies, reviews.
**Right side widget:** Full booking widget with check-in/out dates, room type selector, price breakdown, "Reserve Now" CTA, guarantees.
**Important:** Uses `useParams()` hook (not `use(params)`) for Next.js 14 compatibility.

### `src/app/hotels/booking/page.js` — Hotel Booking (`/hotels/booking`)
**What it shows:** 4-step flow — Guest Info → Room Preferences → Payment → Confirmation (step 4 with green checkmark, booking reference code, perks, "what happens next").

---

## 📁 CAR MODULE

### `src/app/cars/page.js` — Car Landing (`/cars`)
Hero with SearchBox (defaultTab="cars") + CarLandingSections.

### `src/app/cars/results/page.js` — Car Results (`/cars/results`)
Filter sidebar (price, car type, company, features) + CarCard grid.

### `src/app/cars/detail/[id]/page.js` — Car Detail (`/cars/detail/car-1`)
Full specs, included features, insurance options (Basic/Full/Premium with live pricing), rental policies, reviews.
**Right widget:** Pick-up/drop-off dates, vehicle display, insurance selector, price breakdown, "Book Now" CTA, guarantees, help box.

### `src/app/cars/booking/[id]/page.js` — Car Booking (`/cars/booking/car-1`)
4-step booking flow.

---

## 📁 CRUISE MODULE

### `src/app/cruises/page.js` — Cruise Landing (`/cruises`)
### `src/app/cruises/results/page.js` — Cruise Results (`/cruises/results`)
### `src/app/cruises/detail/[id]/page.js` — Cruise Detail (`/cruises/detail/cruise-1`)
Ship info, onboard highlights, cabin options (Interior/Ocean View/Balcony/Suite), policies, reviews.
**Right widget:** Departure date, guest selector, cabin type, price breakdown, "Book Now" CTA, guarantees.

### `src/app/cruises/booking/[id]/page.js` — Cruise Booking

---

## 📁 PACKAGE MODULE

### `src/app/packages/page.js` — Package Landing (`/packages`)
### `src/app/packages/results/page.js` — Package Results (`/packages/results`)
### `src/app/packages/detail/[id]/page.js` — Package Detail (`/packages/detail/pkg-1`)
### `src/app/packages/booking/[id]/page.js` — Package Booking

---

## 📁 `src/app/api/` — BACKEND API ROUTES

In Next.js, any `route.js` file inside `src/app/api/` becomes an API endpoint. These run on the SERVER, not the browser.

### `src/app/api/flights/route.js`
**URL:** `GET /api/flights`
**Does:** Returns flight search results. Uses `flightUtils.js` to generate/fetch flight data.

### `src/app/api/hotels/route.js`
**URL:** `GET /api/hotels`
**Does:** Returns list of hotels. Connects to MongoDB via `mongoose` to query the `Hotel` model.

### `src/app/api/hotels/[id]/route.js`
**URL:** `GET /api/hotels/grand-paris-1`
**Does:** Returns a single hotel by ID.

### `src/app/api/cars/route.js`
**URL:** `GET /api/cars`
**Does:** Returns car rental results using `carUtils.js`.

### `src/app/api/cruises/route.js`
**URL:** `GET /api/cruises`
**Does:** Returns cruise results using `cruiseUtils.js`.

### `src/app/api/packages/route.js`
**URL:** `GET /api/packages`
**Does:** Returns vacation package results using `packageUtils.js`.

### `src/app/api/bookings/flights/route.js` (and cars, cruises, hotels, packages)
**URL:** `POST /api/bookings/flights`
**Does:** Saves a booking to the database. Each module has its own booking endpoint.

### `src/app/api/search/route.js`
**URL:** `GET /api/search`
**Does:** General search endpoint for flights.

### `src/app/api/cities/route.js`
**URL:** `GET /api/cities`
**Does:** Returns list of cities for hotel search autocomplete.

### `src/app/api/proxy/hotels/route.js` and `[id]/route.js`
**Does:** Proxy endpoints that fetch hotel data from external APIs and pass it through.

---

## 📁 `src/components/` — REUSABLE UI PIECES

### `src/components/search/SearchBox.jsx` — THE UNIFIED SEARCH ENGINE
**Used on:** Homepage, /flights, /hotels, /cars, /packages, /cruises (all 6 pages)
**How to use:** `<SearchBox defaultTab="flights" />`
**What it contains:**
- 5 tabs (Flights, Hotels, Cars, Packages, Cruises) — clicking a tab on homepage switches forms; on other pages navigates to that module
- Flights form: From/To with airport autocomplete, Depart/Return dates, Travelers dropdown, Trip type pills
- Hotels form: Destination autocomplete, Check-in/out dates, MakeMyTrip-style Room & Guest picker
- Cars form: Location autocomplete, Pick-up/Drop-off dates, Car type dropdown
- Packages form: Airport + Destination autocomplete, Date, Duration, Room & Guest picker
- Cruises form: Destination autocomplete, Date, Duration, Guests dropdown
**To add a new tab:** Add entry to `TABS` array and `TAB_ICONS`, add `SEARCH_ROUTES` entry, add new panel `{activeTab === 'newtab' && (...)}`.

### `src/components/navbar/Navbar.jsx` + `Navbar.css`
**Used by:** `layout.js` (appears on every page)
**What it shows:** Logo, navigation links (Flights, Hotels, Cars, Packages, Cruises, Deals), Book Now CTA button, hamburger menu for mobile.
**To edit links:** Open `Navbar.jsx` and change the `<Link href="...">` tags.

### `src/components/footer/Footer.jsx` + `Footer.css`
**Used by:** `layout.js` (appears on every page)
**What it shows:** Logo, description, 3 link columns (Travel, Company, Support), social icons, copyright, trust badges.

### `src/components/chatbutton/ChatButton.jsx` + `ChatButton.css`
**What it does:** Floating "Need Help?" chat button in bottom-right corner.

### `src/components/layout/BootstrapClient.js`
**What it does:** Loads Bootstrap JavaScript (for accordion, dropdowns, modals) after the page renders. Marked `'use client'` so it runs in the browser only.

### `src/components/layout/Navbar.js` and `Footer.js`
**What these are:** Alternative versions of Navbar/Footer. The ones actually used are in `src/components/navbar/` and `src/components/footer/` (imported by layout.js).

### `src/components/AuthModal.jsx` + `AuthModal.css`
**What it does:** Login/signup modal popup. Not currently wired to any authentication backend.

### `src/components/FadeUpObserver.jsx` and `src/components/shared/FadeUpObserver.jsx`
**What it does:** Uses `IntersectionObserver` to add `.visible` class to elements with `.fade-up` class when they scroll into view. This creates the "fade up on scroll" animation effect.

---

## 📁 `src/components/homepage/` — HOMEPAGE SECTIONS

Each section is a self-contained component with its own `.jsx` and `.css` file:

| Folder | What it shows |
|--------|--------------|
| `hero/` | The big hero banner with SearchBox |
| `truststrip/` | "2M+ Travelers, 500+ Airlines, 50K+ Hotels" trust numbers |
| `dealsticker/` | Scrolling ticker of current deals |
| `destinations/` | Top destination cards grid |
| `deals/` | Featured deal cards |
| `stats/` | Company statistics |
| `whyus/` | "Why choose Flightlanes" feature cards |
| `gallery/` | Photo gallery grid |
| `trending/` | Trending destinations |
| `guides/` | Travel guide cards |
| `reviews/` | Customer review carousel |
| `loyalty/` | Loyalty program section |
| `budgettools/` | Budget planning tools |
| `faq/` | Frequently asked questions accordion |
| `newsletter/` | Email signup form |
| `appdownload/` | App download CTA |
| `howitworks/` | 3-step "How It Works" section |
| `pricealert/` | Price alert signup |
| `pricecomparison/` | Price comparison chart |
| `packages/` | Featured vacation packages |
| `fadeupobserver/` | Scroll animation controller |

**To add a new homepage section:**
1. Create folder: `src/components/homepage/newsection/`
2. Create `NewSection.jsx` and `NewSection.css`
3. Import in `src/app/page.js`: `import NewSection from "@/components/homepage/newsection/NewSection"`
4. Add `<NewSection />` where you want it in the JSX

---

## 📁 `src/components/flights/` — FLIGHT-SPECIFIC COMPONENTS

| File | What it does |
|------|-------------|
| `Hero.js` | Flight landing page hero (not used anymore — replaced by unified SearchBox hero) |
| `SearchBox.js` | Old flight-only search box (not used anymore — replaced by unified one) |
| `AirportInput.js` | Airport autocomplete input with 38 airports |
| `TravelerPicker.js` | Passenger count/class selector modal |
| `FilterSidebar.js` | Left sidebar filters for results page (price, stops, airlines, times) |
| `FlightCard.js` | Individual flight result card (airline, times, duration, price) |
| `SummaryBar.js` | Top bar on results showing search parameters |
| `FlexibleDates.js` | Flexible date picker component |
| `PopularRoutes.js` | Popular routes section for landing page |
| `LandingSections.js` | Exports `TrustStrip`, `DealsTicker`, `StatsSection` for flight landing |
| `FlightLandingSections.js` | Exports `CompareTable`, `WhySection`, `TipsSection`, `ReviewsSection`, `CTASection` |

---

## 📁 `src/components/hotels/landing/` — HOTEL LANDING SECTIONS

13 section components (Deals, DealsTicker, Destinations, FeaturedHotels, Gallery, Guides, HeroSearch, Loyalty, Newsletter, Reviews, Stats, TrustStrip, WhyUs) — each renders a section on the hotel landing page.

---

## 📁 `src/components/cars/` — CAR-SPECIFIC COMPONENTS

| File | What it does |
|------|-------------|
| `CarHero.js` | Old car hero (replaced by unified SearchBox hero) |
| `CarSearchBox.js` | Old car-only search box (replaced by unified one) |
| `CarCard.js` | Car result card (image, specs, price) |
| `CarFilterSidebar.js` | Left sidebar filters (price, type, company, features) |
| `CarLandingSections.js` | Below-hero sections for car landing page |

---

## 📁 `src/components/cruises/` — CRUISE-SPECIFIC COMPONENTS

| File | What it does |
|------|-------------|
| `CruiseSearchBox.js` | Old cruise-only search box (replaced by unified one) |
| `CruiseCard.js` | Cruise result card |
| `CruiseFilterSidebar.js` | Left sidebar filters |
| `CruiseLandingSections.js` | Below-hero sections |

---

## 📁 `src/components/packages/` — PACKAGE-SPECIFIC COMPONENTS

| File | What it does |
|------|-------------|
| `PackageSearchBox.js` | Old package-only search box (replaced by unified one) |
| `PackageCard.js` | Package result card |
| `PackageFilterSidebar.js` | Left sidebar filters |
| `PackageLandingSections.js` | Below-hero sections |

---

## 📁 `src/components/shared/` — SHARED COMPONENTS

| File | What it does |
|------|-------------|
| `AirportInput.js` | Autocomplete input for airports (used by old package search) |
| `DestinationInput.js` | Autocomplete input for destinations (used by old cruise/package search) |
| `LocationInput.js` | Autocomplete input for car rental locations |
| `FadeUpObserver.jsx` | Scroll animation observer |

**Note:** These shared inputs are still used by the old module-specific search boxes (CarSearchBox, CruiseSearchBox, PackageSearchBox). The new unified SearchBox has its own built-in autocomplete.

---

## 📁 `src/lib/` — UTILITY / HELPER FILES

### `mongodb.js`
**What it does:** Creates and caches a MongoDB connection. Every API route that needs the database imports this.
**Key function:** `connectDB()` — returns a mongoose connection.

### `flightUtils.js`
**What it does:** Contains flight data generation — dummy airlines, routes, pricing. Used by `/api/flights`.

### `carUtils.js`
**What it does:** Contains car rental data — vehicle types, companies, pricing. Used by `/api/cars`.
**Exports:** `CAR_TYPES`, `RENTAL_COMPANIES`, `generateCars()`, etc.

### `cruiseUtils.js`
**What it does:** Contains cruise data — cruise lines, ships, itineraries. Used by `/api/cruises`.
**Exports:** `CRUISE_DESTINATIONS`, `CRUISE_LINES`, `generateCruises()`, etc.

### `packageUtils.js`
**What it does:** Contains vacation package data — destinations, pricing. Used by `/api/packages`.
**Exports:** `DESTINATIONS`, `generatePackages()`, etc.

### `clientFallback.js`
**What it does:** Generates dummy hotel data when the MongoDB API is unavailable.
**Key function:** `generateClientHotels(city, count)` — returns array of hotel objects with name, stars, price, score, images, amenities, rooms.

### `dummyHotels.js`
**What it does:** Static array of sample hotel data for seeding the database.

---

## 📁 `src/models/` — DATABASE MODELS

### `Hotel.js`
**What it does:** Defines the MongoDB schema for hotels — name, city, stars, price, images, amenities, rooms, score, etc.
**Used by:** `/api/hotels` and `/api/hotels/[id]`

### `Booking.js`
**What it does:** Defines the MongoDB schema for bookings — type, guestInfo, price, dates, status, etc.
**Used by:** All `/api/bookings/*` routes

---

## 🔄 HOW EVERYTHING CONNECTS

### User visits `/` (Homepage):
```
layout.js (Navbar + Footer)
  └── page.js (Homepage)
       └── Hero.jsx
            └── SearchBox.jsx (defaultTab="flights")
                 └── User clicks "Hotels" tab → switches to hotel form
                 └── User clicks "Search Hotels" → router.push('/hotels/listing')
```

### User visits `/hotels` (Hotel Landing):
```
layout.js (Navbar + Footer)
  └── hotels/page.js
       └── <section className="hero">
            └── SearchBox.jsx (defaultTab="hotels")
       └── TrustStrip, DealsTicker, Stats... (13 sections)
```

### User visits `/hotels/listing` (Search Results):
```
layout.js
  └── hotels/listing/page.js
       ├── Summary bar (city, dates, guests)
       ├── Filter sidebar (price slider, stars, amenities)
       └── Hotel cards (filtered by maxPrice + minStars via useMemo)
            └── Click a card → goToDetail() → /hotels/[id]
```

### User visits `/hotels/grand-paris-1` (Hotel Detail):
```
layout.js
  └── hotels/[id]/page.js
       ├── Gallery (hero image + thumbnails)
       ├── Hotel info (name, stars, score, location)
       ├── Room options (table with "Select" buttons)
       └── Right widget (dates, room selector, breakdown, Reserve Now → /hotels/booking)
```

---

## 🆕 HOW TO ADD A NEW MODULE (e.g. "Activities")

### Step 1: Create Pages
```
src/app/activities/page.js          ← Landing page
src/app/activities/results/page.js  ← Results/listing
src/app/activities/detail/[id]/page.js ← Detail page
src/app/activities/booking/[id]/page.js ← Booking flow
```

### Step 2: Create API Route
```
src/app/api/activities/route.js     ← Returns activity data
src/app/api/bookings/activities/route.js ← Saves bookings
```

### Step 3: Create Components
```
src/components/activities/ActivityCard.js
src/components/activities/ActivityFilterSidebar.js
src/components/activities/ActivityLandingSections.js
```

### Step 4: Create Data Utility
```
src/lib/activityUtils.js            ← Activity types, pricing, generation
```

### Step 5: Add to SearchBox
Open `src/components/search/SearchBox.jsx`:
1. Add to `TABS`: `{ id: 'activities', label: 'Activities', href: '/activities' }`
2. Add to `TAB_ICONS`: `activities: <svg>...</svg>`
3. Add to `SEARCH_ROUTES`: `activities: '/activities/results'`
4. Add new panel: `{activeTab === 'activities' && (<div className="search-form">...</div>)}`

### Step 6: Add CSS
Add activity-specific CSS classes to `src/app/globals.css`.

### Step 7: Add to Navbar
Open `src/components/navbar/Navbar.jsx` and add a new `<Link>` in the nav-links.

---

## 🎨 HOW TO CHANGE DESIGN

### Change colors:
Edit CSS variables at the top of `globals.css`:
```css
:root {
  --teal: #006D77;    /* Primary color */
  --orange: #FF6B35;  /* CTA button color */
  --gold: #F4A261;    /* Accent color */
  --cream: #FFF2E8;   /* Warm background */
  --ice: #E7F7F7;     /* Cool background */
}
```

### Change fonts:
1. Update the Google Fonts `<link>` in `layout.js`
2. Update font-family in `globals.css`: `body { font-family: 'Your Font'; }` and `h1,h2,h3,h4 { font-family: 'Your Display Font'; }`

### Change SearchBox appearance:
- Tab style: `.search-tab` in globals.css
- Button color: `.search-btn` in globals.css
- Form fields: `.form-group input` in globals.css
- Room picker: `.rg-*` classes in globals.css

---

## ⚡ KEY CONCEPTS

### `'use client'` at top of a file
Means this component runs in the browser (can use useState, useEffect, onClick, etc.). Without it, the component runs on the server only.

### `[id]` in folder names
Dynamic route parameter. `hotels/[id]/page.js` matches any URL like `/hotels/abc`, `/hotels/123`, etc. Access the value with `useParams()`.

### `export const metadata = {...}`
Sets the page title and description for SEO. Only works in server components (files WITHOUT `'use client'`).

### `useRouter()` / `router.push()`
Navigates to another page programmatically (e.g., when user clicks "Search").

### `useSearchParams()`
Reads URL query parameters. For example, `/hotels/listing?city=Paris` → `searchParams.get('city')` returns `"Paris"`.

### `useParams()`
Reads dynamic route parameters. For example, `/hotels/grand-paris-1` → `params.id` returns `"grand-paris-1"`.

---

## 📊 SITE MAP

```
/                           ← Homepage (Hero + SearchBox + 20 sections)
├── /flights                ← Flight landing (Hero + SearchBox + sections)
│   ├── /flights/results    ← Flight search results
│   └── /flights/booking/[id] ← Flight booking (4 steps)
├── /hotels                 ← Hotel landing (Hero + SearchBox + 13 sections)
│   ├── /hotels/listing     ← Hotel search results (with filters)
│   ├── /hotels/[id]        ← Hotel detail + booking widget
│   └── /hotels/booking     ← Hotel booking (4 steps)
├── /cars                   ← Car landing (Hero + SearchBox + sections)
│   ├── /cars/results       ← Car search results
│   ├── /cars/detail/[id]   ← Car detail + booking widget
│   └── /cars/booking/[id]  ← Car booking (4 steps)
├── /cruises                ← Cruise landing (Hero + SearchBox + sections)
│   ├── /cruises/results    ← Cruise search results
│   ├── /cruises/detail/[id] ← Cruise detail + booking widget
│   └── /cruises/booking/[id] ← Cruise booking (4 steps)
├── /packages               ← Package landing (Hero + SearchBox + sections)
│   ├── /packages/results   ← Package search results
│   ├── /packages/detail/[id] ← Package detail + booking widget
│   └── /packages/booking/[id] ← Package booking (4 steps)
└── /api/                   ← Backend API (not visible to users)
    ├── /api/flights        ← Flight data
    ├── /api/hotels         ← Hotel data
    ├── /api/cars           ← Car data
    ├── /api/cruises        ← Cruise data
    ├── /api/packages       ← Package data
    ├── /api/bookings/*     ← Save bookings
    ├── /api/cities         ← City list
    ├── /api/search         ← General search
    └── /api/proxy/hotels/* ← Hotel API proxy
```
