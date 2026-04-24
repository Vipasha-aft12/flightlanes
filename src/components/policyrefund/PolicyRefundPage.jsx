'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import '@/components/shared/policyshared.css';

export default function PolicyRefundPage() {


  return (
    <section className='site-policy'>
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <div className="policyrefund-page">
              <div className="pol-wrap">
                <Link href="/" className="pol-back">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
                  Back to Home
                </Link>
                <div className="pol-icon">💳</div>
                <div className="pol-badge">Financial</div>
                <div className="pol-content pt-2">

                  <h1><strong>Refund Policy </strong></h1>
                  <p>This Refund Policy explains how refunds are processed for bookings made through Fareoworld. It applies to all travel services available on the platform, including <strong>flight tickets, hotel reservations, car rentals, cruise bookings, and any other travel-related services</strong> offered by third-party providers.</p>
                  <p>Fareoworld operates as an online travel booking platform that connects users with independent service providers. Refund eligibility, approval, and timelines depend on the terms and conditions of the respective travel supplier.</p>
                  <p>By using Fareoworld, you agree to the terms outlined in this Refund Policy.</p>
                  
                  <h2><strong>1. Overview of Refund Process</strong></h2>
                  <p>Refunds are not automatic. They are processed only when:</p>
                  <ul>
                    <li>A booking is eligible for a refund under supplier rules</li>
                    <li>A cancellation request is successfully approved</li>
                    <li>The service provider confirms the refund amount</li>
                  </ul>
                  <p>Fareoworld acts as an intermediary and forwards refund requests to the relevant service provider for approval.</p>
                  
                  <h2><strong>2. Scope of This Refund Policy</strong></h2>
                  <p>This policy applies to:</p>
                  <ul>
                    <li>Flight bookings (domestic and international)</li>
                    <li>Hotel reservations and accommodations</li>
                    <li>Car rental bookings</li>
                    <li>Cruise reservations</li>
                    <li>Vacation packages or bundled travel services</li>
                  </ul>
                  <p>Each service is governed by its own fare rules and cancellation conditions, which directly impact refund eligibility.</p>
                  
                  <h2><strong>3. General Refund Conditions</strong></h2>
                  <p>Refund eligibility depends on multiple factors, including:</p>
                  <ul>
                    <li>Type of booking (refundable or non-refundable)</li>
                    <li>Time of cancellation request</li>
                    <li>Service provider policies (airline, hotel, etc.)</li>
                    <li>Applicable taxes and government charges</li>
                    <li>Promotional or discounted fares</li>
                  </ul>
                  <p>Important points:</p>
                  <ul>
                    <li>Some bookings are fully non-refundable</li>
                    <li>Some bookings allow partial refunds only</li>
                    <li>Refund amounts may include deductions for penalties or fees</li>
                    <li>Fareoworld service fees are non-refundable in most cases</li>
                  </ul>
                  
                  <h2><strong>4. Refund Eligibility Criteria</strong></h2>
                  <p>A refund may be applicable under the following conditions:</p>
                  <h3><strong>4.1 Refundable Bookings</strong></h3>
                  <ul>
                    <li>Eligible for refund as per supplier rules</li>
                    <li>Cancellation must be done within allowed timeframe</li>
                    <li>Deduction of applicable charges may apply</li>
                  </ul>
                  
                  <h3><strong>4.2 Non-Refundable Bookings</strong></h3>
                  <ul>
                    <li>Not eligible for refund after booking confirmation</li>
                    <li>Only applicable taxes may be refunded in some cases</li>
                    <li>Full base fare is generally forfeited</li>
                  </ul>
                  
                  <h3><strong>4.3 Partially Refundable Bookings</strong></h3>
                  <ul>
                    <li>Refund issued after deducting cancellation fees</li>
                    <li>Amount depends on fare rules and timing of cancellation</li>
                  </ul>
                  
                  <h3><strong>4.4 Special Promotional Fares</strong></h3>
                  <ul>
                    <li>Often have strict refund restrictions</li>
                    <li>May be fully non-refundable</li>
                    <li>Conditions are clearly displayed at booking stage</li>
                  </ul>
                  
                  <h2><strong>5. Refund Process Flow</strong></h2>
                  <p>Refunds follow a structured process:</p>
                  <h3><strong>Step 1: Cancellation Request</strong></h3>
                  <p>User submits a cancellation request via Fareoworld support.</p>
                  <h3><strong>Step 2: Verification</strong></h3>
                  <p>Booking details are verified for eligibility.</p>
                  <h3><strong>Step 3: Supplier Approval</strong></h3>
                  <p>Request is forwarded to the travel service provider (airline, hotel, etc.).</p>
                  <h3><strong>Step 4: Refund Calculation</strong></h3>
                  <p>Provider calculates refund amount after deducting applicable charges.</p>
                  <h3><strong>Step 5: Refund Initiation</strong></h3>
                  <p>Approved refund is processed to the original payment method.</p>
                  
                  <h2><strong>6. Refund Timelines</strong></h2>
                  <p>Refund processing time varies depending on the service provider and payment method.</p>
                  <h3><strong>Typical timelines:</strong></h3>
                  <ul>
                    <li>Airline/hotel/cruise approval: 7–14 business days</li>
                    <li>Payment gateway processing: 5–10 additional business days</li>
                  </ul>
                  <p>Total refund time may vary depending on:</p>
                  <ul>
                    <li>Bank processing speed</li>
                    <li>International transactions</li>
                    <li>Supplier response time</li>
                  </ul>
                  
                  <h2><strong>7. Refund Amount Calculation</strong></h2>
                  <p>Refund amount may include deductions such as:</p>
                  <ul>
                    <li>Airline or supplier cancellation fees</li>
                    <li>Fare difference charges</li>
                    <li>Non-refundable taxes or surcharges</li>
                    <li>Fareoworld service fees (if applicable)</li>
                  </ul>
                  <p>The final refund amount is determined by the service provider.</p>
                  
                  <h2><strong>8. Non-Refundable Components</strong></h2>
                  <p>Certain charges are generally non-refundable, including:</p>
                  <ul>
                    <li>Service or convenience fees charged by Fareoworld</li>
                    <li>Promotional discounts applied at booking</li>
                    <li>Insurance fees (if purchased separately, depending on provider terms)</li>
                    <li>Some government or airport taxes (based on supplier rules)</li>
                  </ul>
                  
                  <h2><strong>9. Refunds for Flight Bookings</strong></h2>
                  <p>Flight refunds depend on airline fare rules:</p>
                  <ul>
                    <li>Refundable tickets: Eligible after deductions</li>
                    <li>Non-refundable tickets: Limited or no refund</li>
                    <li>No-show cases: Usually not eligible for refund</li>
                    <li>Flight cancellations by airline: Refund or alternative offered by airline</li>
                  </ul>
                  
                  <h2><strong>10. Refunds for Hotel Bookings</strong></h2>
                  <p>Hotel refunds depend on property policies:</p>
                  <ul>
                    <li>Free cancellation bookings: Eligible within allowed time</li>
                    <li>Late cancellations: Partial refund or penalty applies</li>
                    <li>No-show bookings: Usually charged in full</li>
                    <li>Early check-out: Refund depends on hotel discretion</li>
                  </ul>
                  
                  <h2><strong>11. Refunds for Car Rentals</strong></h2>
                  <p>Car rental refunds depend on provider rules:</p>
                  <ul>
                    <li>Cancellation before pickup: Partial or full refund possible</li>
                    <li>No-show cases: No refund</li>
                    <li>Early return: No automatic refund for unused days</li>
                  </ul>
                  
                  <h2><strong>12. Refunds for Cruise Bookings</strong></h2>
                  <p>Cruise refunds follow strict timelines:</p>
                  <ul>
                    <li>Early cancellation: Partial refund after deductions</li>
                    <li>Mid-stage cancellation: Higher penalties apply</li>
                    <li>Late cancellation or no-show: Usually non-refundable</li>
                    <li>Refund percentage decreases closer to departure date</li>
                  </ul>
                  
                  <h2><strong>13. Failed or Duplicate Transactions</strong></h2>
                  <p>If a payment is:</p>
                  <ul>
                    <li>Deducted but booking not confirmed</li>
                    <li>Charged multiple times</li>
                  </ul>
                  <p>Then:</p>
                  <ul>
                    <li>Refund is processed after verification</li>
                    <li>Timeline depends on payment gateway and bank</li>
                  </ul>
                
                  <h2><strong>14. Refund Method</strong></h2>
                  <p>Approved refunds are issued only to:</p>
                  <ul>
                    <li>The original payment method used at booking</li>
                  </ul>
                  <p>Refunds cannot be transferred to another account or payment method.</p>
                  
                  <h2><strong>15. Delayed Refunds</strong></h2>
                  <p>Refund delays may occur due to:</p>
                  <ul>
                    <li>Supplier processing time</li>
                    <li>Bank or payment gateway delays</li>
                    <li>International transaction processing</li>
                    <li>Incomplete or incorrect booking details</li>
                  </ul>
                  <p>If delays exceed expected timelines, users may contact support.</p>
              
                  <h2><strong>16. Changes vs Refunds</strong></h2>
                  <p>In some cases, a booking modification may result in:</p>
                  <ul>
                    <li>Cancellation of original booking</li>
                    <li>Creation of a new booking</li>
                  </ul>
                  <p>This may affect refund eligibility and may include additional charges.</p>
                  
                  <h2><strong>17. Fareoworld Role in Refunds</strong></h2>
                  <p>Fareoworld:</p>
                  <ul>
                    <li>Facilitates refund requests</li>
                    <li>Communicates with suppliers</li>
                    <li>Tracks refund status for users</li>
                  </ul>
                  <p>However:</p>
                  <ul>
                    <li>Final refund approval is controlled by service providers</li>
                    <li>Refund amount is determined by supplier policies</li>
                  </ul>
                  
                  <h2><strong>18. User Responsibilities</strong></h2>
                  <p>Users must:</p>
                  <ul>
                    <li>Review refund rules before booking</li>
                    <li>Submit cancellation requests within allowed timeframe</li>
                    <li>Provide correct booking details</li>
                    <li>Follow communication instructions for processing</li>
                  </ul>
                  
                  <h2><strong>19. Policy Updates</strong></h2>
                  <p>Fareoworld may update this Refund Policy at any time due to:</p>
                  <ul>
                    <li>Supplier policy changes</li>
                    <li>Legal or regulatory updates</li>
                    <li>Operational improvements</li>
                  </ul>
                  <p>Updated versions will be published on this page.</p>
                  
                  <h2><strong>Final Statement</strong></h2>
                  <p>This Refund Policy is designed to ensure transparency and clarity regarding how refunds are processed on Fareoworld. Since all travel services are provided by third-party suppliers, refund decisions are based on their individual policies and timelines.</p>
                
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
