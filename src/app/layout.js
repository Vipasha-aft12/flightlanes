import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '@/components/navbar/Navbar';
import './globals.css';
import Footer from '@/components/footer/Footer';
import ChatButton from '@/components/chatbutton/ChatButton';
import FadeUpObserver from '@/components/homepage/fadeupobserver/FadeUpObserver';
import BootstrapClient from '@/components/layout/BootstrapClient';
import { LoadingProvider } from '@/components/loading/LoadingContext';
import LoadingOverlay from '@/components/loading/LoadingOverlay';
import StickyBottom from '@/components/stickybottom/StickyBottom';

export const metadata = {
  title: 'Fareoworld – Book Flights, Hotels & Travel Deals',
  description: 'Fareoworld – Search, compare, and book flights, hotels, car rentals, cruises and holiday packages. Best travel deals for US travelers.',
  keywords: 'cheap flights, book flights, hotel deals, car rentals, holiday packages, cruise deals, travel comparison',
  authors: [{ name: 'Fareoworld Inc.' }],
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Fareoworld – Book Flights, Hotels & Travel Deals',
    description: 'Search, compare, and book flights, hotels, car rentals, cruises and holiday packages. Best travel deals for US travelers.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Fareoworld',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fareoworld – Book Flights, Hotels & Travel Deals',
    description: 'Search, compare, and book flights, hotels, car rentals, cruises and holiday packages.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Open+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      
      <body>
        <LoadingProvider>
          <Navbar />
          {children}
          <Footer />
          <StickyBottom />
          <ChatButton />
          <FadeUpObserver />
          <BootstrapClient />
          <LoadingOverlay />
        </LoadingProvider>
        </body>
    </html>
  );
}
