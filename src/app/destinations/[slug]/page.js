import { Suspense } from 'react';
import DestinationDetailPage from '@/components/destinationdetail/DestinationDetailPage';

export const metadata = {
  title: 'Destination Guide | Fareoworld',
  description: 'Detailed destination info including highlights, tips, quick facts.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center py-5"><div className="spinner-border text-teal" /></div>}>
      <DestinationDetailPage />
    </Suspense>
  );
}
