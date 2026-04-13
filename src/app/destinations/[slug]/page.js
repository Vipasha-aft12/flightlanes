import { Suspense } from 'react';
import DestinationDetailPage from '@/components/destinationdetail/DestinationDetailPage';

export const metadata = {
  title: 'Destination Guide | Flightlanes',
  description: 'Complete travel guide with flights, hotels, activities and tips.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center py-5"><div className="spinner-border text-teal" /></div>}>
      <DestinationDetailPage />
    </Suspense>
  );
}
