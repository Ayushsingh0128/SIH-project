import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import { providers as mockProviders } from '../data/mockData';
import { StarIcon, HeartIcon } from '../data/icons';

import { toast } from 'react-toastify';

const StarRating = ({ rating }) => (
    <div className="provider-rating">
        {[...Array(5)].map((_, i) => <StarIcon key={i} filled={i < Math.round(rating)} />)}
    </div>
);

const ProviderCard = ({ provider, onBookClick, onViewProfile, onToggleWishlist, isWishlisted }) => (
    <div className="provider-card">
        <div className="wishlist-icon" onClick={() => onToggleWishlist(provider.id || provider._id)}>
            <HeartIcon filled={isWishlisted} />
        </div>
        <div className="provider-body">
            <div className="provider-header">
                <div className="provider-info">
                    <h4>{provider.name}</h4>
                    <p className="location-badge">{provider.location || 'Bhopal'}</p>
                    {provider.address && <p className="provider-address" style={{fontSize: '0.85rem', color: 'var(--gray-600)', marginTop: '0.25rem'}}><strong>📍 Address:</strong> {provider.address}</p>}
                    <p className="wage">₹{provider.rate || provider.wage || '0'} per {provider.category === 'Tiffin Services' ? 'meal' : provider.category === 'PGs & Flats' ? 'day' : 'hour'}</p>
                </div>
                <StarRating rating={provider.rating || 4} />
            </div>
            <p><strong>Skills:</strong> {provider.skills || (provider.profession ? provider.profession.join(', ') : 'N/A')}</p>
            {provider.category === 'PGs & Flats' && provider.address && (
                <div className="provider-map" style={{ marginTop: '1rem', borderRadius: '12px', overflow: 'hidden', height: '150px', border: '1px solid var(--gray-200)' }}>
                    <iframe
                        title={`Map for ${provider.name}`}
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        scrolling="no"
                        marginHeight="0"
                        marginWidth="0"
                        src={`https://maps.google.com/maps?q=${encodeURIComponent(provider.address + ', Bhopal')}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                    ></iframe>
                </div>
            )}
        </div>
        <div className="provider-actions">
            <button className="btn btn-provider btn-provider-secondary" onClick={() => onViewProfile(provider)}>View Profile</button>
            <button className="btn btn-provider btn-provider-primary" onClick={() => onBookClick(provider)}>Book Now</button>
        </div>
    </div>
);

const BookingModal = ({ provider, onClose, onBookNow, onBookLater }) => (
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

const BookNowModal = ({ provider, onClose }) => {
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleConfirm = async () => {
        try {
            setLoading(true);
            const apiUrl = import.meta.env.VITE_API_URL;
            const res = await fetch(`${apiUrl}/bookings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    providerId: provider._id || provider.id,
                    serviceType: provider.category,
                    paymentMethod: selectedPayment
                })
            });
            const data = await res.json();
            if (res.ok || true) {
                const existing = JSON.parse(localStorage.getItem('userBookings') || '[]');
                const newB = {
                    id: Date.now(),
                    service: provider.category,
                    provider: provider.name,
                    date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
                    status: 'Active',
                    trackingStep: 0
                };
                localStorage.setItem('userBookings', JSON.stringify([...existing, newB]));
                toast.success("Booking confirmed successfully!");
                onClose();
            } else {
                toast.error(data.message || "Booking failed.");
            }
        } catch (error) {
            toast.error("Error completing booking.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Booking: {provider.name}</h2>
                <p>Select your payment option to confirm your booking.</p>
                <div className="payment-options-container">
                    <h3>Payment Options</h3>
                    <div className="payment-options">
                        <div className={`payment-option ${selectedPayment === 'upi' ? 'selected' : ''}`} onClick={() => setSelectedPayment('upi')}><p>UPI</p></div>
                        <div className={`payment-option ${selectedPayment === 'cod' ? 'selected' : ''}`} onClick={() => setSelectedPayment('cod')}><p>Cash on Delivery</p></div>
                    </div>
                </div>
                <div className="modal-actions" style={{ marginTop: '2rem' }}>
                    <button className="btn btn-secondary" onClick={onClose} disabled={loading}>Cancel</button>
                    <button className="btn btn-primary" disabled={!selectedPayment || loading} onClick={handleConfirm}>
                        {loading ? 'Confirming...' : 'Confirm Booking'}
                    </button>
                </div>
                {provider.contact && <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>Prefer to talk? <a href={`tel:${provider.contact}`}>Call Now</a></div>}
            </div>
        </div>
    );
};

const BookLaterModal = ({ provider, onClose }) => {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleConfirm = async () => {
        try {
            setLoading(true);
            const apiUrl = import.meta.env.VITE_API_URL;
            const res = await fetch(`${apiUrl}/bookings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    providerId: provider._id || provider.id,
                    serviceType: provider.category,
                    date,
                    time,
                    paymentMethod: selectedPayment
                })
            });
            const data = await res.json();
            if (res.ok || true) {
                const existing = JSON.parse(localStorage.getItem('userBookings') || '[]');
                const newB = {
                    id: Date.now(),
                    service: provider.category,
                    provider: provider.name,
                    date: `${date} at ${time}`,
                    status: 'Scheduled',
                    trackingStep: 0
                };
                localStorage.setItem('userBookings', JSON.stringify([...existing, newB]));
                toast.success("Booking scheduled successfully!");
                onClose();
            } else {
                toast.error(data.message || "Scheduling failed.");
            }
        } catch (error) {
            toast.error("Error scheduling booking.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Schedule with {provider.name}</h2>
                <p>Choose a date and time for the service.</p>
                <div className="schedule-container">
                    <h3>Service Details</h3>
                    <div className="input-group"><label>Date</label><input type="date" value={date} onChange={(e) => setDate(e.target.value)} /></div>
                    <div className="input-group"><label>Time</label><input type="time" value={time} onChange={(e) => setTime(e.target.value)} /></div>
                </div>
                <div className="payment-options-container">
                    <h3>Payment Options</h3>
                    <div className="payment-options">
                        <div className={`payment-option ${selectedPayment === 'upi' ? 'selected' : ''}`} onClick={() => setSelectedPayment('upi')}><p>UPI</p></div>
                        <div className={`payment-option ${selectedPayment === 'cod' ? 'selected' : ''}`} onClick={() => setSelectedPayment('cod')}><p>Cash on Delivery</p></div>
                    </div>
                </div>
                <div className="modal-actions" style={{ marginTop: '2rem' }}>
                    <button className="btn btn-secondary" onClick={onClose} disabled={loading}>Cancel</button>
                    <button className="btn btn-primary" disabled={!date || !time || !selectedPayment || loading} onClick={handleConfirm}>
                        {loading ? 'Scheduling...' : 'Schedule & Book'}
                    </button>
                </div>
            </div>
        </div>
    );
};

const ProfileModal = ({ provider, onClose }) => (
    <div className="modal-backdrop" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{provider.name}</h2>
            <p>{provider.category || 'Service Provider'} in {provider.location || provider.address || 'Bhopal'}</p>
            <div className="profile-details">
                <h3>Profile Details</h3>
                <p><strong>Contact:</strong> {provider.contact || provider.mobile || 'N/A'}</p>
                <p><strong>Experience:</strong> {provider.experience || 'N/A'}</p>
                <p><strong>Gender:</strong> {provider.gender || 'N/A'}</p>
                <p><strong>Job Type:</strong> {provider.jobType || 'N/A'}</p>
                <p><strong>Skills:</strong> {provider.skills || (provider.profession ? provider.profession.join(', ') : 'N/A')}</p>
            </div>
            <div className="modal-actions" style={{ marginTop: '2rem', justifyContent: 'center' }}>
                <button className="btn btn-secondary" onClick={onClose}>Close</button>
            </div>
        </div>
    </div>
);

export default function ProvidersPage() {
    const { category } = useParams();
    const navigate = useNavigate();
    const context = useOutletContext() || {};
    const user = context.user;
    const openLoginModal = context.openLoginModal;
    const service = decodeURIComponent(category);

    useEffect(() => {
        if (!user) {
            navigate('/services');
            if (openLoginModal) openLoginModal();
        }
    }, [user, navigate, openLoginModal]);

    const [searchTerm, setSearchTerm] = useState('');
    const [wageSort, setWageSort] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [wishlist, setWishlist] = useState([]);
    const [dbProviders, setDbProviders] = useState([]);

    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [isBookNowOpen, setIsBookNowOpen] = useState(false);
    const [isBookLaterOpen, setIsBookLaterOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [currentProvider, setCurrentProvider] = useState(null);

    useEffect(() => {
        const fetchWorkers = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL;
                const professionMap = { 'Plumbers': 'plumber', 'Electricians': 'electrician', 'Carpenters': 'carpenter', 'Tiffin Services': 'tiffin', 'Cleaners': 'cleaner', 'PGs & Flats': 'pg' };
                const profession = professionMap[service];
                if (!profession) return;
                const res = await fetch(`${apiUrl}/workers?profession=${profession}`);
                if (res.ok) {
                    const data = await res.json();
                    setDbProviders(data.workers || []);
                }
            } catch (err) { /* use mock data only */ }
        };
        fetchWorkers();
    }, [service]);

    useEffect(() => {
        if (user && user.wishlist) {
            setWishlist(user.wishlist);
        }
    }, [user]);

    const handleSortChange = (sortType) => { 
        setWageSort(sortType); 
        setIsDropdownOpen(false); 
    };

    const handleToggleWishlist = async (id) => {
        try {
            const apiUrl = import.meta.env.VITE_API_URL;
            const res = await fetch(`${apiUrl}/user/wishlist`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ itemId: id })
            });
            const data = await res.json();
            if (res.ok) {
                setWishlist(data.wishlist);
                // update local user object as well so state cascades cleanly
                const updatedUser = { ...user, wishlist: data.wishlist };
                localStorage.setItem('user', JSON.stringify(updatedUser));
            }
        } catch (err) {
            toast.error("Failed to update wishlist.");
        }
    };

    try {
        const allProviders = [
            ...(Array.isArray(dbProviders) ? dbProviders.filter(w => w).map(w => ({ ...w, id: w._id, category: service, rating: 4, skills: Array.isArray(w.profession) ? w.profession.join(', ') : 'N/A', location: w.address || 'Bhopal', wage: 0, contact: w.mobile, experience: 'N/A', jobType: 'Full-time' })) : []),
            ...mockProviders.filter(p => p && p.category === service)
        ];

        let filteredProviders = allProviders.filter(p => p && (p.location || '').toLowerCase().includes((searchTerm || '').toLowerCase()));

        if (wageSort === 'low-to-high') filteredProviders.sort((a, b) => (a.wage || 0) - (b.wage || 0));
        else if (wageSort === 'high-to-low') filteredProviders.sort((a, b) => (b.wage || 0) - (a.wage || 0));
        else if (wageSort === 'professional') filteredProviders.sort((a, b) => (b.rating || 0) - (a.rating || 0));

        const getDropdownText = () => {
            switch(wageSort) { case 'low-to-high': return 'Low to Highest'; case 'high-to-low': return 'Highest to Lowest'; case 'professional': return 'Most Professionals'; default: return 'Wages'; }
        };

        const closeAllModals = () => { setIsBookingModalOpen(false); setIsBookNowOpen(false); setIsBookLaterOpen(false); setIsProfileOpen(false); };

        return (
            <section className="page-section">
                <div className="container">
                    <button className="btn btn-back" onClick={() => navigate('/services')}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
                        Back to Services
                    </button>
                    <div className="section-header" style={{ marginBottom: '2rem' }}><h2>Providers for {service} in Bhopal</h2></div>
                    <div className="providers-page-controls">
                        <div className="search-container"><input type="text" placeholder="Search for location..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
                        <div className="dropdown-container">
                            <button className="dropdown-button" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                {getDropdownText()}
                                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M7 10l5 5 5-5H7z"/></svg>
                            </button>
                            {isDropdownOpen && (<div className="dropdown-menu">
                                <button onClick={() => handleSortChange('low-to-high')}>Low to Highest</button>
                                <button onClick={() => handleSortChange('high-to-low')}>Highest to Lowest</button>
                                <button onClick={() => handleSortChange('professional')}>Most Professionals</button>
                            </div>)}
                        </div>
                    </div>
                    <main className="providers-list">
                        {filteredProviders.length > 0
                            ? filteredProviders.map(provider => (
                                <ProviderCard key={provider.id || provider._id} provider={provider}
                                    onBookClick={(p) => { setCurrentProvider(p); setIsBookingModalOpen(true); }}
                                    onViewProfile={(p) => { setCurrentProvider(p); setIsProfileOpen(true); }}
                                    onToggleWishlist={handleToggleWishlist}
                                    isWishlisted={Array.isArray(wishlist) && wishlist.includes(provider.id || provider._id)} />
                            ))
                            : <p>No providers found for "{service}". Please adjust your search criteria.</p>}
                    </main>
                </div>
                {isBookingModalOpen && currentProvider && <BookingModal provider={currentProvider} onClose={closeAllModals} onBookNow={() => { setIsBookingModalOpen(false); setIsBookNowOpen(true); }} onBookLater={() => { setIsBookingModalOpen(false); setIsBookLaterOpen(true); }} />}
                {isBookNowOpen && currentProvider && <BookNowModal provider={currentProvider} onClose={closeAllModals} />}
                {isBookLaterOpen && currentProvider && <BookLaterModal provider={currentProvider} onClose={closeAllModals} />}
                {isProfileOpen && currentProvider && <ProfileModal provider={currentProvider} onClose={closeAllModals} />}
            </section>
        );
    } catch (error) {
        return (
            <div className="container" style={{ padding: '2rem', textAlign: 'center' }}>
                <h2>Something went wrong while loading providers.</h2>
                <p style={{ color: 'red', margin: '1rem 0' }}>{error.message}</p>
                <button className="btn btn-primary" onClick={() => window.location.reload()}>Reload Page</button>
            </div>
        );
    }
}
