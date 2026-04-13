import BudgetTools from "@/components/homepage/budgettools/BudgetTools";
import Deals from "@/components/homepage/deals/Deals";
import DealsTicker from "@/components/homepage/dealsticker/DealsTicker";
import Destinations from "@/components/homepage/destinations/Destinations";
import FAQ from "@/components/homepage/faq/FAQ";
import Gallery from "@/components/homepage/gallery/Gallery";
import Guides from "@/components/homepage/guides/Guides";
import Hero from "@/components/homepage/hero/Hero";
import HowItWorks from "@/components/homepage/howitworks/HowItWorks";
import Loyalty from "@/components/homepage/loyalty/Loyalty";
import Newsletter from "@/components/homepage/newsletter/Newsletter";
import Packages from "@/components/homepage/packages/Packages";
import PriceAlert from "@/components/homepage/pricealert/PriceAlert";
import PriceComparison from "@/components/homepage/pricecomparison/PriceComparison";
import Reviews from "@/components/homepage/reviews/Reviews";
import Stats from "@/components/homepage/stats/Stats";
import Trending from "@/components/homepage/trending/Trending";
import TrustStrip from "@/components/homepage/truststrip/TrustStrip";
import WhyUs from "@/components/homepage/whyus/WhyUs";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: 'Flightlanes – Book Flights, Hotels & Travel Deals',
  description:
    'Search, compare and book flights, hotels, car rentals, cruises and holiday packages at unbeatable prices. Over 2 million happy travelers trust Flightlanes.',
  keywords:
    'cheap flights, book flights online, hotel deals, car rentals, holiday packages, cruise deals, travel comparison, best flight prices',
  authors: [{ name: 'Flightlanes Inc.' }],
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    title: 'Flightlanes – Book Flights, Hotels & Travel Deals',
    description:
      'Search, compare and book flights, hotels, car rentals, cruises and holiday packages. Best travel deals for US travelers.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Flightlanes',
    url: 'https://www.flightlanes.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Flightlanes – Book Flights, Hotels & Travel Deals',
    description:
      'Search, compare and book flights, hotels, car rentals, cruises and holiday packages.',
    site: '@flightlanes',
  },
  alternates: {
    canonical: 'https://www.flightlanes.com',
  },
};

export default function HomePage() {
  return (
    <>
    <section className='homepage'>
      <section className="homepage-top">
        <div className="container-fluid homepage-top-container">
          <div className="row homepage-top-row">
            <div className="col-12 homepage-top-col">
              <Hero />
            </div>
          </div>
        </div>
      </section>
      <section className="homepage-bottom" id="main-content">
        <div className="container-fluid homepage-bottom-container">
          <div className="row homepage-bottom-row">
            <div className="col-12 homepage-bottom-colone">
              <TrustStrip />
            </div>
            <div className="col-12 homepage-bottom-coltwo">
              <DealsTicker />
            </div>
            <div className="col-12 homepage-bottom-colthree">
              <Stats />
            </div>
            <div className="col-12 homepage-bottom-colfour">
              <Destinations />
            </div>
            <div className="col-12 homepage-bottom-colfive">
              <Deals />
            </div>
            <div className="col-12 homepage-bottom-colsix">
              <WhyUs />
            </div>
            <div className="col-12 homepage-bottom-colseven">
              <Packages />
            </div>
            <div className="col-12 homepage-bottom-coleight">
              <Reviews />
            </div>
            <div className="col-12 homepage-bottom-colnine">
              <Gallery />
            </div>
            <div className="col-12 homepage-bottom-colten">
              <Guides />
            </div>
            <div className="col-12 homepage-bottom-coleleven">
              <Loyalty />
            </div>
            <div className="col-12 homepage-bottom-coltwelve">
              <HowItWorks />
            </div>
            <div className="col-12 homepage-bottom-colthirteen">
              <Trending />
            </div>
            <div className="col-12 homepage-bottom-colfourteen">
              <PriceComparison />
            </div>
            <div className="col-12 homepage-bottom-colsixteen">
              <BudgetTools />
            </div>
            <div className="col-12 homepage-bottom-colseventeen">
              <PriceAlert />
            </div>
            <div className="col-12 homepage-bottom-coleighteen">
              <FAQ />
            </div>
            <div className="col-12 homepage-bottom-colnineteen">
              <Newsletter />
            </div>
            
          </div>
        </div>
      </section>
    </section>
    </>
  );
}
