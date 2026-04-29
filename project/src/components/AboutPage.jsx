import React from 'react';
import { reviews } from '../data/mockData';
import { StarIcon } from '../data/icons';

const StarRating = ({ rating }) => (
    <div className="provider-rating">
        {[...Array(5)].map((_, i) => <StarIcon key={i} filled={i < Math.round(rating)} />)}
    </div>
);

const ReviewCard = ({ review }) => (
    <div className="review-card">
        <p>{review.comment}</p>
        <div className="review-footer">
            <h4>- {review.name}</h4>
            <StarRating rating={review.rating} />
        </div>
    </div>
);

export default function AboutPage() {
    return (
        <section className="page-section">
            <div className="container">
                {/* About Us Section */}
                <div className="section-header">
                    <h2>About Local Link</h2>
                    <p>We're building the bridge between newcomers and trusted local services in Bhopal.</p>
                </div>

                <div className="about-content">
                    <div className="about-cards-grid">
                        <div className="about-card">
                            <div className="about-card-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                            </div>
                            <h3>Our Mission</h3>
                            <p>To make settling into a new city effortless by connecting people with verified, trusted local service providers — from plumbers and electricians to tiffin services and PGs.</p>
                        </div>
                        <div className="about-card">
                            <div className="about-card-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                            </div>
                            <h3>Why Us?</h3>
                            <p>Every provider on our platform is verified. We ensure quality, reliability, and transparency so you never have to worry about who you're hiring.</p>
                        </div>
                        <div className="about-card">
                            <div className="about-card-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                            </div>
                            <h3>Safe & Secure</h3>
                            <p>Your data is encrypted and your transactions are secure. We prioritize your safety above everything else.</p>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="section-header" style={{ marginTop: '4rem' }}>
                    <h2>What Our Users Say</h2>
                    <p>We are proud to have helped thousands of people settle into their new lives in Bhopal.</p>
                </div>
                <div className="reviews-grid">
                    {reviews.map(review => <ReviewCard key={review.id} review={review} />)}
                </div>
            </div>
        </section>
    );
}
