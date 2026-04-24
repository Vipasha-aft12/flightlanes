'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import '@/components/shared/policyshared.css';
import './PolicyContactPage.css';

export default function PolicyContactPage() {

  return (
    <section className='site-policy'>
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <div className="policycontact-page">
              <div className="pol-wrap">
                <Link href="/" className="pol-back">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
                  Back to Home
                </Link>
                <div className="pol-icon">📞</div>
                <div className="pol-badge">Get in Touch</div>
                <h1 className="pol-title">Contact Us</h1>
                <div className="pol-content">
                  
                  <p>We adhere to the credibility and authenticity of our brand. We care for each customer. You can contact Fareoworld customer support for any assistance related to flight bookings, hotel reservations, car rentals, cruise services, cancellations, refunds, or general travel queries. Our support team is available 24/7 to help resolve booking issues, provide travel information, and assist with urgent travel-related concerns. We recommend including your booking reference number and registered details when reaching out to ensure faster resolution of your request.
                  </p>
                  <h2><strong>Support Availability:</strong> 24/7 Customer Assistance
</h2>

                  <div className="row pol-contact-grid py-3">
                    <div className="col-sm-6 pol-contact-card py-sm-0 py-2">
                      <div className='contact-box cent fd-col w-100 gap-2'>
                        <div className="pol-contact-card-icon">📧</div>
                      <div className="pol-contact-card-title">Email Support</div>
                      <div className="pol-contact-card-val"><a href='mailto:support@gamil.com'>support@gamil.com</a></div>
                      </div>
                    </div>
                    <div className="col-sm-6 pol-contact-card py-sm-0 py-2">
                      <div className='contact-box cent fd-col w-100 gap-2'>
                        <div className="pol-contact-card-icon">📱</div>
                      <div className="pol-contact-card-title">Phone</div>
                      <div className="pol-contact-card-val"><a href='tel:+1-000-000-0000'>+1-000-000-0000</a></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
