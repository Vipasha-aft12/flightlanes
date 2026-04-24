'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import '@/components/shared/policyshared.css';

export default function PolicyTermsPage() {

  return (
    <section className='site-policy'>
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <div className="policyterms-page">
              <div className="pol-wrap">
                <Link href="/" className="pol-back">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
                  Back to Home
                </Link>
                <div className="pol-icon">📄</div>
                <div className="pol-badge">Legal</div>
                <div className="pol-content pt-2">
                  <h1><strong>Terms &amp; Conditions </strong></h1>
                  <p>These Terms and Conditions (“Terms”) govern your access to and use of the Fareoworld website and services. By accessing, browsing, or making a booking through Fareoworld, you agree to be legally bound by these Terms.</p>
                  <p>Fareoworld provides an online travel booking platform that enables users to search, compare, and book travel services including flights, hotels, car rentals, cruise services, and related travel products offered by third-party suppliers.</p>
                  <p>If you do not agree with these Terms, you should not use our website or services.</p>
                  
                  <h2><strong>1. Nature of Our Service</strong></h2>
                  <p>Fareoworld acts as an <strong>intermediary travel booking platform</strong>. We do not own, operate, or control airlines, hotels, car rental companies, cruise operators, or other travel service providers listed on our platform.</p>
                  <p>All travel services are provided by independent third-party suppliers. Fareoworld facilitate bookings and communicate between users and service providers.</p>
                  
                  <h2><strong>2. Eligibility to Use the Website</strong></h2>
                  <p>To use Fareoworld, you must:</p>
                  <ul>
                    <li>Be at least 18 years of age</li>
                    <li>Have the legal authority to enter into binding agreements</li>
                    <li>Provide accurate and complete information during booking</li>
                    <li>Use the platform only for lawful travel-related purposes</li>
                  </ul>
                  <p>We reserve the right to restrict access if eligibility requirements are not met.</p>
                  
                  <h2><strong>3. Booking Process</strong></h2>
                  <p>When you make a booking through Fareoworld:</p>
                  <ul>
                    <li>You agree to the fare, price, and conditions displayed at checkout</li>
                    <li>Your booking is subject to availability and confirmation from the service provider</li>
                    <li>A booking is confirmed only after successful payment and supplier acceptance</li>
                    <li>You will receive a confirmation email with booking details</li>
                  </ul>
                  <p>Fareoworld is not responsible for booking failures due to incorrect user information or supplier rejection.</p>
                  
                  <h2><strong>4. Pricing and Charges</strong></h2>
                  <p>All prices displayed on Fareoworld may include:</p>
                  <ul>
                    <li>Base fare or service rate</li>
                    <li>Taxes and government fees</li>
                    <li>Supplier charges</li>
                    <li>Fareoworld service fees</li>
                  </ul>
                  <p>Prices are subject to change until the booking is confirmed. Final payable amounts are displayed before payment completion.</p>
                  
                  <h2><strong>5. User Responsibilities</strong></h2>
                  <p>By using Fareoworld, you agree to:</p>
                  <ul>
                    <li>Provide accurate personal, payment, and travel details</li>
                    <li>Ensure all passenger names match government-issued identification</li>
                    <li>Carry valid travel documents (passport, visa, ID, etc.)</li>
                    <li>Comply with all airline, hotel, and destination rules</li>
                  </ul>
                  <p>Fareoworld is not responsible for losses caused by incorrect or incomplete user information.</p>
                  
                  <h2><strong>6. Third-Party Services</strong></h2>
                  <p>All travel services are provided by third-party suppliers.</p>
                  <p>These suppliers are responsible for:</p>
                  <ul>
                    <li>Service delivery (flights, hotels, rentals, cruises)</li>
                    <li>Schedule changes, cancellations, or delays</li>
                    <li>Service quality and availability</li>
                    <li>Refund and compensation decisions</li>
                  </ul>
                  <p>Fareoworld acts only as a facilitator and does not control supplier operations.</p>
                  
                  <h2><strong>7. Cancellations and Changes</strong></h2>
                  <p>Cancellations and modifications are subject to supplier policies.</p>
                  <ul>
                    <li>Some bookings may be non-refundable or partially refundable</li>
                    <li>Changes may result in additional charges</li>
                    <li>Cancellation fees may be applied by both suppliers and Fareoworld</li>
                  </ul>
                  <p>Users must review cancellation terms before completing a booking.</p>
                  
                  <h2><strong>8. Refund Policy Reference</strong></h2>
                  <p>Refunds, if applicable, depend on supplier approval and fare rules.</p>
                  <ul>
                    <li>Refund timelines vary by service provider</li>
                    <li>Processing time may take several business days</li>
                    <li>Service fees charged by Fareoworld are non-refundable</li>
                    <li>Refunds are issued to the original payment method</li>
                  </ul>
                  
                  <h2><strong>9. Travel Documentation</strong></h2>
                  <p>It is the responsibility of the traveler to ensure:</p>
                  <ul>
                    <li>Valid passport and visa requirements</li>
                    <li>Compliance with destination laws</li>
                    <li>Correct identification matching booking details</li>
                  </ul>
                  <p>Fareoworld is not liable for denied boarding or entry due to documentation issues.</p>
                  
                  <h2><strong>10. Website Usage Rules</strong></h2>
                  <p>Users agree not to:</p>
                  <ul>
                    <li>Use the website for fraudulent or illegal purposes</li>
                    <li>Attempt unauthorized access to systems or data</li>
                    <li>Copy, modify, or distribute website content without permission</li>
                    <li>Interfere with website performance or security</li>
                  </ul>
                  <p>We reserve the right to suspend access for misuse.</p>
                  
                  <h2><strong>11. Intellectual Property Rights</strong></h2>
                  <p>All content on Fareoworld, including text, branding, logos, design, and layout, is the property of Fareoworld or its licensors.</p>
                  <p>Users may not:</p>
                  <ul>
                    <li>Reproduce website content without permission</li>
                    <li>Use Fareoworld branding for commercial purposes</li>
                    <li>Modify or distribute platform content unlawfully</li>
                  </ul>
                  
                  <h2><strong>12. Limitation of Liability</strong></h2>
                  <p>To the maximum extent permitted by law:</p>
                  <p>Fareoworld is not liable for:</p>
                  <ul>
                    <li>Flight delays or cancellations</li>
                    <li>Hotel overbooking or service quality issues</li>
                    <li>Changes in travel schedules</li>
                    <li>Losses due to force majeure events</li>
                    <li>Errors caused by third-party service providers</li>
                  </ul>
                  <p>Our liability is limited to the service fees collected by Fareoworld, if applicable.</p>
                  
                  <h2><strong>13. Force Majeure</strong></h2>
                  <p>Fareoworld is not responsible for delays or failure in service caused by events beyond reasonable control, including but not limited to:</p>
                  <ul>
                    <li>Natural disasters</li>
                    <li>Government restrictions</li>
                    <li>War, terrorism, or civil unrest</li>
                    <li>Pandemics or health emergencies</li>
                    <li>Technical failures or system outages</li>
                  </ul>
                  <p>In such cases, services may be delayed, modified, or cancelled by suppliers.</p>
                
                  <h2><strong>14. Data Accuracy</strong></h2>
                  <p>While we strive to ensure accurate information on the website:</p>
                  <ul>
                    <li>Travel details, fares, and availability may change without notice</li>
                    <li>Supplier data is subject to updates and corrections</li>
                    <li>We do not guarantee uninterrupted accuracy of all content</li>
                  </ul>
                  <p>Users are advised to verify details before booking.</p>
                  
                  <h2><strong>15. Privacy and Cookies</strong></h2>
                  <p>Your use of Fareoworld is also governed by our Privacy Policy and Cookie Policy, which explain how we collect, use, and protect your data.</p>
                  <p>By using the website, you consent to the use of cookies and data practices described in those policies.</p>
                  
                  <h2><strong>16. Modifications to Terms</strong></h2>
                  <p>Fareoworld may update or modify these Terms at any time.</p>
                  <ul>
                    <li>Changes will be posted on this page</li>
                    <li>Continued use of the website constitutes acceptance of updated Terms</li>
                    <li>Users are encouraged to review this page regularly</li>
                  </ul>
                  
                  <h2><strong>17. Suspension or Termination</strong></h2>
                  <p>We may suspend or terminate access to the platform if:</p>
                  <ul>
                    <li>Terms are violated</li>
                    <li>Fraudulent activity is detected</li>
                    <li>Misuse of services occurs</li>
                    <li>Required by legal or regulatory authorities</li>
                  </ul>
                  
                  <h2><strong>18. Governing Law</strong></h2>
                  <p>These Terms are governed by applicable laws of the jurisdiction in which Fareoworld operates. Any disputes shall be resolved under applicable legal procedures.</p>
                  
                  <h2><strong>Final Statement</strong></h2>
                  <p>Fareoworld provides a transparent and structured travel booking platform designed to connect users with reliable third-party travel service providers. These Terms ensure clarity regarding responsibilities, limitations, and user rights when using our services.</p>
                  
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
