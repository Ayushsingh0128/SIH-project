import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { services } from '../data/mockData';
import { serviceIconMap } from '../data/icons';
import './Dashboard.css';

const TrackingModal = ({ booking, step, onClose }) => {
    const steps = [
        "Booking Confirmed",
        "Provider En Route",
        "Arrived at Destination",
        "Work in Progress"
    ];

    // Calculate simulated distances and arrival estimates based on step
    const arrivalTimes = ["8 mins", "3 mins", "Arrived", "Active"];
    const distances = ["2.4 km", "0.8 km", "0 km", "0 km"];
    
    return (
        <div className="modal-backdrop" onClick={onClose} style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.7)',
            backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 1100
        }}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{
                background: 'white',
                borderRadius: '20px',
                width: '95%',
                maxWidth: '500px',
                overflow: 'hidden',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}>
                {/* Simulated Map View */}
                <div style={{ 
                    height: '250px', 
                    background: '#e2e8f0', 
                    position: 'relative',
                    overflow: 'hidden' 
                }}>
                    {/* SVG Map Simulation */}
                    <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
                        <defs>
                            <linearGradient id="roadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#94a3b8" />
                                <stop offset="100%" stopColor="#64748b" />
                            </linearGradient>
                        </defs>
                        {/* Background grid lines */}
                        <path d="M 0,50 L 500,50 M 0,100 L 500,100 M 0,150 L 500,150 M 0,200 L 500,200" stroke="#cbd5e1" strokeWidth="1" opacity="0.3"/>
                        <path d="M 100,0 L 100,250 M 200,0 L 200,250 M 300,0 L 300,250 M 400,0 L 400,250" stroke="#cbd5e1" strokeWidth="1" opacity="0.3"/>
                        
                        {/* The Road Path */}
                        <path d="M 50,180 Q 200,200 250,100 T 400,60" fill="none" stroke="#cbd5e1" strokeWidth="12" strokeLinecap="round"/>
                        <path d="M 50,180 Q 200,200 250,100 T 400,60" fill="none" stroke="#64748b" strokeWidth="8" strokeLinecap="round"/>
                        <path d="M 50,180 Q 200,200 250,100 T 400,60" fill="none" stroke="#f8fafc" strokeWidth="2" strokeDasharray="6 6" strokeLinecap="round"/>

                        {/* Destination Marker (User House) */}
                        <circle cx="400" cy="60" r="14" fill="#ef4444" opacity="0.2" />
                        <circle cx="400" cy="60" r="6" fill="#ef4444" />

                        {/* Provider Marker Moving along the curve */}
                        {step < 2 ? (
                            <g style={{
                                transform: step === 0 
                                    ? 'translate(80px, 180px)' 
                                    : 'translate(230px, 130px)',
                                transition: 'transform 4s cubic-bezier(0.4, 0, 0.2, 1)'
                            }}>
                                <circle cx="0" cy="0" r="16" fill="var(--cyan-600)" opacity="0.3"/>
                                <circle cx="0" cy="0" r="8" fill="var(--cyan-600)"/>
                                {/* Arrow showing direction */}
                                <polygon points="-4,-4 4,0 -4,4" fill="white" transform="rotate(-45)"/>
                            </g>
                        ) : (
                            <g transform="translate(400, 60)">
                                <circle cx="0" cy="0" r="18" fill="#22c55e" opacity="0.4"/>
                                <circle cx="0" cy="0" r="8" fill="#22c55e"/>
                            </g>
                        )}
                    </svg>

                    {/* Overlay ETA Badge */}
                    <div style={{
                        position: 'absolute',
                        top: '1rem',
                        left: '1rem',
                        background: 'white',
                        padding: '0.5rem 1rem',
                        borderRadius: '30px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        fontWeight: '700',
                        fontSize: '0.85rem',
                        color: '#1e293b',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: step < 2 ? '#f59e0b' : '#22c55e', display: 'inline-block' }}></span>
                        ETA: {arrivalTimes[step]}
                    </div>
                </div>

                {/* Detail Panel */}
                <div style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <div>
                            <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#1e293b' }}>{booking.provider}</h3>
                            <p style={{ margin: '0.25rem 0 0', color: 'var(--gray-500)', fontSize: '0.85rem' }}>{booking.service} Professional</p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <span style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--cyan-600)', display: 'block' }}>{distances[step]}</span>
                            <span style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>distance left</span>
                        </div>
                    </div>

                    {/* Progress step tags */}
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                        {steps.map((s, idx) => (
                            <div key={idx} style={{
                                flex: 1,
                                height: '4px',
                                borderRadius: '2px',
                                background: idx <= step ? 'var(--cyan-600)' : '#e2e8f0',
                                transition: 'background 0.5s ease'
                            }}/>
                        ))}
                    </div>

                    <div style={{ 
                        background: 'var(--cyan-50)', 
                        padding: '1rem', 
                        borderRadius: '12px', 
                        border: '1px solid var(--cyan-500)',
                        marginBottom: '1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem'
                    }}>
                        <div style={{ fontSize: '1.5rem' }}>
                            {step === 0 && "🛵"}
                            {step === 1 && "⏳"}
                            {step === 2 && "🏡"}
                            {step === 3 && "🛠️"}
                        </div>
                        <div>
                            <h4 style={{ margin: 0, color: 'var(--cyan-600)', fontSize: '0.95rem' }}>{steps[step]}</h4>
                            <p style={{ margin: '0.25rem 0 0', fontSize: '0.8rem', color: 'var(--gray-600)' }}>
                                {step === 0 && "The expert is prepping gear for transit."}
                                {step === 1 && "Travelling to your pinned Bhopal address."}
                                {step === 2 && "Expert arrived! Awaiting front gate clearance."}
                                {step === 3 && "Solving the required updates effectively."}
                            </p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <button className="btn btn-secondary-outline" style={{ flex: 1, padding: '0.75rem' }} onClick={onClose}>Close</button>
                        <a href={`tel:98260XXXXX`} className="btn btn-primary" style={{ flex: 1, padding: '0.75rem', display: 'flex', justifyContent: 'center', alignItems: 'center', textDecoration: 'none', color: 'white' }}>📞 Call Expert</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [wishlist, setWishlist] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [trackingBooking, setTrackingBooking] = useState(null);
    const [trackingStep, setTrackingStep] = useState(0);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        preferredLocation: ''
    });

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            navigate('/');
            return;
        }
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        setEditData({
            name: parsed.name || '',
            email: parsed.email || '',
            phone: parsed.phone || '98260XXXXX',
            address: parsed.address || 'Arera Colony, Bhopal',
            preferredLocation: parsed.preferredLocation || 'Arera Colony'
        });
        
        const storedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        setWishlist(storedWishlist);

        const storedBookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
        setBookings(storedBookings);
    }, [navigate]);

    useEffect(() => {
        if (!trackingBooking) return;
        const timer = setInterval(() => {
            setTrackingStep(prev => {
                if (prev >= 3) { clearInterval(timer); return 3; }
                return prev + 1;
            });
        }, 4000);
        return () => clearInterval(timer);
    }, [trackingBooking]);

    if (!user) return null;

    const handleSave = () => {
        const updated = { ...user, ...editData };
        setUser(updated);
        localStorage.setItem('user', JSON.stringify(updated));
        setIsEditing(false);
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div className="container">
                    <div className="header-content">
                        <div className="user-welcome">
                            <h1>Welcome back, <span className="highlight">{user.name.split(' ')[0]}!</span></h1>
                            <p>Here's what's happening with your account today.</p>
                        </div>
                        <button className="btn btn-primary" onClick={() => navigate('/')}>Find New Services</button>
                    </div>
                </div>
            </header>

            <main className="container dashboard-main">
                <div className="dashboard-grid">
                    {/* Profile Card */}
                    <div className="dashboard-card profile-card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
                            <div style={{
                                width: '70px', 
                                height: '70px', 
                                borderRadius: '50%', 
                                background: 'var(--auth-background-gradient)', 
                                color: 'white', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                fontSize: '1.75rem', 
                                fontWeight: 'bold'
                            }}>
                                {editData.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h3 style={{ margin: 0, padding: 0, border: 'none' }}>{editData.name}</h3>
                                <p style={{ color: 'var(--gray-600)', margin: '0.25rem 0 0' }}>Verified Citizen</p>
                            </div>
                        </div>

                        {isEditing ? (
                            <div className="profile-info">
                                <div className="info-item">
                                    <label>Full Name</label>
                                    <input 
                                        type="text" 
                                        value={editData.name} 
                                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                        style={{ width: '100%', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--gray-300)' }}
                                    />
                                </div>
                                <div className="info-item">
                                    <label>Phone Number</label>
                                    <input 
                                        type="text" 
                                        value={editData.phone} 
                                        onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                                        style={{ width: '100%', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--gray-300)' }}
                                    />
                                </div>
                                <div className="info-item">
                                    <label>Primary Address</label>
                                    <input 
                                        type="text" 
                                        value={editData.address} 
                                        onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                                        style={{ width: '100%', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--gray-300)' }}
                                    />
                                </div>
                                <button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={handleSave}>Save Profile</button>
                            </div>
                        ) : (
                            <div className="profile-info">
                                <div className="info-item">
                                    <label>Email Address</label>
                                    <p>{user.email}</p>
                                </div>
                                <div className="info-item">
                                    <label>Phone Number</label>
                                    <p>{editData.phone}</p>
                                </div>
                                <div className="info-item">
                                    <label>Primary Address</label>
                                    <p>{editData.address}</p>
                                </div>
                                <div className="info-item">
                                    <label>Member Since</label>
                                    <p>{new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</p>
                                </div>
                                <button className="btn btn-secondary-outline" onClick={() => setIsEditing(true)}>Edit Profile Details</button>
                            </div>
                        )}
                    </div>

                    {/* Stats / Quick Links */}
                    <div className="dashboard-card stats-card">
                        <h3>Account Overview</h3>
                        <div className="stats-grid">
                            <div className="stat-item">
                                <span className="stat-value">{bookings.filter(b => b.status === 'Active').length}</span>
                                <span className="stat-label">Active Bookings</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-value">{wishlist.length}</span>
                                <span className="stat-label">Saved Providers</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-value">{bookings.filter(b => b.status === 'Completed').length}</span>
                                <span className="stat-label">Past Requests</span>
                            </div>
                        </div>
                    </div>

                    {/* Activity Section (Stronger Bookings history) */}
                    <div className="dashboard-card activity-card">
                        <h3>Recent Bookings</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {bookings.length === 0 ? (
                                <p style={{ color: 'var(--gray-500)', textAlign: 'center', margin: '1rem 0' }}>No bookings found. Head to the Services tab to get started!</p>
                            ) : (
                                bookings.map((booking) => (
                                    <div key={booking.id} style={{ 
                                        background: '#f8fafc', 
                                        padding: '1rem', 
                                        borderRadius: '0.75rem', 
                                        border: '1px solid #edf2f7', 
                                        display: 'flex', 
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <div>
                                            <span style={{ fontWeight: 'bold', color: '#1e293b' }}>{booking.provider}</span>
                                            <p style={{ margin: '0.25rem 0', fontSize: '0.85rem', color: 'var(--gray-600)' }}>{booking.service} • {booking.date}</p>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            {booking.status === 'Active' && (
                                                <button 
                                                    className="btn btn-primary" 
                                                    style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                                                    onClick={() => {
                                                        setTrackingBooking(booking);
                                                        setTrackingStep(booking.trackingStep || 0);
                                                    }}
                                                >
                                                    📍 Track Service
                                                </button>
                                            )}
                                            <span style={{ 
                                                padding: '0.25rem 0.75rem', 
                                                borderRadius: '1rem', 
                                                fontSize: '0.75rem', 
                                                fontWeight: 'bold', 
                                                backgroundColor: booking.status === 'Active' ? '#ccfbf1' : booking.status === 'Scheduled' ? '#fef3c7' : '#f1f5f9',
                                                color: booking.status === 'Active' ? '#14b8a6' : booking.status === 'Scheduled' ? '#d97706' : '#64748b'
                                            }}>{booking.status}</span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Suggested Services */}
                    <div className="dashboard-card services-suggested" style={{ gridColumn: 'span 2' }}>
                        <h3>Quick Access Services</h3>
                        <div className="suggested-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))' }}>
                            {services.map(service => (
                                <div key={service.name} className="suggested-item" onClick={() => navigate(`/services/${encodeURIComponent(service.name)}`)}>
                                    <div className="icon-wrapper">
                                        {serviceIconMap[service.name]}
                                    </div>
                                    <span>{service.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
            {trackingBooking && (
                <TrackingModal 
                    booking={trackingBooking} 
                    step={trackingStep} 
                    onClose={() => setTrackingBooking(null)} 
                />
            )}
        </div>
    );
};

export default Dashboard;
