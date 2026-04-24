import { Suspense } from 'react';
import DealDetailPage from '@/components/dealdetail/DealDetailPage';

export const metadata = {
  title: 'Deal Details | Fareoworld',
  description: 'Exclusive travel deal details and booking.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center py-5"><div className="spinner-border text-teal" /></div>}>
      <DealDetailPage />
    </Suspense>
  );
}
