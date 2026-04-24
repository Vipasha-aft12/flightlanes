'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import '@/components/shared/policyshared.css';

export default function PolicyCookiePage() {

  return (
    <section className='site-policy'>
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <div className="policycookie-page">
              <div className="pol-wrap">
                <Link href="/" className="pol-back">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
                  Back to Home
                </Link>
                <div className="pol-icon">🍪</div>
                <div className="pol-badge">Technical</div>
                <h1 className="pol-title">Cookie Policy</h1>
                <div className="pol-content">
                  <p>This Cookie Policy explains how Fareoworld uses cookies and similar tracking technologies when you visit or use our website. It describes what cookies are, what types of cookies we use, why we use them, and how you can manage your cookie preferences.</p>
                  <p>This policy applies to all users of Fareoworld and covers all services, including flight bookings, hotel reservations, car rentals, cruise bookings, and other travel-related services offered through our platform.</p>
                  <p>By continuing to use the Fareoworld website, you agree to the use of cookies as described in this policy, unless you choose to disable them through your browser or cookie settings.</p>
                
                  <h2><strong>1. What Are Cookies?</strong></h2>
                  <p>Cookies are small text files stored on your device (computer, smartphone, or tablet) when you visit a website. These files allow the website to recognize your device and store certain information about your preferences or actions.</p>
                  <p>Cookies do not directly identify you as an individual, but they may store information related to:</p>
                  <ul>
                    <li>Your device type and browser</li>
                    <li>Pages you visit on our website</li>
                    <li>Time spent on pages</li>
                    <li>Travel search preferences (such as destinations or dates)</li>
                    <li>Session activity during booking</li>
                  </ul>
                  <p>Cookies help improve website functionality, performance, and user experience.</p>
                  
                  <h2><strong>2. Why Fareoworld Uses Cookies</strong></h2>
                  <p>Fareoworld uses cookies to ensure the website works efficiently and provides a smooth booking experience for users searching for flights, hotels, car rentals, and cruises.</p>
                  <p>We use cookies for the following purposes:</p>
                  <h3><strong>2.1 Essential Website Functionality</strong></h3>
                  <p>Cookies are required for core features such as:</p>
                  <ul>
                    <li>Searching and booking flights, hotels, and other travel services</li>
                    <li>Maintaining user sessions during booking</li>
                    <li>Securing payment and checkout processes</li>
                    <li>Saving temporary booking data</li>
                  </ul>
                  <p>Without these cookies, the website may not function properly.</p>
                  
                  <h3><strong>2.2 Performance and Analytics</strong></h3>
                  <p>We use cookies to understand how users interact with the website. This includes:</p>
                  <ul>
                    <li>Number of visitors</li>
                    <li>Pages visited most frequently</li>
                    <li>Time spent on each section</li>
                    <li>Search patterns for travel services</li>
                  </ul>
                  <p>This data helps us improve:</p>
                  <ul>
                    <li>Website speed and performance</li>
                    <li>Search results for flights and hotels</li>
                    <li>User navigation and design experience</li>
                  </ul>
                  
                  <h3><strong>2.3 Functionality Cookies</strong></h3>
                  <p>These cookies allow us to remember user preferences, such as:</p>
                  <ul>
                    <li>Preferred language</li>
                    <li>Currency selection</li>
                    <li>Recently searched destinations</li>
                    <li>Saved travel preferences</li>
                  </ul>
                  <p>This ensures a more personalized browsing experience.</p>
                  
                  <h3><strong>2.4 Marketing and Advertising Cookies</strong></h3>
                  <p>Fareoworld may use cookies to display relevant travel offers and promotions based on user activity.</p>
                  <p>These cookies help:</p>
                  <ul>
                    <li>Show personalized travel deals</li>
                    <li>Display relevant flight and hotel suggestions</li>
                    <li>Measure effectiveness of marketing campaigns</li>
                    <li>Limit repeated advertisements</li>
                  </ul>
                  <p>Marketing cookies do not store personal identification details such as passwords or payment information.</p>
                  
                  <h3><strong>2.5 Security Cookies</strong></h3>
                  <p>Security-related cookies help protect users from fraudulent activities and unauthorized access. These cookies are used for:</p>
                  <ul>
                    <li>Detecting suspicious login attempts</li>
                    <li>Preventing fraudulent transactions</li>
                    <li>Ensuring secure browsing sessions</li>
                  </ul>
                  
                  <h2><strong>3. Types of Cookies We Use</strong></h2>
                  <h3><strong>3.1 Session Cookies</strong></h3>
                  <ul>
                    <li>Temporary cookies</li>
                    <li>Deleted when you close your browser</li>
                    <li>Used to maintain your session during booking</li>
                  </ul>
                  
                  <h3><strong>3.2 Persistent Cookies</strong></h3>
                  <ul>
                    <li>Remain on your device for a fixed period</li>
                    <li>Help remember preferences for future visits</li>
                    <li>Used for analytics and personalization</li>
                  </ul>
                  
                  <h3><strong>3.3 First-Party Cookies</strong></h3>
                  <ul>
                    <li>Set directly by Fareoworld</li>
                    <li>Used for website functionality and user experience</li>
                  </ul>
                  
                  <h3><strong>3.4 Third-Party Cookies</strong></h3>
                  <ul>
                    <li>Set by external service providers</li>
                    <li>Used for analytics, advertising, or embedded services</li>
                    <li>Examples include payment gateways and analytics tools</li>
                  </ul>
                  
                  <h2><strong>4. How Cookies Improve Your Experience</strong></h2>
                  <p>Cookies help Fareoworld provide a smoother and more efficient booking experience by:</p>
                  <ul>
                    <li>Reducing the need to re-enter travel details</li>
                    <li>Speeding up search results for flights and hotels</li>
                    <li>Saving preferences for future visits</li>
                    <li>Providing relevant travel recommendations</li>
                    <li>Ensuring secure transactions</li>
                  </ul>
                  <p>Without cookies, some features of the website may not work correctly.</p>
                  
                  <h2><strong>5. Third-Party Cookies</strong></h2>
                  <p>Fareoworld may allow third-party service providers to place cookies on your device. These providers may include:</p>
                  <ul>
                    <li>Analytics platforms</li>
                    <li>Advertising networks</li>
                    <li>Payment processors</li>
                    <li>Travel service partners (airlines, hotels, etc.)</li>
                  </ul>
                  <p>Third-party cookies are governed by the respective providers’ privacy policies. Fareoworld does not control how these cookies are used once they are set by third parties.</p>
                  
                  <h2><strong>6. Managing Cookies</strong></h2>
                  <p>You have full control over how cookies are used on your device.</p>
                  <h3><strong>6.1 Browser Settings</strong></h3>
                  <p>Most browsers allow you to:</p>
                  <ul>
                    <li>Block all cookies</li>
                    <li>Delete existing cookies</li>
                    <li>Allow cookies only from selected websites</li>
                    <li>Receive alerts before cookies are stored</li>
                  </ul>
                  <p>You can adjust these settings in your browser’s privacy or security section.</p>
                  
                  <h3><strong>6.2 Impact of Disabling Cookies</strong></h3>
                  <p>If you disable cookies, some features of Fareoworld may not function properly, including:</p>
                  <ul>
                    <li>Flight and hotel search functionality</li>
                    <li>Booking and checkout process</li>
                    <li>Saved preferences and travel history</li>
                    <li>Personalized recommendations</li>
                  </ul>
                  <p>For the best experience, we recommend keeping cookies enabled.</p>
                  
                  <h3><strong>6.3 Opt-Out Options</strong></h3>
                  <p>For marketing cookies, users may opt out of personalized advertising through browser settings or third-party opt-out tools provided by advertising networks.</p>
                  
                  <h2><strong>7. Data Collected Through Cookies</strong></h2>
                  <p>Cookies may collect limited information such as:</p>
                  <ul>
                    <li>IP address (anonymized in most analytics systems)</li>
                    <li>Browser type and version</li>
                    <li>Device information</li>
                    <li>Pages visited</li>
                    <li>Travel search behavior</li>
                  </ul>
                  <p>This data is used strictly for improving platform performance and user experience.</p>
                  
                  <h2><strong>8. Cookies and Personal Data</strong></h2>
                  <p>Cookies used by Fareoworld do not store sensitive personal information such as:</p>
                  <ul>
                    <li>Passwords</li>
                    <li>Payment card details</li>
                    <li>Government identification numbers</li>
                  </ul>
                  <p>Any personal data collected during booking is processed separately and securely, as described in our Privacy Policy.</p>
                  
                  <h2><strong>9. Updates to This Cookie Policy</strong></h2>
                  <p>Fareoworld may update this Cookie Policy periodically to reflect:</p>
                  <ul>
                    <li>Changes in technology</li>
                    <li>Legal or regulatory updates</li>
                    <li>Improvements in website functionality</li>
                  </ul>
                  <p>Any updates will be posted on this page with a revised effective date.</p>
                  <p>We encourage users to review this policy regularly.</p>
                  
                  <h2><strong>10. User Consent</strong></h2>
                  <p>By using the Fareoworld website, you consent to the use of cookies as described in this policy. If you do not agree, you may disable cookies through your browser settings or stop using the website.</p>
                  <h2><strong>Final Note</strong></h2>
                  <p>Fareoworld uses cookies to ensure a secure, efficient, and personalized travel booking experience across flights, hotels, car rentals, and cruises. Cookies help us improve website performance, enhance user experience, and deliver relevant travel options while maintaining user privacy and control.</p>
                  
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
