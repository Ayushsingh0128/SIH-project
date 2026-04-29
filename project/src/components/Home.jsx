import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import logo from '../assets/logo.jpg';
import heroVideo from '../assets/video.mp4';
import './Home.css';

// Import extracted data and icons
import { services, providers, reviews } from '../data/mockData';
import { StarIcon, HeartIcon, serviceIconMap } from '../data/icons';
import AuthModal from './AuthModal';


// --- UI COMPONENTS ---
const Navbar = ({ page, onNavClick, onLoginClick, onSignupClick, user, onLogout }) => {
    const [scrollOffset, setScrollOffset] = React.useState(0);

    React.useEffect(() => {
        const handleScroll = () => {
            setScrollOffset(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const stripWidth = Math.max(10, 100 - scrollOffset / 8);

    return (
        <nav className="navbar" style={{ borderTop: 'none', position: 'sticky', top: 0 }}>
            <div 
                className="pista-progress-strip" 
                style={{ 
                    width: `${stripWidth}%`, 
                    height: '6px', 
                    backgroundColor: '#81b29a', 
                    borderRadius: '0 0 8px 8px',
                    transition: 'width 0.1s ease-out',
                    position: 'absolute',
                    top: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 1000
                }}
            />
            <div className="container">
                <div className="navbar-content">
                    <div className="navbar-left">
                        <div className="navbar-brand" onClick={() => onNavClick('home')}>
                            <img src={logo} alt="Local Link Logo" className="brand-icon" />
                            <span className="brand-name">Local Link</span>
                        </div>
                    </div>
                    <div className="navbar-center">
                        <div className="navbar-search-bar">
                             <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            <input type="text" placeholder="What service do you need today?" />
                            <button className="btn btn-search">Search</button>
                        </div>
                    </div>
                    <div className="navbar-right">
                        <div className="nav-links">
                            <a className={`nav-link ${page === 'home' ? 'active' : ''}`} onClick={() => onNavClick('home')}>Home</a>
                            <a className={`nav-link ${page === 'servicesList' ? 'active' : ''}`} onClick={() => onNavClick('servicesList')}>Services</a>
                            <a className={`nav-link ${page === 'about' ? 'active' : ''}`} onClick={() => onNavClick('about')}>About Us</a>
                            <a href="#contact-section" className="nav-link">Contact</a>
                        </div>
                        {user ? (
                            <div className="user-profile-nav">
                                <span className="welcome-text" onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}>
                                    Hi, {user.name.split(' ')[0]}
                                </span>
                                <button className="btn btn-login" onClick={onLogout}>Logout</button>
                            </div>
                        ) : (
                            <>
                                <button className="btn btn-login" onClick={onLoginClick}>Login</button>
                                <button className="btn btn-signup" onClick={onSignupClick}>Sign Up</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};


const HeroSection = () => (
    <section className="hero-section">
        <div className="container">
            <div className="hero-grid">
                <div className="hero-text-content">
                    <h1>Your <span className="highlight-text">first friend</span> in a new city.</h1>
                    <p>Stop searching, start living. We connect you with verified local services in Bhopal, so you can feel at home, faster.</p>
                </div>
                <div className="hero-video-content">
                    <video src={heroVideo} autoPlay loop muted playsInline />
                </div>
            </div>
        </div>
    </section>
);

const HomePage = ({ onServiceClick }) => (
    <>
        <HeroSection />
        <section className="page-section" style={{backgroundColor: 'var(--gray-50)'}}>
            <div className="container">
                <div className="section-header">
                    <h2>Explore Our Services</h2>
                    <p>From daily needs to emergency fixes, find every local service you need right here.</p>
                </div>
                <div className="services-grid">
                    {services.map((service) => (
                        <div key={service.name} className="service-card" onClick={() => onServiceClick(service.name)}>
                            <div className="service-card-content"> {serviceIconMap[service.name]} <h3>{service.name}</h3> <p>{service.description}</p> </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    </>
);

const StarRating = ({ rating }) => ( <div className="provider-rating"> {[...Array(5)].map((_, i) => <StarIcon key={i} filled={i < Math.round(rating)} />)} </div> );

const ProviderCard = ({ provider, onBookClick, onViewProfile, onToggleWishlist, isWishlisted }) => (
    <div className="provider-card">
        <div className="wishlist-icon" onClick={() => onToggleWishlist(provider.id)}>
            <HeartIcon filled={isWishlisted} />
        </div>
        <div className="provider-body">
            <div className="provider-header">
                <div className="provider-info">
                    <h4>{provider.name}</h4>
                    <p>{provider.location}</p>
                    <p className="wage">₹{provider.wage} per {provider.category === 'Tiffin Services' ? 'meal' : provider.category === 'PGs & Flats' ? 'day' : 'hour'}</p>
                </div>
                <StarRating rating={provider.rating} />
            </div>
            <p><strong>Skills:</strong> {provider.skills}</p>
        </div>
        <div className="provider-actions">
            <button className="btn btn-provider btn-provider-secondary" onClick={() => onViewProfile(provider)}>View Profile</button>
            <button className="btn btn-provider btn-provider-primary" onClick={() => onBookClick(provider)}>Book Now</button>
        </div>
    </div>
);

const ProvidersPage = ({ service, onBack, onBookClick, onViewProfile, wishlist, setWishlist }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [wageSort, setWageSort] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleSortChange = (sortType) => {
        setWageSort(sortType);
        setIsDropdownOpen(false);
    };

    const handleToggleWishlist = (id) => {
        setWishlist(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    let filteredProviders = providers
        .filter(p => p.category === service)
        .filter(p => p.location.toLowerCase().includes(searchTerm.toLowerCase()));

    if (wageSort === 'low-to-high') {
        filteredProviders.sort((a, b) => a.wage - b.wage);
    } else if (wageSort === 'high-to-low') {
        filteredProviders.sort((a, b) => b.wage - a.wage);
    } else if (wageSort === 'professional') {
        filteredProviders.sort((a, b) => b.rating - a.rating);
    }

    const getDropdownText = () => {
        switch(wageSort) {
            case 'low-to-high': return 'Low to Highest';
            case 'high-to-low': return 'Highest to Lowest';
            case 'professional': return 'Most Professionals';
            default: return 'Wages';
        }
    };

    return (
        <section className="page-section">
            <div className="container">
                <button className="btn btn-back" onClick={onBack}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
                    Back to Services
                </button>
                <div className="section-header" style={{ marginBottom: '2rem' }}>
                    <h2>Providers for {service} in Bhopal</h2>
                </div>

                <div className="providers-page-controls">
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search for location..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="dropdown-container">
                        <button
                            className="dropdown-button"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            {getDropdownText()}
                            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M7 10l5 5 5-5H7z"/></svg>
                        </button>
                        {isDropdownOpen && (
                            <div className="dropdown-menu">
                                <button onClick={() => handleSortChange('low-to-high')}>Low to Highest</button>
                                <button onClick={() => handleSortChange('high-to-low')}>Highest to Lowest</button>
                                <button onClick={() => handleSortChange('professional')}>Most Professionals</button>
                            </div>
                        )}
                    </div>
                </div>

                <main className="providers-list">
                    {filteredProviders.length > 0
                        ? filteredProviders.map(provider => (
                            <ProviderCard
                                key={provider.id}
                                provider={provider}
                                onBookClick={onBookClick}
                                onViewProfile={onViewProfile}
                                onToggleWishlist={handleToggleWishlist}
                                isWishlisted={wishlist.includes(provider.id)}
                            />
                        ))
                        : <p>No providers found for "{service}" with the selected filters. Please adjust your search criteria.</p>
                    }
                </main>
            </div>
        </section>
    );
}

const ReviewCard = ({ review }) => ( <div className="review-card"> <p>{review.comment}</p> <div className="review-footer"> <h4>- {review.name}</h4> <StarRating rating={review.rating} /> </div> </div> );

const AboutUsPage = () => (
    <section className="page-section">
        <div className="container">
            <div className="section-header">
                <h2>What Our Users Say</h2>
                <p>We are proud to have helped thousands of people settle into their new lives in Bhopal. Here is what some of them have to say about us.</p>
            </div>
            <div className="reviews-grid">
                {reviews.map(review => <ReviewCard key={review.id} review={review} />)}
            </div>
        </div>
    </section>
);

const ServicesListPage = ({ onServiceClick }) => (
    <section className="page-section">
        <div className="container">
            <div className="section-header">
                <h2>Our Services</h2>
                <p>One platform for all your local needs. Select a service to find verified and trusted professionals in your area.</p>
            </div>
            <div className="services-grid">
                {services.map((service) => (
                    <div key={service.name} className="service-card" onClick={() => onServiceClick(service.name)}>
                        <div className="service-card-content">
                            {serviceIconMap[service.name]}
                            <h3>{service.name}</h3>
                            <p>{service.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);



// Modal Components
const BookingModal = ({ provider, onClose, onBookNow, onBookLater }) => {
    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Book Service with {provider.name}</h2>
                <p>How would you like to proceed?</p>
                <div className="modal-actions">
                    <button className="btn btn-primary" onClick={onBookNow}>Book Now</button>
                    <button className="btn btn-secondary" onClick={onBookLater}>Book Later</button>
                </div>
            </div>
        </div>
    );
};

const BookNowPage = ({ provider, onClose }) => {
    const [selectedPayment, setSelectedPayment] = useState(null);
    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Booking: {provider.name}</h2>
                <p>Select your payment option to confirm your booking.</p>
                <div className="payment-options-container">
                    <h3>Payment Options</h3>
                    <div className="payment-options">
                        <div className={`payment-option ${selectedPayment === 'upi' ? 'selected' : ''}`} onClick={() => setSelectedPayment('upi')}>
                            <p>UPI</p>
                        </div>
                        <div className={`payment-option ${selectedPayment === 'cod' ? 'selected' : ''}`} onClick={() => setSelectedPayment('cod')}>
                            <p>Cash on Delivery</p>
                        </div>
                    </div>
                </div>
                <div className="modal-actions" style={{ marginTop: '2rem' }}>
                    <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
                    <button className="btn btn-primary" disabled={!selectedPayment}>Confirm Booking</button>
                </div>
                <div className="call-now-option" style={{ marginTop: '1rem', textAlign: 'center' }}>
                    <p style={{ fontSize: '0.9rem' }}>Prefer to talk? <a href={`tel:${provider.contact}`}>Call Now</a></p>
                </div>
            </div>
        </div>
    );
};

const BookLaterPage = ({ provider, onClose }) => {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [selectedPayment, setSelectedPayment] = useState(null);
    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Schedule with {provider.name}</h2>
                <p>Choose a date and time for the service.</p>
                <div className="schedule-container">
                    <h3>Service Details</h3>
                    <div className="input-group">
                        <label htmlFor="schedule-date">Date</label>
                        <input type="date" id="schedule-date" value={date} onChange={(e) => setDate(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="schedule-time">Time</label>
                        <input type="time" id="schedule-time" value={time} onChange={(e) => setTime(e.target.value)} />
                    </div>
                </div>
                <div className="payment-options-container">
                    <h3>Payment Options</h3>
                    <div className="payment-options">
                        <div className={`payment-option ${selectedPayment === 'upi' ? 'selected' : ''}`} onClick={() => setSelectedPayment('upi')}>
                            <p>UPI</p>
                        </div>
                        <div className={`payment-option ${selectedPayment === 'cod' ? 'selected' : ''}`} onClick={() => setSelectedPayment('cod')}>
                            <p>Cash on Delivery</p>
                        </div>
                    </div>
                </div>
                <div className="modal-actions" style={{ marginTop: '2rem' }}>
                    <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
                    <button className="btn btn-primary" disabled={!date || !time || !selectedPayment}>Schedule & Book</button>
                </div>
                <div className="call-now-option" style={{ marginTop: '1rem', textAlign: 'center' }}>
                    <p style={{ fontSize: '0.9rem' }}>Prefer to talk? <a href={`tel:${provider.contact}`}>Call Now</a></p>
                </div>
            </div>
        </div>
    );
};

const ProfileModal = ({ provider, onClose }) => {
    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>{provider.name}</h2>
                <p>{provider.category} in {provider.location}</p>
                <div className="profile-details">
                    <h3>Profile Details</h3>
                    <p><strong>Contact:</strong> {provider.contact}</p>
                    <p><strong>Experience:</strong> {provider.experience}</p>
                    <p><strong>Gender:</strong> {provider.gender}</p>
                    <p><strong>Job Type:</strong> {provider.jobType}</p>
                    <p><strong>Skills:</strong> {provider.skills}</p>
                </div>
                <div className="modal-actions" style={{ marginTop: '2rem', justifyContent: 'center' }}>
                    <button className="btn btn-secondary" onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};


const Footer = () => (
    <footer id="contact-section" className="footer">
        <div className="container">
            <div className="footer-grid">
                <div className="footer-col footer-brand-col">
                    <div className="navbar-brand">
                        <img src={logo} alt="Local Link Logo" className="lower-icon" />
                        <span className="brand-name" style={{color: 'white'}}>Local Link</span>
                    </div>
                    <p>Your trusted partner for settling into a new city.</p>
                </div>
                <div className="footer-col">
                    <h3>Services</h3>
                    <ul>{services.slice(0, 5).map(s => <li key={s.name}><a href="#">{s.name}</a></li>)}</ul>
                </div>
                <div className="footer-col">
                    <h3>Company</h3>
                    <ul><li><a href="#">About Us</a></li><li><a href="#">Careers</a></li><li><a href="#">Press</a></li></ul>
                </div>
                <div className="footer-col">
                    <h3>Contact</h3>
                    <ul><li>contact@locallink.com</li><li>+91 12345 67890</li><li>Bhopal, Madhya Pradesh</li></ul>
                </div>
            </div>
            <div className="footer-bottom"><p>&copy; {new Date().getFullYear()} Local Link. All Rights Reserved.</p></div>
        </div>
    </footer>
);

// --- MAIN APP COMPONENT ---
export default function Home() {
    const navigate = useNavigate();

    const [page, setPage] = useState('home');
    const [selectedService, setSelectedService] = useState(null);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [authModalView, setAuthModalView] = useState('login');

    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [isBookNowPageOpen, setIsBookNowPageOpen] = useState(false);
    const [isBookLaterPageOpen, setIsBookLaterPageOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [currentProvider, setCurrentProvider] = useState(null);
    const [wishlist, setWishlist] = useState([]);
    const [user, setUser] = useState(null);

    React.useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);



    const handleNavClick = (pageName) => {
        setPage(pageName);
        setSelectedService(null);
        window.scrollTo(0, 0);
    };

    const handleServiceClick = (serviceName) => {
        setSelectedService(serviceName);
        setPage('serviceProviders');
        window.scrollTo(0, 0);
    };

    const openLoginModal = () => {
        setAuthModalView('login');
        setIsAuthModalOpen(true);
    };
    const openSignupModal = () => {
        setAuthModalView('signup');
        setIsAuthModalOpen(true);
    };
    const closeAuthModal = () => {
        setIsAuthModalOpen(false);
    };

    const handleAuthSuccess = (userData) => {
        setUser(userData);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };


    const handleBookClick = (provider) => {
        setCurrentProvider(provider);
        setIsBookingModalOpen(true);
    };
    const handleBookNow = () => {
        setIsBookingModalOpen(false);
        setIsBookNowPageOpen(true);
    };
    const handleBookLater = () => {
        setIsBookingModalOpen(false);
        setIsBookLaterPageOpen(true);
    };
    const closeAllModals = () => {
        setIsBookingModalOpen(false);
        setIsBookNowPageOpen(false);
        setIsBookLaterPageOpen(false);
        setIsProfileModalOpen(false);
    };

    const handleViewProfile = (provider) => {
        setCurrentProvider(provider);
        setIsProfileModalOpen(true);
    };

    const renderPage = () => {
        switch (page) {
            case 'home':
                return <HomePage onServiceClick={handleServiceClick} />;
            case 'servicesList':
                return <ServicesListPage onServiceClick={handleServiceClick} />;
            case 'serviceProviders':
                return <ProvidersPage
                            service={selectedService}
                            onBack={() => handleNavClick('servicesList')}
                            onBookClick={handleBookClick}
                            onViewProfile={handleViewProfile}
                            wishlist={wishlist}
                            setWishlist={setWishlist}
                        />;
            case 'about':
                return <AboutUsPage />;
            default:
                return <HomePage onServiceClick={handleServiceClick} />;
        }
    };

    return (
        <div className="app-wrapper">
            <Navbar
                page={page}
                onNavClick={handleNavClick}
                onLoginClick={openLoginModal}
                onSignupClick={openSignupModal}
                user={user}
                onLogout={handleLogout}
            />
            <main>
                {renderPage()}
            </main>
            {isAuthModalOpen && (
                <AuthModal
                    initialView={authModalView}
                    onClose={closeAuthModal}
                    onAuthSuccess={handleAuthSuccess}
                />
            )}

            <Footer />
        </div>
    );
}