'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import '@/components/shared/policyshared.css';

export default function PolicyCancellationPage() {
  return (
    <section className='site-policy'>
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <div className="policycancellation-page">
              <div className="pol-wrap">
                <Link href="/" className="pol-back">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
                  Back to Home
                </Link>
                <div className="pol-icon">❌</div>
                <h1 className="pol-title">Cancellation Policy</h1>
                <div className="pol-content">
                    <p>This Cancellation Policy explains how cancellations work for bookings made through Fareoworld. It applies to all travel services available on the platform, including flights, hotels, car rentals, cruises, and any related travel products.</p>
                    <p>Fareoworld operates as an <strong>independent travel booking platform</strong> that connects users with third-party service providers. Cancellation eligibility, charges, and refunds are determined based on the terms set by those providers at the time of booking.</p>
                    <p>By making a booking on Fareoworld, you agree to the terms outlined in this Cancellation Policy.</p>

                    <h2><strong>1. Understanding How Cancellations Work</strong></h2>
                    <p>When you book a service through Fareoworld, your reservation is fulfilled by a third-party provider, such as an airline, hotel, or rental agency. Each provider has its own cancellation rules.</p>
                    <p>Fareoworld:</p>
                    <ul>
                      <li>Facilitates cancellation requests.</li>
                      <li>Communicates supplier policies clearly.</li>
                      <li>Processes requests based on the booking terms.</li>
                    </ul>
                    <p>However, Fareoworld does not control final decisions related to cancellation approvals or refund amounts.</p>

                    <h2><strong>2. Scope of This Policy</strong></h2>
                    <p>This policy applies to cancellations for:</p>
                    <ul>
                      <li>Flight tickets (domestic and international).</li>
                      <li>Hotel reservations and accommodations.</li>
                      <li>Car rental bookings.</li>
                      <li>Cruise reservations.</li>
                      <li>Vacation packages or bundled bookings.</li>
                    </ul>
                    <p>The same general principles apply across all services, though specific rules may vary depending on the provider.</p>

                    <h2><strong>3. Cancellation Eligibility</strong></h2>
                    <p>Cancellation eligibility depends on the type of booking selected at the time of purchase.</p>
                    <h3><strong>Non-Refundable Bookings</strong></h3>
                    <ul>
                      <li>These bookings cannot be cancelled for a refund.</li>
                      <li>The full amount may be charged upon cancellation.</li>
                      <li>In some cases, only certain taxes may be refundable.</li>
                    </ul>

                    <h3><strong>Partially Refundable Bookings</strong></h3>
                    <ul>
                      <li>Cancellation charges apply.</li>
                      <li>A portion of the booking amount may be refunded.</li>
                      <li>The refund amount depends on supplier policies.</li>
                    </ul>

                    <h3><strong>Flexible or Refundable Bookings</strong></h3>
                    <ul>
                      <li>Cancellation is allowed within a defined timeframe.</li>
                      <li>Refunds are processed after deducting applicable charges.</li>
                    </ul>

                    <h3><strong>Promotional or Discounted Fares</strong></h3>
                    <ul>
                      <li>These bookings may have stricter cancellation rules.</li>
                      <li>Lower prices may come with limited flexibility.</li>
                    </ul>
                    <p>All cancellation conditions are displayed before you complete your booking.</p>

                    <h2><strong>4. Cancellation Timeframes</strong></h2>
                    <p>The timing of your cancellation request affects the charges applied.</p>
                    <h3><strong>General Guidelines:</strong></h3>
                    <ul>
                      <li>Advance cancellations: Lower cancellation fees may apply.</li>
                      <li>Closer to service date: Higher penalties may apply.</li>
                      <li>Last-minute cancellations: Limited or no refund.</li>
                      <li>After start time or no-show: No refund.</li>
                    </ul>
                    <p>Each booking includes specific cancellation deadlines that must be followed.</p>

                    <h2><strong>5. No-Show Policy</strong></h2>
                    <p>A no-show occurs when a customer does not use the booked service and does not cancel in advance.</p>
                    <p>Examples include:</p>
                    <ul>
                      <li>Not checking in for a flight.</li>
                      <li>Not arriving at a hotel.</li>
                      <li>Not picking up a rental vehicle.</li>
                    </ul>
                    <p>In such cases:</p>
                    <ul>
                      <li>The booking may be cancelled automatically.</li>
                      <li>The full amount may be charged.</li>
                      <li>Refunds are generally not provided.</li>
                    </ul>

                    <h2><strong>6. Multi-Service and Package Bookings</strong></h2>
                    <p>If your booking includes multiple services, for example, flight + hotel or hotel + car rental:</p>
                    <ul>
                      <li>Each service is subject to its own cancellation rules.</li>
                      <li>Cancelling one part may affect the remaining booking.</li>
                      <li>Refunds are calculated separately for each component.</li>
                    </ul>
                    <p>In some cases, bundled discounts may no longer apply after partial cancellation.</p>

                    <h2><strong>7. Partial Cancellations</strong></h2>
                    <p>Partial cancellations (such as removing one traveler or one service component) may be allowed depending on the booking.</p>
                    <p>Important points:</p>
                    <ul>
                      <li>Not all bookings support partial cancellation.</li>
                      <li>Remaining services may be repriced.</li>
                      <li>Additional charges may apply.</li>
                    </ul>

                    <h2><strong>8. How to Cancel a Booking</strong></h2>
                    <p>To cancel a booking, you must contact Fareoworld through official support channels.</p>
                    <h3><strong>Steps:</strong></h3>
                    <ol>
                      <li>Submit a cancellation request via email or phone.</li>
                      <li>Provide your booking confirmation number.</li>
                      <li>Share relevant details (name, travel date, service type).</li>
                      <li>Wait for confirmation from the support team.</li>
                    </ol>
                    <p>A cancellation is only confirmed after you receive official confirmation from Fareoworld.</p>

                    <h2><strong>9. Cancellation Processing Timeline</strong></h2>
                    <p>Cancellation requests are processed in coordination with service providers.</p>
                    <h3><strong>Typical Timeline:</strong></h3>
                    <ul>
                      <li>Request acknowledgment: Within 24–48 hours.</li>
                      <li>Processing with provider: 2–7 business days.</li>
                      <li>Final confirmation: Depends on provider response.</li>
                    </ul>
                    <p>Processing times may vary depending on:</p>
                    <ul>
                      <li>Provider response speed.</li>
                      <li>Nature of the request.</li>
                      <li>Travel date proximity.</li>
                    </ul>

                    <h2><strong>10. Refunds After Cancellation</strong></h2>
                    <p>Refunds, if applicable, are processed after the cancellation is approved.</p>
                    <h3><strong>Important Conditions:</strong></h3>
                    <ul>
                      <li>Refund eligibility depends on booking terms.</li>
                      <li>Cancellation charges are deducted as per provider policy.</li>
                      <li>Service fees charged by Fareoworld are non-refundable.</li>
                      <li>Refunds are issued to the original payment method.</li>
                    </ul>
                    <h3><strong>Refund Timeline:</strong></h3>
                    <ul>
                      <li>Provider processing: 7–14 business days.</li>
                      <li>Payment processing: Additional 5–10 business days.</li>
                    </ul>
                    <p>Actual timelines may vary.</p>

                    <h2><strong>11. Changes vs Cancellation</strong></h2>
                    <p>In some cases, a booking change (such as date or service modification) may be treated as:</p>
                    <ul>
                      <li>Cancellation of the original booking.</li>
                      <li>Creation of a new booking.</li>
                    </ul>
                    <p>This may result in:</p>
                    <ul>
                      <li>Cancellation charges.</li>
                      <li>Price difference for the new booking.</li>
                    </ul>
                    <p>Users are informed of applicable charges before proceeding.</p>

                    <h2><strong>12. Special Situations</strong></h2>
                    <h3><strong>Medical or Personal Emergencies</strong></h3>
                    <p>Cancellation requests may be reviewed if supported by valid documentation. Approval depends on the provider’s policy.</p>

                    <h3><strong>Force Majeure Events</strong></h3>
                    <p>Events such as natural disasters, travel restrictions, or government actions may affect bookings.</p>
                    <p>In such cases:</p>
                    <ul>
                      <li>Providers may offer refunds, credits, or rescheduling options.</li>
                      <li>Policies vary depending on the provider.</li>
                    </ul>

                    <h2><strong>13. Provider-Initiated Cancellations</strong></h2>
                    <p>If a service provider cancels your booking:</p>
                    <ul>
                      <li>You may be offered an alternative or a refund.</li>
                      <li>The outcome depends on provider policy.</li>
                      <li>Fareoworld communicates updates and assists with next steps.</li>
                    </ul>

                    <h2><strong>14. Service Fees</strong></h2>
                    <p>Fareoworld may charge service fees for booking and support.</p>
                    <p>These fees:</p>
                    <ul>
                      <li>Are displayed at the time of booking.</li>
                      <li>Are non-refundable, even if the booking is cancelled.</li>
                    </ul>

                    <h2><strong>15. Your Responsibilities</strong></h2>
                    <p>To avoid cancellation issues, users should:</p>
                    <ul>
                      <li>Review cancellation terms before booking.</li>
                      <li>Ensure all details are correct.</li>
                      <li>Cancel within the allowed timeframe.</li>
                      <li>Keep booking confirmation details accessible.</li>
                    </ul>

                    <h2><strong>16. Limitations</strong></h2>
                    <p>Fareoworld:</p>
                    <ul>
                      <li>Does not set cancellation rules for providers.</li>
                      <li>Cannot guarantee refund approval.</li>
                      <li>Is not responsible for losses resulting from cancellations.</li>
                    </ul>
                    <p>All decisions are made by the service provider.</p>

                    <h2><strong>17. Communication and Confirmation</strong></h2>
                    <ul>
                      <li>All cancellation requests must be confirmed via email or official communication.</li>
                      <li>Keep a record of your cancellation confirmation.</li>
                      <li>Follow up if you do not receive a response within the expected timeframe.</li>
                    </ul>

                    <h2><strong>18. Fraud and Verification</strong></h2>
                    <p>For security purposes:</p>
                    <ul>
                      <li>Identity verification may be required.</li>
                      <li>Requests with incomplete or incorrect details may be delayed.</li>
                    </ul>

                    <h2><strong>19. Policy Updates</strong></h2>
                    <p>Fareoworld may update this Cancellation Policy as needed. Updated versions will be published on this page.</p>
                    <h2><strong>Final Note</strong></h2>
                    <p>This Cancellation Policy is designed to provide clear and transparent information about how cancellations work on Fareoworld. Since all bookings are fulfilled by third-party providers, their individual policies determine final outcomes related to cancellations and refunds.</p>


                  </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
