import { Suspense } from 'react';
import AirlineDetailPage from '@/components/airlinedetail/AirlineDetailPage';

export const metadata = {
  title: 'Airline Information | Fareoworld',
  description: 'Detailed airline info including routes, fleet, reviews.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center py-5"><div className="spinner-border text-teal" /></div>}>
      <AirlineDetailPage />
    </Suspense>
  );
}
