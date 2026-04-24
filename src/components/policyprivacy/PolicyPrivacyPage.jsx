'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import '@/components/shared/policyshared.css';

export default function PolicyPrivacyPage() {


  return (
    <section className='site-policy'>
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <div className="policyprivacy-page">
              <div className="pol-wrap">
                <Link href="/" className="pol-back">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
                  Back to Home
                </Link>
                <div className="pol-icon">🔒</div>
                <div className="pol-badge">Legal</div>
                <div className="pol-content pt-2">

                  <h1><strong>Privacy Policy</strong></h1>
                  <p>This Privacy Policy explains how Fareoworld (“we,” “us,” or “our”) collects, uses, stores, shares, and protects your personal information when you access or use our website and services.</p>
                  <p>Fareoworld is an online travel booking platform that enables users to search and book travel services including <strong>flights, hotels, car rentals, cruise services, and related travel products</strong> offered by third-party service providers.</p>
                  <p>By using Fareoworld, you agree to the collection and use of information as described in this Privacy Policy. If you do not agree, you should stop using our services.</p>
                
                  <h2><strong>1. Scope of This Privacy Policy</strong></h2>
                  <p>This Privacy Policy applies to:</p>
                  <ul>
                    <li>Visitors browsing the Fareoworld website</li>
                    <li>Users searching for travel services</li>
                    <li>Customers making bookings for flights, hotels, rentals, or cruises</li>
                    <li>Users contacting customer support</li>
                  </ul>
                  <p>It applies to all services offered through Fareoworld, including current and future travel-related offerings.</p>
                  
                  <h2><strong>2. Information We Collect</strong></h2>
                  <p>We collect different types of information to provide and improve our services.</p>
                  
                  <h3><strong>2.1 Personal Information</strong></h3>
                  <p>When you use Fareoworld, we may collect:</p>
                  <ul>
                    <li>Full name</li>
                    <li>Email address</li>
                    <li>Phone number</li>
                    <li>Billing and invoice details</li>
                    <li>Passenger or traveler names (as required for bookings)</li>
                  </ul>
                  <p>This information is required to process bookings and communicate travel-related updates.</p>
                  
                  <h3><strong>2.2 Travel Booking Information</strong></h3>
                  <p>To complete reservations, we collect:</p>
                  <ul>
                    <li>Flight origin and destination</li>
                    <li>Travel dates and times</li>
                    <li>Hotel check-in and check-out details</li>
                    <li>Car rental pickup and drop locations</li>
                    <li>Cruise itinerary details</li>
                    <li>Special service requests (if any)</li>
                  </ul>
                  <p>This data is necessary for completing your booking with third-party providers.</p>
                  
                  <h3><strong>2.3 Payment Information</strong></h3>
                  <p>When you make a payment:</p>
                  <ul>
                    <li>Payments are processed through secure third-party payment gateways</li>
                    <li>Fareoworld does not store full debit or credit card details</li>
                    <li>We may receive transaction-related information such as:</li>
                    <ul>
                      <li>Payment status</li>
                      <li>Transaction ID</li>
                      <li>Payment confirmation reference</li>
                    </ul>
                  </ul>
                  
                  <h3><strong>2.4 Technical and Device Information</strong></h3>
                  <p>We automatically collect certain technical data, including:</p>
                  <ul>
                    <li>IP address</li>
                    <li>Device type and operating system</li>
                    <li>Browser type and version</li>
                    <li>Pages visited on our website</li>
                    <li>Date and time of visits</li>
                    <li>Click behavior and search activity</li>
                  </ul>
                  <p>This helps us improve website performance and security.</p>
                  
                  <h3><strong>2.5 Cookies and Tracking Technologies</strong></h3>
                  <p>We use cookies and similar technologies to:</p>
                  <ul>
                    <li>Improve website functionality</li>
                    <li>Store user preferences</li>
                    <li>Analyze website traffic</li>
                    <li>Provide relevant travel suggestions</li>
                    <li>Maintain secure user sessions</li>
                  </ul>
                  <p>For more details, refer to our Cookie Policy.</p>
                
                  <h2><strong>3. How We Use Your Information</strong></h2>
                  <p>We use collected information for the following purposes:</p>
                
                  <h3><strong>3.1 To Provide Travel Booking Services</strong></h3>
                  <ul>
                    <li>Process flight, hotel, car rental, and cruise bookings</li>
                    <li>Confirm reservations with service providers</li>
                    <li>Send booking confirmations and itinerary details</li>
                    <li>Manage changes, cancellations, and refunds</li>
                  </ul>
                
                  <h3><strong>3.2 Customer Support</strong></h3>
                  <ul>
                    <li>Respond to inquiries and complaints</li>
                    <li>Assist with booking modifications</li>
                    <li>Provide updates on travel services</li>
                    <li>Resolve payment or booking issues</li>
                  </ul>
                  
                  <h3><strong>3.3 Service Improvement</strong></h3>
                  <ul>
                    <li>Improve website speed and performance</li>
                    <li>Enhance search results and user experience</li>
                    <li>Analyze user behavior and booking trends</li>
                    <li>Optimize travel recommendations</li>
                  </ul>
                  
                  <h3><strong>3.4 Security and Fraud Prevention</strong></h3>
                  <ul>
                    <li>Detect and prevent fraudulent transactions</li>
                    <li>Protect user accounts and payment systems</li>
                    <li>Ensure safe browsing and secure transactions</li>
                  </ul>
                  
                  <h3><strong>3.5 Marketing and Communication</strong></h3>
                  <p>We may use limited data to:</p>
                  <ul>
                    <li>Send booking confirmations and updates</li>
                    <li>Share travel-related offers (if opted in)</li>
                    <li>Provide service announcements</li>
                  </ul>
                  <p>Users can opt out of marketing communications at any time.</p>
                  
                  <h2><strong>4. How We Share Your Information</strong></h2>
                  <p>We do not sell or rent your personal data.</p>
                  <p>However, we may share necessary information with trusted third parties to complete services.</p>
                
                  <h3><strong>4.1 Travel Service Providers</strong></h3>
                  <p>We share relevant booking details with:</p>
                  <ul>
                    <li>Airlines</li>
                    <li>Hotels</li>
                    <li>Car rental companies</li>
                    <li>Cruise operators</li>
                  </ul>
                  <p>This is required to complete your reservation.</p>
                  
                  <h3><strong>4.2 Payment Processors</strong></h3>
                  <p>We share transaction data with secure payment gateways to process payments safely and verify transactions.</p>
                  
                  <h3><strong>4.3 Service Providers and Technology Partners</strong></h3>
                  <p>We may share limited data with:</p>
                  <ul>
                    <li>Cloud hosting providers</li>
                    <li>Analytics tools</li>
                    <li>Customer support platforms</li>
                    <li>Marketing and advertising partners</li>
                  </ul>
                  <p>These partners help us operate and improve our platform.</p>
                  
                  <h3><strong>4.4 Legal Requirements</strong></h3>
                  <p>We may disclose information if required to:</p>
                  <ul>
                    <li>Comply with legal obligations</li>
                    <li>Respond to lawful government requests</li>
                    <li>Protect our rights, users, or platform security</li>
                  </ul>
                
                  <h2><strong>5. Data Retention</strong></h2>
                  <p>We retain personal data only for as long as necessary:</p>
                  <ul>
                    <li>Booking and transaction data: up to 5 years (legal/accounting purposes)</li>
                    <li>Customer support records: as needed for service resolution</li>
                    <li>Marketing data: until you opt out or withdraw consent</li>
                  </ul>
                  <p>After the retention period, data is securely deleted or anonymized.</p>
                
                  <h2><strong>6. Data Security</strong></h2>
                  <p>We implement strong security measures to protect your information, including:</p>
                  <ul>
                    <li>SSL encryption for secure communication</li>
                    <li>Secure payment gateways</li>
                    <li>Restricted access to sensitive data</li>
                    <li>Firewall and system monitoring</li>
                    <li>Regular security updates and audits</li>
                  </ul>
                  <p>While we take reasonable steps to protect your data, no system is completely secure.</p>
                  
                  <h2><strong>7. Your Rights</strong></h2>
                  <p>Depending on applicable laws, you may have the right to:</p>
                  <ul>
                    <li>Access your personal information</li>
                    <li>Request correction of inaccurate data</li>
                    <li>Request deletion of your data (where legally allowed)</li>
                    <li>Withdraw consent for marketing communications</li>
                    <li>Request restriction of processing</li>
                  </ul>
                  <p>To exercise these rights, contact us using the details provided below.</p>
                  
                  <h2><strong>8. International Data Transfers</strong></h2>
                  <p>As a global travel platform, your data may be transferred and processed in different countries where our service providers operate.</p>
                  <p>We ensure that such transfers are:</p>
                  <ul>
                    <li>Conducted securely</li>
                    <li>Limited to operational needs</li>
                    <li>Aligned with applicable data protection standards</li>
                  </ul>
                  
                  <h2><strong>9. Third-Party Links</strong></h2>
                  <p>Our website may contain links to third-party websites such as airlines, hotels, or travel partners.</p>
                  <p>We are not responsible for:</p>
                  <ul>
                    <li>Privacy practices of third-party websites</li>
                    <li>Content or policies of external platforms</li>
                  </ul>
                  <p>We encourage users to review their privacy policies before sharing personal information.</p>
                  
                  <h2><strong>10. Children’s Privacy</strong></h2>
                  <p>Fareoworld services are not intended for individuals under the age of 18.</p>
                  <p>We do not knowingly collect personal information from children. If such data is identified, we will take steps to delete it.</p>
                  
                  <h2><strong>11. Marketing Preferences</strong></h2>
                  <p>Users may receive:</p>
                  <ul>
                    <li>Booking confirmations and updates</li>
                    <li>Service-related notifications</li>
                    <li>Optional promotional emails</li>
                  </ul>
                  <p>You can unsubscribe from marketing emails at any time using the unsubscribe link or by contacting us.</p>
                
                  <h2><strong>12. Changes to This Privacy Policy</strong></h2>
                  <p>We may update this Privacy Policy from time to time to reflect:</p>
                  <ul>
                    <li>Legal or regulatory changes</li>
                    <li>Improvements in our services</li>
                    <li>Security or operational updates</li>
                  </ul>
                  <p>Updated versions will be posted on this page with a revised effective date.</p>
                  <p>We encourage users to review this page periodically.</p>
                
                  <h2><strong>Final Statement</strong></h2>
                  <p>Fareoworld is committed to protecting your personal information and ensuring transparency in how data is collected and used. This Privacy Policy is designed to provide clarity, security, and trust while you use our platform to book flights, hotels, car rentals, and cruise services.</p>
                  

                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
