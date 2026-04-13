/* ─── Loading Overlay Configurations ─────────────────────────────
   Each key maps to a loading type used across the site.
   - icon:  emoji shown inside the spinner
   - title: heading text
   - sub:   subtitle text
   - tip:   travel tip shown at bottom
   - dur:   animation duration in ms
   - steps: 3-step checklist labels
   ────────────────────────────────────────────────────────────────── */

const loadingConfig = {
  // ── Flights ──
  'flight-search': {
    icon: '✈', title: 'Searching Flights',
    sub: 'Finding the best fares across 500+ airlines…',
    tip: '💡 Midweek flights (Tue–Thu) are typically 15–20% cheaper.',
    dur: 1800,
    steps: ['Connecting to search engines', 'Scanning 500+ airlines', 'Ranking best prices for you'],
  },
  'flight-results': {
    icon: '✈', title: 'Loading Results',
    sub: 'Almost there — preparing your flight options…',
    tip: '💡 Set a price alert to catch fare drops on this route.',
    dur: 900,
    steps: ['Preparing flight list', 'Applying your filters', 'Almost ready…'],
  },
  'flight-booking': {
    icon: '🔒', title: 'Preparing Booking',
    sub: 'Setting up your secure checkout…',
    tip: '💡 Your payment is protected by 256-bit SSL encryption.',
    dur: 900,
    steps: ['Securing your selection', 'Setting up traveler forms', 'Opening secure checkout'],
  },

  // ── Hotels ──
  'hotel-search': {
    icon: '🏨', title: 'Searching Hotels',
    sub: 'Checking availability across 500,000+ hotels…',
    tip: '💡 Booking 2–3 weeks ahead often gives the best rates.',
    dur: 1800,
    steps: ['Connecting to hotel networks', 'Checking 500,000+ properties', 'Sorting by price & rating'],
  },
  'hotel-results': {
    icon: '🏨', title: 'Loading Hotels',
    sub: 'Almost there — preparing your options…',
    tip: '💡 Free cancellation hotels let you book now, decide later.',
    dur: 900,
    steps: ['Preparing hotel list', 'Applying your filters', 'Almost ready…'],
  },
  'hotel-detail': {
    icon: '🏨', title: 'Loading Hotel Details',
    sub: 'Fetching rooms, amenities and availability…',
    tip: '💡 Check for loyalty discounts — members save up to 25%.',
    dur: 900,
    steps: ['Fetching hotel information', 'Loading rooms & amenities', 'Preparing pricing details'],
  },
  'hotel-booking': {
    icon: '🔒', title: 'Preparing Booking',
    sub: 'Setting up your secure hotel checkout…',
    tip: '💡 Most hotels allow free cancellation up to 48 hours before arrival.',
    dur: 900,
    steps: ['Securing your room', 'Setting up guest details', 'Opening secure checkout'],
  },

  // ── Cars ──
  'car-search': {
    icon: '🚗', title: 'Searching Cars',
    sub: 'Comparing rates from 50+ rental agencies…',
    tip: '💡 Book a size up from your needs — upgrades are often free at pickup.',
    dur: 1800,
    steps: ['Connecting to rental agencies', 'Comparing 50+ suppliers', 'Finding best available rates'],
  },
  'car-results': {
    icon: '🚗', title: 'Loading Cars',
    sub: 'Almost there — preparing your rental options…',
    tip: '💡 Full insurance gives you complete peace of mind on the road.',
    dur: 900,
    steps: ['Preparing car list', 'Applying your filters', 'Almost ready…'],
  },
  'car-detail': {
    icon: '🚗', title: 'Loading Car Details',
    sub: 'Fetching vehicle specs, insurance and pricing…',
    tip: '💡 Return the car with a full tank to avoid refuelling charges.',
    dur: 900,
    steps: ['Fetching vehicle details', 'Checking rental availability', 'Calculating best rates'],
  },
  'car-booking': {
    icon: '🔒', title: 'Preparing Booking',
    sub: 'Setting up your secure rental checkout…',
    tip: '💡 Confirm the fuel policy at pickup to avoid surprises.',
    dur: 900,
    steps: ['Securing your vehicle', 'Setting up driver details', 'Opening secure checkout'],
  },

  // ── Packages ──
  'package-search': {
    icon: '🎁', title: 'Searching Packages',
    sub: 'Building your perfect holiday bundle…',
    tip: '💡 Packages save up to 40% vs booking flights + hotels separately.',
    dur: 1800,
    steps: ['Building your holiday bundle', 'Matching flights & hotels', 'Applying best package deals'],
  },
  'package-results': {
    icon: '🎁', title: 'Loading Packages',
    sub: 'Almost there — preparing your holiday options…',
    tip: '💡 Look for packages that include airport transfers — great value.',
    dur: 900,
    steps: ['Preparing package list', 'Applying your filters', 'Almost ready…'],
  },
  'package-detail': {
    icon: '🎁', title: 'Loading Package Details',
    sub: 'Fetching full itinerary and inclusions…',
    tip: '💡 Travel insurance is strongly recommended for package holidays.',
    dur: 900,
    steps: ['Fetching package itinerary', 'Loading inclusions & upgrades', 'Preparing pricing details'],
  },
  'package-booking': {
    icon: '🔒', title: 'Preparing Booking',
    sub: 'Setting up your secure package checkout…',
    tip: '💡 Your package includes flights, hotel and airport transfers.',
    dur: 900,
    steps: ['Securing your package', 'Setting up traveler details', 'Opening secure checkout'],
  },

  // ── Cruises ──
  'cruise-search': {
    icon: '🚢', title: 'Searching Cruises',
    sub: 'Scanning 1,000+ cruise itineraries for you…',
    tip: '💡 Booking early gets you the best cabin selection and early-bird rates.',
    dur: 1800,
    steps: ['Scanning cruise itineraries', 'Checking cabin availability', 'Finding best sailing deals'],
  },
  'cruise-results': {
    icon: '🚢', title: 'Loading Cruises',
    sub: 'Almost there — preparing your cruise options…',
    tip: '💡 Interior cabins are best value — you spend most time on deck anyway!',
    dur: 900,
    steps: ['Preparing cruise list', 'Applying your filters', 'Almost ready…'],
  },
  'cruise-detail': {
    icon: '🚢', title: 'Loading Cruise Details',
    sub: 'Fetching itinerary, cabins and port stops…',
    tip: '💡 Book shore excursions in advance — popular ones sell out fast.',
    dur: 900,
    steps: ['Fetching cruise itinerary', 'Loading cabins & port stops', 'Preparing pricing details'],
  },
  'cruise-booking': {
    icon: '🔒', title: 'Preparing Booking',
    sub: 'Setting up your secure cruise checkout…',
    tip: '💡 Gratuities are usually charged separately — check your fare.',
    dur: 900,
    steps: ['Securing your cabin', 'Setting up passenger details', 'Opening secure checkout'],
  },

  // ── Activities ──
  'activity-search': {
    icon: '🎯', title: 'Searching Activities',
    sub: 'Finding the best experiences near you…',
    tip: '💡 Small-group tours give you a more personalised experience.',
    dur: 1800,
    steps: ['Finding nearby experiences', 'Checking availability & slots', 'Sorting by rating & price'],
  },
  'activity-results': {
    icon: '🎯', title: 'Loading Activities',
    sub: 'Almost there — preparing your options…',
    tip: '💡 Skip-the-line tickets are worth every penny at popular attractions.',
    dur: 900,
    steps: ['Preparing activity list', 'Applying your filters', 'Almost ready…'],
  },
  'activity-booking': {
    icon: '🔒', title: 'Preparing Booking',
    sub: 'Setting up your secure activity checkout…',
    tip: '💡 Most activities offer free cancellation up to 24 hours before.',
    dur: 900,
    steps: ['Securing your spot', 'Setting up participant details', 'Opening secure checkout'],
  },

  // ── Deals ──
  'deal-flight': {
    icon: '🔥', title: 'Loading Flight Deal',
    sub: 'Fetching live availability for this fare…',
    tip: '💡 Flash fares sell out fast — prices are live and updated every minute.',
    dur: 1200,
    steps: ['Verifying live fare availability', 'Loading flight deal details', 'Almost ready…'],
  },
  'deal-package': {
    icon: '🔥', title: 'Loading Package Deal',
    sub: 'Fetching availability & inclusions…',
    tip: '💡 Packages save up to 40% vs booking each component separately.',
    dur: 1200,
    steps: ['Verifying deal availability', 'Loading package inclusions', 'Almost ready…'],
  },
  'deal-cruise': {
    icon: '🔥', title: 'Loading Cruise Deal',
    sub: 'Checking cabin availability for this sailing…',
    tip: '💡 Early-bird cruise fares can save up to $500 per cabin.',
    dur: 1200,
    steps: ['Checking cabin availability', 'Loading cruise deal details', 'Almost ready…'],
  },
  'deal-booking': {
    icon: '🔒', title: 'Securing Your Deal',
    sub: 'Applying your exclusive discount to checkout…',
    tip: '💡 Your deal price is locked in — complete checkout to confirm.',
    dur: 1100,
    steps: ['Applying your deal discount', 'Setting up traveler details', 'Opening secure checkout'],
  },
};

export default loadingConfig;
