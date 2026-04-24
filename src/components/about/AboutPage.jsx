'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import '@/components/shared/policyshared.css';

export default function AboutPage() {

  return (
    <section className='site-policy'>
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <h1><strong>About Us </strong></h1>
            <p>Fareoworld is an online travel booking platform that helps users search, compare, and book travel services in a simple and structured way. Our platform brings together flights, hotels, car rentals, cruise bookings, and other travel-related services in one place, so users do not need to visit multiple websites to plan their trips.</p>
            <p>We are designed to support travelers at every stage of their journey, from discovering options to completing bookings. Fareoworld connects users with third-party travel service providers and helps facilitate a smooth booking experience with clear information and secure processing.</p>
            <p>Our focus is to make travel planning easier, more transparent, and more accessible for all types of travelers, whether they are booking for business, leisure, or emergency travel needs.</p>

            <h2><strong>Why Choose Fareoworld</strong></h2>
            <p>Fareoworld is built to provide a straightforward and convenient travel booking experience. We focus on clarity, speed, and accessibility so that users can make informed decisions without confusion.</p>
            <ul>
              <li>All travel services available in one platform.</li>
              <li>Simple search and booking process.</li>
              <li>Clear display of travel options and details.</li>
              <li>Secure payment and booking system.</li>
              <li>Support for flights, hotels, car rentals, and cruises.</li>
              <li>Assistance available for booking-related queries.</li>
            </ul>

            <h2><strong>What We Do</strong></h2>
            <p>Fareoworld works as an intermediary travel booking platform. We do not directly operate airlines, hotels, or transport services. Instead, we connect users with third-party providers and help manage the booking process.</p>
            <p>We assist users with:</p>
            <ul>
              <li>Searching and comparing travel options.</li>
              <li>Booking flights, hotels, car rentals, and cruises.</li>
              <li>Accessing multiple travel providers through one system.</li>
              <li>Receiving booking confirmations and updates.</li>
              <li>Handling cancellation and refund requests through support channels.</li>
            </ul>
            <h2><strong>What Makes Us Different</strong></h2>
            <p>Fareoworld focuses on simplifying travel booking by bringing multiple services together in a single platform. Our approach is centered on ease of use and structured information.</p>
            <ul>
              <li>One platform for multiple travel services.</li>
              <li>Easy navigation and search experience.</li>
              <li>Clear and organized booking details.</li>
              <li>Faster access to travel options and availability.</li>
              <li>Customer support for booking assistance.</li>
              <li>Designed for both frequent and occasional travelers.</li>
            </ul>

            <h2><strong>Our Commitment</strong></h2>
            <p>We are committed to providing a reliable travel booking experience with clear information and consistent support. Our goal is to reduce the complexity involved in travel planning and make the process more efficient for users.</p>
            <p>We also aim to maintain transparency in how bookings are displayed and processed, so users can understand their options before confirming any reservation.</p>

            <h2><strong>Our Vision</strong></h2>
            <p>Our vision is to build a trusted travel booking platform that helps users plan trips with confidence, simplicity, and clarity. We aim to continuously improve the booking experience and expand access to global travel services.</p>
            <h2><strong>Travel With Confidence</strong></h2>
            <p>Fareoworld is designed to make travel planning more organized and accessible. Whether you are booking a short trip or a long journey, our platform helps you explore options, compare services, and complete bookings with ease.</p>

          </div>
        </div>
      </div>
    </section>
  );
}
