'use client';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useLoading } from '@/components/loading/LoadingContext';

/* ─── Icons ─── */
const SearchIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>;

const TAB_ICONS = {
  flights: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z" /></svg>,
  hotels: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z" /></svg>,
  cars: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" /></svg>,
  packages: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1z" /></svg>,
  cruises: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 21c-1.39 0-2.78-.47-4-1.32-2.44 1.71-5.56 1.71-8 0C6.78 20.53 5.39 21 4 21H2v2h2c1.38 0 2.74-.35 4-.99 2.52 1.29 5.48 1.29 8 0 1.26.65 2.62.99 4 .99h2v-2h-2zM3.95 19H4c1.6 0 3.02-.88 4-2 .98 1.12 2.4 2 4 2s3.02-.88 4-2c.98 1.12 2.4 2 4 2h.05l1.89-6.68c.08-.26.06-.54-.06-.78s-.34-.42-.6-.5L20 10.62V6c0-1.1-.9-2-2-2h-3V1H9v3H6c-1.1 0-2 .9-2 2v4.62l-1.29.42a1.007 1.007 0 0 0-.66 1.28L3.95 19z" /></svg>,
};

const TABS = [
  { id: 'flights', label: 'Flights', href: '/flights' },
  { id: 'hotels', label: 'Hotels', href: '/hotels' },
  { id: 'cars', label: 'Cars', href: '/cars' },
  { id: 'packages', label: 'Packages', href: '/packages' },
  { id: 'cruises', label: 'Cruises', href: '/cruises' },
];

/* ═══════════════════════════════════════
   AIRPORTS — TravelPodium.com Style
   ═══════════════════════════════════════ */
const AIRPORTS = [
  // ── USA Major ──
  { name: 'New York', code: 'JFK', sub: 'John F. Kennedy Intl, NY', icon: '✈️', full: 'New York (JFK)' },
  { name: 'New York', code: 'EWR', sub: 'Newark Liberty Intl, NJ', icon: '✈️', full: 'Newark (EWR)' },
  { name: 'New York', code: 'LGA', sub: 'LaGuardia, NY', icon: '✈️', full: 'New York (LGA)' },
  { name: 'Los Angeles', code: 'LAX', sub: 'Los Angeles Intl, CA', icon: '✈️', full: 'Los Angeles (LAX)' },
  { name: 'Chicago', code: 'ORD', sub: "O'Hare Intl, IL", icon: '✈️', full: 'Chicago (ORD)' },
  { name: 'Dallas', code: 'DFW', sub: 'Dallas/Fort Worth Intl, TX', icon: '✈️', full: 'Dallas (DFW)' },
  { name: 'Denver', code: 'DEN', sub: 'Denver Intl, CO', icon: '✈️', full: 'Denver (DEN)' },
  { name: 'Atlanta', code: 'ATL', sub: 'Hartsfield-Jackson, GA', icon: '✈️', full: 'Atlanta (ATL)' },
  { name: 'San Francisco', code: 'SFO', sub: 'San Francisco Intl, CA', icon: '✈️', full: 'San Francisco (SFO)' },
  { name: 'Seattle', code: 'SEA', sub: 'Seattle-Tacoma Intl, WA', icon: '✈️', full: 'Seattle (SEA)' },
  { name: 'Miami', code: 'MIA', sub: 'Miami Intl, FL', icon: '✈️', full: 'Miami (MIA)' },
  { name: 'Fort Lauderdale', code: 'FLL', sub: 'Fort Lauderdale-Hollywood, FL', icon: '✈️', full: 'Fort Lauderdale (FLL)' },
  { name: 'Orlando', code: 'MCO', sub: 'Orlando Intl, FL', icon: '✈️', full: 'Orlando (MCO)' },
  { name: 'Boston', code: 'BOS', sub: 'Logan Intl, MA', icon: '✈️', full: 'Boston (BOS)' },
  { name: 'Houston', code: 'IAH', sub: 'George Bush Intercontinental, TX', icon: '✈️', full: 'Houston (IAH)' },
  { name: 'Las Vegas', code: 'LAS', sub: 'Harry Reid Intl, NV', icon: '✈️', full: 'Las Vegas (LAS)' },
  { name: 'Phoenix', code: 'PHX', sub: 'Phoenix Sky Harbor, AZ', icon: '✈️', full: 'Phoenix (PHX)' },
  { name: 'Minneapolis', code: 'MSP', sub: 'Minneapolis-Saint Paul, MN', icon: '✈️', full: 'Minneapolis (MSP)' },
  { name: 'Detroit', code: 'DTW', sub: 'Detroit Metropolitan, MI', icon: '✈️', full: 'Detroit (DTW)' },
  { name: 'Philadelphia', code: 'PHL', sub: 'Philadelphia Intl, PA', icon: '✈️', full: 'Philadelphia (PHL)' },
  { name: 'Charlotte', code: 'CLT', sub: 'Charlotte Douglas Intl, NC', icon: '✈️', full: 'Charlotte (CLT)' },
  { name: 'Washington', code: 'IAD', sub: 'Dulles Intl, VA', icon: '✈️', full: 'Washington (IAD)' },
  { name: 'Washington', code: 'DCA', sub: 'Ronald Reagan National, VA', icon: '✈️', full: 'Washington (DCA)' },
  { name: 'Nashville', code: 'BNA', sub: 'Nashville Intl, TN', icon: '✈️', full: 'Nashville (BNA)' },
  { name: 'Austin', code: 'AUS', sub: 'Austin-Bergstrom, TX', icon: '✈️', full: 'Austin (AUS)' },
  { name: 'San Diego', code: 'SAN', sub: 'San Diego Intl, CA', icon: '✈️', full: 'San Diego (SAN)' },
  { name: 'Tampa', code: 'TPA', sub: 'Tampa Intl, FL', icon: '✈️', full: 'Tampa (TPA)' },
  { name: 'Portland', code: 'PDX', sub: 'Portland Intl, OR', icon: '✈️', full: 'Portland (PDX)' },
  { name: 'Salt Lake City', code: 'SLC', sub: 'Salt Lake City Intl, UT', icon: '✈️', full: 'Salt Lake City (SLC)' },
  { name: 'Honolulu', code: 'HNL', sub: 'Daniel K. Inouye Intl, HI', icon: '🌺', full: 'Honolulu (HNL)' },
  { name: 'Anchorage', code: 'ANC', sub: 'Ted Stevens Intl, AK', icon: '🏔', full: 'Anchorage (ANC)' },
  // ── India ──
  { name: 'Delhi', code: 'DEL', sub: 'Indira Gandhi Intl, Delhi', icon: '🇮🇳', full: 'Delhi (DEL)' },
  { name: 'Mumbai', code: 'BOM', sub: 'Chhatrapati Shivaji Maharaj, MH', icon: '🇮🇳', full: 'Mumbai (BOM)' },
  { name: 'Bangalore', code: 'BLR', sub: 'Kempegowda Intl, KA', icon: '🇮🇳', full: 'Bangalore (BLR)' },
  { name: 'Hyderabad', code: 'HYD', sub: 'Rajiv Gandhi Intl, TS', icon: '🇮🇳', full: 'Hyderabad (HYD)' },
  { name: 'Chennai', code: 'MAA', sub: 'Chennai Intl, TN', icon: '🇮🇳', full: 'Chennai (MAA)' },
  { name: 'Kolkata', code: 'CCU', sub: 'Netaji Subhas Chandra Bose, WB', icon: '🇮🇳', full: 'Kolkata (CCU)' },
  { name: 'Ahmedabad', code: 'AMD', sub: 'Sardar Vallabhbhai Patel, GJ', icon: '🇮🇳', full: 'Ahmedabad (AMD)' },
  { name: 'Pune', code: 'PNQ', sub: 'Pune Airport, MH', icon: '🇮🇳', full: 'Pune (PNQ)' },
  { name: 'Goa', code: 'GOI', sub: 'Manohar Intl, Goa', icon: '🇮🇳', full: 'Goa (GOI)' },
  { name: 'Jaipur', code: 'JAI', sub: 'Jaipur Intl, RJ', icon: '🇮🇳', full: 'Jaipur (JAI)' },
  { name: 'Lucknow', code: 'LKO', sub: 'Chaudhary Charan Singh, UP', icon: '🇮🇳', full: 'Lucknow (LKO)' },
  { name: 'Kochi', code: 'COK', sub: 'Cochin Intl, KL', icon: '🇮🇳', full: 'Kochi (COK)' },
  { name: 'Indore', code: 'IDR', sub: 'Devi Ahilyabai Holkar, MP', icon: '🇮🇳', full: 'Indore (IDR)' },
  { name: 'Raipur', code: 'RPR', sub: 'Swami Vivekananda, CG', icon: '🇮🇳', full: 'Raipur (RPR)' },
  { name: 'Bhopal', code: 'BHO', sub: 'Raja Bhoj, MP', icon: '🇮🇳', full: 'Bhopal (BHO)' },
  { name: 'Nagpur', code: 'NAG', sub: 'Dr. Babasaheb Ambedkar, MH', icon: '🇮🇳', full: 'Nagpur (NAG)' },
  { name: 'Chandigarh', code: 'IXC', sub: 'Chandigarh Airport, PB/HR', icon: '🇮🇳', full: 'Chandigarh (IXC)' },
  { name: 'Patna', code: 'PAT', sub: 'Jay Prakash Narayan, BR', icon: '🇮🇳', full: 'Patna (PAT)' },
  { name: 'Ranchi', code: 'IXR', sub: 'Birsa Munda, JH', icon: '🇮🇳', full: 'Ranchi (IXR)' },
  { name: 'Varanasi', code: 'VNS', sub: 'Lal Bahadur Shastri, UP', icon: '🇮🇳', full: 'Varanasi (VNS)' },
  { name: 'Thiruvananthapuram', code: 'TRV', sub: 'Trivandrum Intl, KL', icon: '🇮🇳', full: 'Thiruvananthapuram (TRV)' },
  { name: 'Coimbatore', code: 'CJB', sub: 'Coimbatore Intl, TN', icon: '🇮🇳', full: 'Coimbatore (CJB)' },
  { name: 'Visakhapatnam', code: 'VTZ', sub: 'Visakhapatnam Airport, AP', icon: '🇮🇳', full: 'Visakhapatnam (VTZ)' },
  { name: 'Srinagar', code: 'SXR', sub: 'Sheikh ul-Alam Intl, JK', icon: '🇮🇳', full: 'Srinagar (SXR)' },
  { name: 'Amritsar', code: 'ATQ', sub: 'Sri Guru Ram Dass Jee, PB', icon: '🇮🇳', full: 'Amritsar (ATQ)' },
  { name: 'Guwahati', code: 'GAU', sub: 'Lokpriya Gopinath Bordoloi, AS', icon: '🇮🇳', full: 'Guwahati (GAU)' },
  { name: 'Dehradun', code: 'DED', sub: 'Jolly Grant, UK', icon: '🇮🇳', full: 'Dehradun (DED)' },
  { name: 'Mangalore', code: 'IXE', sub: 'Mangalore Intl, KA', icon: '🇮🇳', full: 'Mangalore (IXE)' },
  { name: 'Madurai', code: 'IXM', sub: 'Madurai Airport, TN', icon: '🇮🇳', full: 'Madurai (IXM)' },
  { name: 'Udaipur', code: 'UDR', sub: 'Maharana Pratap, RJ', icon: '🇮🇳', full: 'Udaipur (UDR)' },
  { name: 'Bhubaneswar', code: 'BBI', sub: 'Biju Patnaik Intl, OD', icon: '🇮🇳', full: 'Bhubaneswar (BBI)' },
  { name: 'Bagdogra', code: 'IXB', sub: 'Bagdogra Airport, WB', icon: '🇮🇳', full: 'Bagdogra (IXB)' },
  { name: 'Jammu', code: 'IXJ', sub: 'Jammu Airport, JK', icon: '🇮🇳', full: 'Jammu (IXJ)' },
  { name: 'Leh', code: 'IXL', sub: 'Kushok Bakula Rimpochee, LDK', icon: '🇮🇳', full: 'Leh (IXL)' },
  { name: 'Agartala', code: 'IXA', sub: 'Maharaja Bir Bikram, TR', icon: '🇮🇳', full: 'Agartala (IXA)' },
  { name: 'Imphal', code: 'IMF', sub: 'Bir Tikendrajit Intl, MN', icon: '🇮🇳', full: 'Imphal (IMF)' },
  { name: 'Dibrugarh', code: 'DIB', sub: 'Dibrugarh Airport, AS', icon: '🇮🇳', full: 'Dibrugarh (DIB)' },
  // ── Europe ──
  { name: 'London', code: 'LHR', sub: 'Heathrow, United Kingdom', icon: '🇬🇧', full: 'London (LHR)' },
  { name: 'London', code: 'LGW', sub: 'Gatwick, United Kingdom', icon: '🇬🇧', full: 'London (LGW)' },
  { name: 'Paris', code: 'CDG', sub: 'Charles de Gaulle, France', icon: '🇫🇷', full: 'Paris (CDG)' },
  { name: 'Frankfurt', code: 'FRA', sub: 'Frankfurt am Main, Germany', icon: '🇩🇪', full: 'Frankfurt (FRA)' },
  { name: 'Amsterdam', code: 'AMS', sub: 'Schiphol, Netherlands', icon: '🇳🇱', full: 'Amsterdam (AMS)' },
  { name: 'Rome', code: 'FCO', sub: 'Fiumicino, Italy', icon: '🇮🇹', full: 'Rome (FCO)' },
  { name: 'Madrid', code: 'MAD', sub: 'Barajas, Spain', icon: '🇪🇸', full: 'Madrid (MAD)' },
  { name: 'Barcelona', code: 'BCN', sub: 'El Prat, Spain', icon: '🇪🇸', full: 'Barcelona (BCN)' },
  { name: 'Munich', code: 'MUC', sub: 'Munich Airport, Germany', icon: '🇩🇪', full: 'Munich (MUC)' },
  { name: 'Zurich', code: 'ZRH', sub: 'Zurich Airport, Switzerland', icon: '🇨🇭', full: 'Zurich (ZRH)' },
  { name: 'Istanbul', code: 'IST', sub: 'Istanbul Airport, Turkey', icon: '🇹🇷', full: 'Istanbul (IST)' },
  { name: 'Lisbon', code: 'LIS', sub: 'Lisbon Airport, Portugal', icon: '🇵🇹', full: 'Lisbon (LIS)' },
  { name: 'Athens', code: 'ATH', sub: 'Eleftherios Venizelos, Greece', icon: '🇬🇷', full: 'Athens (ATH)' },
  { name: 'Dublin', code: 'DUB', sub: 'Dublin Airport, Ireland', icon: '🇮🇪', full: 'Dublin (DUB)' },
  // ── Middle East ──
  { name: 'Dubai', code: 'DXB', sub: 'Dubai Intl, UAE', icon: '🇦🇪', full: 'Dubai (DXB)' },
  { name: 'Abu Dhabi', code: 'AUH', sub: 'Zayed Intl, UAE', icon: '🇦🇪', full: 'Abu Dhabi (AUH)' },
  { name: 'Doha', code: 'DOH', sub: 'Hamad Intl, Qatar', icon: '🇶🇦', full: 'Doha (DOH)' },
  { name: 'Riyadh', code: 'RUH', sub: 'King Khalid Intl, Saudi Arabia', icon: '🇸🇦', full: 'Riyadh (RUH)' },
  { name: 'Jeddah', code: 'JED', sub: 'King Abdulaziz Intl, Saudi Arabia', icon: '🇸🇦', full: 'Jeddah (JED)' },
  // ── Asia Pacific ──
  { name: 'Tokyo', code: 'NRT', sub: 'Narita Intl, Japan', icon: '🇯🇵', full: 'Tokyo (NRT)' },
  { name: 'Tokyo', code: 'HND', sub: 'Haneda, Japan', icon: '🇯🇵', full: 'Tokyo (HND)' },
  { name: 'Singapore', code: 'SIN', sub: 'Changi, Singapore', icon: '🇸🇬', full: 'Singapore (SIN)' },
  { name: 'Bangkok', code: 'BKK', sub: 'Suvarnabhumi, Thailand', icon: '🇹🇭', full: 'Bangkok (BKK)' },
  { name: 'Hong Kong', code: 'HKG', sub: 'Hong Kong Intl', icon: '🇭🇰', full: 'Hong Kong (HKG)' },
  { name: 'Seoul', code: 'ICN', sub: 'Incheon Intl, South Korea', icon: '🇰🇷', full: 'Seoul (ICN)' },
  { name: 'Kuala Lumpur', code: 'KUL', sub: 'KLIA, Malaysia', icon: '🇲🇾', full: 'Kuala Lumpur (KUL)' },
  { name: 'Sydney', code: 'SYD', sub: 'Kingsford Smith, Australia', icon: '🇦🇺', full: 'Sydney (SYD)' },
  { name: 'Melbourne', code: 'MEL', sub: 'Tullamarine, Australia', icon: '🇦🇺', full: 'Melbourne (MEL)' },
  { name: 'Bali', code: 'DPS', sub: 'Ngurah Rai Intl, Indonesia', icon: '🇮🇩', full: 'Bali (DPS)' },
  { name: 'Manila', code: 'MNL', sub: 'Ninoy Aquino Intl, Philippines', icon: '🇵🇭', full: 'Manila (MNL)' },
  { name: 'Phuket', code: 'HKT', sub: 'Phuket Intl, Thailand', icon: '🇹🇭', full: 'Phuket (HKT)' },
  // ── Americas ──
  { name: 'Toronto', code: 'YYZ', sub: 'Pearson Intl, Canada', icon: '🇨🇦', full: 'Toronto (YYZ)' },
  { name: 'Vancouver', code: 'YVR', sub: 'Vancouver Intl, Canada', icon: '🇨🇦', full: 'Vancouver (YVR)' },
  { name: 'Cancún', code: 'CUN', sub: 'Cancún Intl, Mexico', icon: '🇲🇽', full: 'Cancún (CUN)' },
  { name: 'Mexico City', code: 'MEX', sub: 'Benito Juárez Intl, Mexico', icon: '🇲🇽', full: 'Mexico City (MEX)' },
  { name: 'São Paulo', code: 'GRU', sub: 'Guarulhos, Brazil', icon: '🇧🇷', full: 'São Paulo (GRU)' },
  { name: 'Bogotá', code: 'BOG', sub: 'El Dorado, Colombia', icon: '🇨🇴', full: 'Bogotá (BOG)' },
  { name: 'Lima', code: 'LIM', sub: 'Jorge Chávez, Peru', icon: '🇵🇪', full: 'Lima (LIM)' },
  { name: 'Buenos Aires', code: 'EZE', sub: 'Ezeiza Intl, Argentina', icon: '🇦🇷', full: 'Buenos Aires (EZE)' },
  { name: 'San Juan', code: 'SJU', sub: 'Luis Muñoz Marín, Puerto Rico', icon: '🇵🇷', full: 'San Juan (SJU)' },
  // ── Africa ──
  { name: 'Johannesburg', code: 'JNB', sub: 'O.R. Tambo Intl, South Africa', icon: '🇿🇦', full: 'Johannesburg (JNB)' },
  { name: 'Cairo', code: 'CAI', sub: 'Cairo Intl, Egypt', icon: '🇪🇬', full: 'Cairo (CAI)' },
  { name: 'Nairobi', code: 'NBO', sub: 'Jomo Kenyatta Intl, Kenya', icon: '🇰🇪', full: 'Nairobi (NBO)' },
];

const DESTINATIONS = [
  { name: 'Paris, France', sub: 'City of Light', icon: '🗼' },
  { name: 'Bali, Indonesia', sub: 'Island Paradise', icon: '🌴' },
  { name: 'Maldives', sub: 'Overwater Villas', icon: '🌅' },
  { name: 'Cancún, Mexico', sub: 'Beach Resort', icon: '🌮' },
  { name: 'Santorini, Greece', sub: 'Island Getaway', icon: '⛵' },
  { name: 'Dubai, UAE', sub: 'Luxury City', icon: '🏙' },
  { name: 'Hawaii, USA', sub: 'Island Hopping', icon: '🌺' },
  { name: 'London, UK', sub: 'City Break', icon: '🇬🇧' },
  { name: 'Tokyo, Japan', sub: 'Cherry Blossoms', icon: '🎌' },
  { name: 'New York, USA', sub: 'Broadway & Sights', icon: '🗽' },
  { name: 'Rome, Italy', sub: 'History & Food', icon: '🏛' },
  { name: 'Caribbean', sub: 'Cruise Destination', icon: '🌊' },
  { name: 'Mediterranean', sub: 'Italy, Greece, Spain', icon: '🏛' },
  { name: 'Alaska', sub: 'Glacier & Wildlife', icon: '🏔' },
  { name: 'Phuket, Thailand', sub: 'Beach & Temples', icon: '🏖' },
  { name: 'Iceland', sub: 'Northern Lights', icon: '🌌' },
];

const CAR_LOCATIONS = [
  { name: 'Los Angeles, CA', sub: 'LAX Airport', icon: '✈️' },
  { name: 'New York, NY', sub: 'JFK Airport', icon: '✈️' },
  { name: 'Miami, FL', sub: 'MIA Airport', icon: '✈️' },
  { name: 'Las Vegas, NV', sub: 'LAS Airport', icon: '✈️' },
  { name: 'San Francisco, CA', sub: 'SFO Airport', icon: '✈️' },
  { name: 'Chicago, IL', sub: "O'Hare Airport", icon: '✈️' },
  { name: 'Orlando, FL', sub: 'MCO Airport', icon: '✈️' },
  { name: 'Seattle, WA', sub: 'SEA Airport', icon: '✈️' },
  { name: 'Denver, CO', sub: 'DEN Airport', icon: '✈️' },
  { name: 'Dallas, TX', sub: 'DFW Airport', icon: '✈️' },
];

/* ─── Default Dates (14 days from today, 7-day trip) ─── */
const today = new Date();
const dep = new Date(today); dep.setDate(dep.getDate() + 14);
const ret = new Date(dep); ret.setDate(ret.getDate() + 7);
const fmt = d => d.toISOString().split('T')[0];
const DEFAULT_DEP = fmt(dep);
const DEFAULT_RET = fmt(ret);

/* ─── Autocomplete Hook ─── */
function useAutocomplete(items) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [filtered, setFiltered] = useState([]);
  const [selected, setSelected] = useState(null);
  const ref = useRef(null);
  useEffect(() => {
    function h(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);
  function onChange(val) {
    setQuery(val);
    setSelected(null);
    if (val.length >= 1) {
      const q = val.toLowerCase();
      const m = items.filter(i =>
        i.name.toLowerCase().includes(q) ||
        (i.sub || '').toLowerCase().includes(q) ||
        (i.code || '').toLowerCase().includes(q) ||
        (i.full || '').toLowerCase().includes(q)
      ).slice(0, 8);
      setFiltered(m);
      setOpen(m.length > 0);
    } else { setFiltered([]); setOpen(false); }
  }
  function select(item) {
    setQuery(item.full || item.name);
    setSelected(item);
    setOpen(false);
  }
  return { query, setQuery, open, setOpen, filtered, ref, onChange, select, selected };
}

/* ─── Live API Autocomplete Hook (for airports + hotel destinations) ─── */
function useLiveAutocomplete(apiUrl, type = 'airport', fallbackItems = []) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [filtered, setFiltered] = useState([]);
  const [selected, setSelected] = useState(null);
  const ref = useRef(null);
  const debounceRef = useRef(null);

  useEffect(() => {
    function h(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  function onChange(val) {
    setQuery(val);
    setSelected(null);
    clearTimeout(debounceRef.current);

    if (val.length < 2) { setFiltered([]); setOpen(false); return; }

    // Debounce API call (300ms)
    debounceRef.current = setTimeout(async () => {
      try {
        const paramKey = type === 'hotel' ? 'query' : 'q';
        const res = await fetch(`${apiUrl}?${paramKey}=${encodeURIComponent(val)}`);
        const data = await res.json();
        const results = Array.isArray(data) ? data : data.data || data.results || [];

        let normalized = [];
        // Helper: unwrap {en: "..."} objects from API responses
        const str = (v) => typeof v === 'object' && v !== null ? (v.en || v.name || Object.values(v)[0] || '') : (v || '');

        if (type === 'airport') {
          normalized = results.slice(0, 8).map(a => ({
            name: str(a.name || a.cityName),
            code: str(a.code || a.airportCode || a.iata),
            sub: str(a.airport || a.airportName),
            icon: '✈️',
            full: `${str(a.name || a.cityName)} (${str(a.code || a.airportCode)})`,
            country: str(a.country || a.countryName),
          }));
        } else if (type === 'hotel') {
          // Normalize hotel destination results
          // API may return names as objects like { en: "New York" }
          const str = (v) => typeof v === 'object' && v !== null ? (v.en || v.name || Object.values(v)[0] || '') : (v || '');
          normalized = results.slice(0, 8).map(d => ({
            name: str(d.name || d.cityName || d.destination),
            sub: str(d.country || d.countryName || d.region),
            icon: d.icon || '🏨',
            full: str(d.name || d.cityName),
            id: d.id || d._id || '',
            hotelCount: d.hotelCount || d.count || 0,
          }));
        }

        if (normalized.length > 0) {
          setFiltered(normalized);
          setOpen(true);
        } else {
          // Fall back to local filtering
          filterLocal(val);
        }
      } catch {
        // On API error, fall back to local items
        filterLocal(val);
      }
    }, 300);
  }

  function filterLocal(val) {
    if (fallbackItems.length === 0) { setFiltered([]); setOpen(false); return; }
    const q = val.toLowerCase();
    const m = fallbackItems.filter(i =>
      (i.name || '').toLowerCase().includes(q) ||
      (i.sub || '').toLowerCase().includes(q) ||
      (i.code || '').toLowerCase().includes(q) ||
      (i.full || '').toLowerCase().includes(q)
    ).slice(0, 8);
    setFiltered(m);
    setOpen(m.length > 0);
  }

  function select(item) {
    setQuery(item.full || item.name);
    setSelected(item);
    setOpen(false);
  }

  return { query, setQuery, open, setOpen, filtered, ref, onChange, select, selected };
}

function AutoInput({ hook, placeholder }) {
  return (
    <div ref={hook.ref} style={{ position: 'relative' }}>
      <input type="text" placeholder={placeholder} value={hook.query}
        onChange={e => hook.onChange(e.target.value)}
        onFocus={() => { if (hook.filtered.length > 0) hook.setOpen(true); }}
        autoComplete="off" />
      {hook.open && (
        <div className="destination-suggestions">
          {hook.filtered.map((item, i) => (
            <div key={i} className="destination-suggestion-item" onClick={() => hook.select(item)}>
              <span className="destination-suggestion-icon">{item.icon || '✈️'}</span>
              <div>
                <div className="destination-suggestion-text">
                  {item.code ? `${item.name} (${item.code})` : item.name}
                </div>
                {item.sub && <div className="destination-suggestion-sub">{item.sub}</div>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Room & Guest Picker (MakeMyTrip Style) ─── */
function RoomGuestPicker({ rooms, setRooms, open, onClose, maxRooms = 5 }) {
  function addRoom() { if (rooms.length < maxRooms) setRooms([...rooms, { adults: 2, children: 0, childAges: [] }]); }
  function removeRoom(idx) { if (rooms.length > 1) setRooms(rooms.filter((_, i) => i !== idx)); }
  function updateRoom(idx, field, val) {
    const updated = [...rooms];
    updated[idx] = { ...updated[idx], [field]: val };
    if (field === 'children') {
      const ages = updated[idx].childAges || [];
      if (val > ages.length) updated[idx].childAges = [...ages, ...Array(val - ages.length).fill(5)];
      else updated[idx].childAges = ages.slice(0, val);
    }
    setRooms(updated);
  }
  function updateChildAge(ri, ci, age) { const u = [...rooms]; u[ri].childAges[ci] = age; setRooms(u); }
  const tA = rooms.reduce((s, r) => s + r.adults, 0);
  const tC = rooms.reduce((s, r) => s + r.children, 0);
  if (!open) return null;
  return (
    <div className="rg-overlay" onClick={onClose}>
      <div className="rg-card" onClick={e => e.stopPropagation()}>
        <div className="rg-header">
          <div className="rg-title">{rooms.length} Room{rooms.length > 1 ? 's' : ''} · {tA} Adult{tA > 1 ? 's' : ''}{tC > 0 ? ` · ${tC} Child${tC > 1 ? 'ren' : ''}` : ''}</div>
          <button className="rg-close" onClick={onClose}>✕</button>
        </div>
        <div className="rg-rooms">
          {rooms.map((room, ri) => (
            <div key={ri} className="rg-room">
              <div className="rg-room-head"><span className="rg-room-label">Room {ri + 1}</span>{rooms.length > 1 && <button className="rg-room-remove" onClick={() => removeRoom(ri)}>Remove</button>}</div>
              <div className="rg-row"><div className="rg-row-info"><div className="rg-row-label">Adults</div><div className="rg-row-sub">Age 13+</div></div>
                <div className="rg-counter"><button className="rg-btn" disabled={room.adults <= 1} onClick={() => updateRoom(ri, 'adults', room.adults - 1)}>−</button><span className="rg-count">{room.adults}</span><button className="rg-btn" disabled={room.adults >= 6} onClick={() => updateRoom(ri, 'adults', room.adults + 1)}>+</button></div></div>
              <div className="rg-row"><div className="rg-row-info"><div className="rg-row-label">Children</div><div className="rg-row-sub">Age 0–12</div></div>
                <div className="rg-counter"><button className="rg-btn" disabled={room.children <= 0} onClick={() => updateRoom(ri, 'children', room.children - 1)}>−</button><span className="rg-count">{room.children}</span><button className="rg-btn" disabled={room.children >= 4} onClick={() => updateRoom(ri, 'children', room.children + 1)}>+</button></div></div>
              {room.children > 0 && (<div className="rg-ages">{room.childAges.map((age, ci) => (
                <div key={ci} className="rg-age-item"><label className="rg-age-label">Child {ci + 1} Age</label>
                  <select className="rg-age-select" value={age} onChange={e => updateChildAge(ri, ci, +e.target.value)}>{[...Array(13)].map((_, a) => <option key={a} value={a}>{a < 1 ? 'Under 1' : a}</option>)}</select>
                </div>))}</div>)}
            </div>
          ))}
        </div>
        {rooms.length < maxRooms && <button className="rg-add-room" onClick={addRoom}>+ Add Room</button>}
        <button className="rg-apply" onClick={onClose}>Apply</button>
      </div>
    </div>
  );
}

function GuestButton({ rooms, onClick }) {
  const tA = rooms.reduce((s, r) => s + r.adults, 0);
  const tC = rooms.reduce((s, r) => s + r.children, 0);
  return (
    <button type="button" className="rg-trigger" onClick={onClick}>
      <span>{rooms.length} Room{rooms.length > 1 ? 's' : ''}, {tA} Adult{tA > 1 ? 's' : ''}{tC > 0 ? `, ${tC} Child${tC > 1 ? 'ren' : ''}` : ''}</span>
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M6 9l6 6 6-6" /></svg>
    </button>
  );
}

/* ═══════════════════════════════════════════════
   MAIN SEARCH BOX
   ═══════════════════════════════════════════════ */
export default function SearchBox({ defaultTab = 'flights' }) {
  const router = useRouter();
  const pathname = usePathname();
  const { showLoading } = useLoading();
  const [activeTab, setActiveTab] = useState(defaultTab);

  /* ── Flight State ── */
  const [tripType, setTripType] = useState('roundtrip');
  const [flightCabin, setFlightCabin] = useState('Economy');
  const [flightAdults, setFlightAdults] = useState('1');
  const [flightDepart, setFlightDepart] = useState(DEFAULT_DEP);
  const [flightReturn, setFlightReturn] = useState(DEFAULT_RET);
  const flightFrom = useLiveAutocomplete('/api/flights/airports', 'airport', AIRPORTS);
  const flightTo = useLiveAutocomplete('/api/flights/airports', 'airport', AIRPORTS);

  /* ── Hotel State ── */
  const hotelDest = useLiveAutocomplete('/api/hotels/destination', 'hotel', DESTINATIONS);
  const [hotelCheckIn, setHotelCheckIn] = useState(DEFAULT_DEP);
  const [hotelCheckOut, setHotelCheckOut] = useState(DEFAULT_RET);
  const [hotelRooms, setHotelRooms] = useState([{ adults: 2, children: 0, childAges: [] }]);
  const [hotelPickerOpen, setHotelPickerOpen] = useState(false);

  /* ── Car State ── */
  const carLoc = useAutocomplete(CAR_LOCATIONS);
  const [carPickup, setCarPickup] = useState(DEFAULT_DEP);
  const [carDropoff, setCarDropoff] = useState(DEFAULT_RET);
  const [carType, setCarType] = useState('');

  /* ── Package State ── */
  const pkgFrom = useLiveAutocomplete('/api/flights/airports', 'airport', AIRPORTS);
  const pkgTo = useAutocomplete(DESTINATIONS);
  const [pkgDepart, setPkgDepart] = useState(DEFAULT_DEP);
  const [pkgDuration, setPkgDuration] = useState('');
  const [pkgRooms, setPkgRooms] = useState([{ adults: 2, children: 0, childAges: [] }]);
  const [pkgPickerOpen, setPkgPickerOpen] = useState(false);

  /* ── Cruise State ── */
  const cruiseDest = useAutocomplete(DESTINATIONS.filter(d => ['Caribbean', 'Mediterranean', 'Alaska', 'Hawaii, USA', 'Phuket, Thailand'].includes(d.name)));
  const [cruiseDepart, setCruiseDepart] = useState(DEFAULT_DEP);
  const [cruiseDuration, setCruiseDuration] = useState('');
  const [cruiseGuests, setCruiseGuests] = useState('2');

  /* ── Tab Click ── */
  function handleTabClick(tabId) {
    const tabHref = TABS.find(t => t.id === tabId)?.href;
    if (pathname === '/' || pathname === tabHref) setActiveTab(tabId);
    else router.push(tabHref);
  }

  /* ═══ SEARCH — builds query string and navigates ═══ */
  function handleSearch() {
    let url = '';

    if (activeTab === 'flights') {
      const fromCode = flightFrom.selected?.code || flightFrom.query.match(/\((\w+)\)/)?.[1] || flightFrom.query;
      const toCode = flightTo.selected?.code || flightTo.query.match(/\((\w+)\)/)?.[1] || flightTo.query;
      const params = new URLSearchParams({
        type: tripType,
        from: flightFrom.query || 'New York (JFK)',
        to: flightTo.query || 'London (LHR)',
        fromCode: fromCode,
        toCode: toCode,
        depart: flightDepart,
        cabin: flightCabin,
        adults: flightAdults,
      });
      if (tripType === 'roundtrip') params.set('return', flightReturn);
      url = `/flights/results?${params.toString()}`;
    }

    else if (activeTab === 'hotels') {
      const tA = hotelRooms.reduce((s, r) => s + r.adults, 0);
      const params = new URLSearchParams({
        city: hotelDest.query || 'New York',
        checkIn: hotelCheckIn,
        checkOut: hotelCheckOut,
        guests: String(tA),
        rooms: String(hotelRooms.length),
      });
      url = `/hotels/listing?${params.toString()}`;
    }

    else if (activeTab === 'cars') {
      const params = new URLSearchParams({
        location: carLoc.query || 'Los Angeles, CA',
        pickup: carPickup,
        dropoff: carDropoff,
      });
      if (carType) params.set('type', carType);
      url = `/cars/results?${params.toString()}`;
    }

    else if (activeTab === 'packages') {
      const tA = pkgRooms.reduce((s, r) => s + r.adults, 0);
      const params = new URLSearchParams({
        from: pkgFrom.query || 'New York (JFK)',
        to: pkgTo.query || 'Bali, Indonesia',
        depart: pkgDepart,
        guests: String(tA),
        rooms: String(pkgRooms.length),
      });
      if (pkgDuration) params.set('duration', pkgDuration);
      url = `/packages/results?${params.toString()}`;
    }

    else if (activeTab === 'cruises') {
      const params = new URLSearchParams({
        destination: cruiseDest.query || 'Caribbean',
        depart: cruiseDepart,
        guests: cruiseGuests,
      });
      if (cruiseDuration) params.set('duration', cruiseDuration);
      url = `/cruises/results?${params.toString()}`;
    }

    // Show loading overlay, then navigate
    const loadingType = `${activeTab}-search`;
    showLoading(loadingType, () => router.push(url));
  }

  return (
    <>
    <div className="search-tabs" role="tablist">
  {TABS.map(tab => (
    <Link key={tab.id} href={tab.href}
      className={`search-tab${activeTab === tab.id ? ' active' : ''}`}
      role="tab" aria-selected={activeTab === tab.id}
      onClick={() => setActiveTab(tab.id)}>
      {TAB_ICONS[tab.id]}{tab.label}
    </Link>
  ))}
</div>
      {/* TABS 
      <div className="search-tabs" role="tablist">
        {TABS.map(tab => (
          <button key={tab.id} className={`search-tab${activeTab === tab.id ? ' active' : ''}`}
            onClick={() => handleTabClick(tab.id)} role="tab" aria-selected={activeTab === tab.id}>
            {TAB_ICONS[tab.id]}{tab.label}
          </button>
        ))}
      </div> */}

      {/* ═══ FLIGHTS ═══ */}
      {activeTab === 'flights' && (<>
        <div className="trip-pills">
          {[['roundtrip', '⇄ Round Trip'], ['oneway', '→ One Way']].map(([id, label]) => (
            <button key={id} className={`trip-pill${tripType === id ? ' active' : ''}`} onClick={() => setTripType(id)}>{label}</button>
          ))}
        </div>
        <div className="search-form">
          <div className="search-row" style={{ gridTemplateColumns: tripType === 'oneway' ? '1.3fr 1.3fr 1fr 1fr' : '1fr 1fr 1fr 1fr 1fr' }}>
            <div className="form-group"><label>From</label><AutoInput hook={flightFrom} placeholder="City or Airport" /></div>
            <div className="form-group"><label>To</label><AutoInput hook={flightTo} placeholder="City or Airport" /></div>
            <div className="form-group"><label>Depart</label><input type="date" value={flightDepart} onChange={e => setFlightDepart(e.target.value)} /></div>
            {tripType === 'roundtrip' && <div className="form-group"><label>Return</label><input type="date" value={flightReturn} onChange={e => setFlightReturn(e.target.value)} /></div>}
            <div className="form-group"><label>Travelers &amp; Class</label>
              <select value={`${flightAdults}-${flightCabin}`} onChange={e => { const [a, c] = e.target.value.split('-'); setFlightAdults(a); setFlightCabin(c); }}>
                <option value="1-Economy">1 Adult · Economy</option>
                <option value="2-Economy">2 Adults · Economy</option>
                <option value="3-Economy">3 Adults · Economy</option>
                <option value="1-Business">1 Adult · Business</option>
                <option value="2-Business">2 Adults · Business</option>
                <option value="1-First">1 Adult · First Class</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 18 }}>
            <button className="search-btn" onClick={handleSearch}><SearchIcon /> Search Flights</button>
          </div>
        </div>
      </>)}

      {/* ═══ HOTELS ═══ */}
      {activeTab === 'hotels' && (
        <div className="search-form">
          <div className="search-row" style={{ gridTemplateColumns: '2fr 1fr 1fr 1.2fr' }}>
            <div className="form-group"><label>Destination / Hotel</label><AutoInput hook={hotelDest} placeholder="City, area or hotel name" /></div>
            <div className="form-group"><label>Check-in</label><input type="date" value={hotelCheckIn} onChange={e => setHotelCheckIn(e.target.value)} /></div>
            <div className="form-group"><label>Check-out</label><input type="date" value={hotelCheckOut} onChange={e => setHotelCheckOut(e.target.value)} /></div>
            <div className="form-group"><label>Rooms &amp; Guests</label><GuestButton rooms={hotelRooms} onClick={() => setHotelPickerOpen(true)} /></div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 18 }}>
            <button className="search-btn" onClick={handleSearch}><SearchIcon /> Search Hotels</button>
          </div>
          <RoomGuestPicker rooms={hotelRooms} setRooms={setHotelRooms} open={hotelPickerOpen} onClose={() => setHotelPickerOpen(false)} />
        </div>
      )}

      {/* ═══ CARS ═══ */}
      {activeTab === 'cars' && (
        <div className="search-form">
          <div className="search-row" style={{ gridTemplateColumns: '1.5fr 1fr 1fr 1fr' }}>
            <div className="form-group"><label>Pick-up Location</label><AutoInput hook={carLoc} placeholder="Airport, city or address" /></div>
            <div className="form-group"><label>Pick-up Date</label><input type="date" value={carPickup} onChange={e => setCarPickup(e.target.value)} /></div>
            <div className="form-group"><label>Drop-off Date</label><input type="date" value={carDropoff} onChange={e => setCarDropoff(e.target.value)} /></div>
            <div className="form-group"><label>Car Type</label>
              <select value={carType} onChange={e => setCarType(e.target.value)}><option value="">Any Type</option><option value="Economy">Economy</option><option value="Compact">Compact</option><option value="SUV">SUV</option><option value="Luxury">Luxury</option><option value="Minivan">Minivan</option><option value="Electric">Electric</option></select>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 18 }}>
            <button className="search-btn" onClick={handleSearch}><SearchIcon /> Search Cars</button>
          </div>
        </div>
      )}

      {/* ═══ PACKAGES ═══ */}
      {activeTab === 'packages' && (
        <div className="search-form">
          <div className="search-row" style={{ gridTemplateColumns: '1fr 1.3fr 1fr 1fr 1.2fr' }}>
            <div className="form-group"><label>Flying From</label><AutoInput hook={pkgFrom} placeholder="New York (JFK)" /></div>
            <div className="form-group"><label>Destination</label><AutoInput hook={pkgTo} placeholder="Bali, Indonesia" /></div>
            <div className="form-group"><label>Departure</label><input type="date" value={pkgDepart} onChange={e => setPkgDepart(e.target.value)} /></div>
            <div className="form-group"><label>Duration</label>
              <select value={pkgDuration} onChange={e => setPkgDuration(e.target.value)}><option value="">Any</option><option value="3-5">3–5 Nights</option><option value="6-9">6–9 Nights</option><option value="10-14">10–14 Nights</option></select>
            </div>
            <div className="form-group"><label>Rooms &amp; Guests</label><GuestButton rooms={pkgRooms} onClick={() => setPkgPickerOpen(true)} /></div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 18 }}>
            <button className="search-btn" onClick={handleSearch}><SearchIcon /> Search Packages</button>
          </div>
          <RoomGuestPicker rooms={pkgRooms} setRooms={setPkgRooms} open={pkgPickerOpen} onClose={() => setPkgPickerOpen(false)} />
        </div>
      )}

      {/* ═══ CRUISES ═══ */}
      {activeTab === 'cruises' && (
        <div className="search-form">
          <div className="search-row" style={{ gridTemplateColumns: '1.5fr 1fr 1fr .8fr' }}>
            <div className="form-group"><label>Destination</label><AutoInput hook={cruiseDest} placeholder="Caribbean..." /></div>
            <div className="form-group"><label>Departure</label><input type="date" value={cruiseDepart} onChange={e => setCruiseDepart(e.target.value)} /></div>
            <div className="form-group"><label>Duration</label>
              <select value={cruiseDuration} onChange={e => setCruiseDuration(e.target.value)}><option value="">Any</option><option value="3-5">3–5 Nights</option><option value="6-9">6–9 Nights</option><option value="10-14">10–14 Nights</option><option value="15+">15+ Nights</option></select>
            </div>
            <div className="form-group"><label>Guests</label>
              <select value={cruiseGuests} onChange={e => setCruiseGuests(e.target.value)}><option value="1">1 Guest</option><option value="2">2 Guests</option><option value="3">3 Guests</option><option value="4">4 Guests</option></select>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 18 }}>
            <button className="search-btn" onClick={handleSearch}><SearchIcon /> Search Cruises</button>
          </div>
        </div>
      )}
    </>
  );
}
