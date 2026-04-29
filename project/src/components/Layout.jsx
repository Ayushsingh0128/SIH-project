import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.jpg';
import { services } from '../data/mockData';
import AuthModal from './AuthModal';
import './Home.css';

const Navbar = ({ onLoginClick, onSignupClick, user, onLogout }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [scrollOffset, setScrollOffset] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollOffset(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const stripWidth = Math.max(10, 100 - scrollOffset / 8);

    const isActive = (path) => location.pathname === path;

    const handleNavClick = (path) => {
        navigate(path);
        setMobileMenuOpen(false);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        
        const matchedService = services.find(s => 
            s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
            s.description.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (matchedService) {
            navigate(`/services/${encodeURIComponent(matchedService.name)}`);
        } else {
            navigate('/services');
        }
        setSearchQuery('');
    };

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
                        <div className="navbar-brand" onClick={() => handleNavClick('/')}>
                            <img src={logo} alt="Local Link Logo" className="brand-icon" />
                            <span className="brand-name">Local Link</span>
                        </div>
                    </div>
                    <div className="navbar-center">
                        <form className="navbar-search-bar" onSubmit={handleSearch}>
                             <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            <input 
                                type="text" 
                                placeholder="What service do you need today?" 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button type="submit" className="btn btn-search">Search</button>
                        </form>
                    </div>
                    <div className="navbar-right">
                        {/* Hamburger button for mobile */}
                        <button className="hamburger-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
                            {mobileMenuOpen ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
                            )}
                        </button>

                        <div className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
                            <a className={`nav-link ${isActive('/') ? 'active' : ''}`} onClick={() => handleNavClick('/')}>Home</a>
                            <a className={`nav-link ${isActive('/services') ? 'active' : ''}`} onClick={() => handleNavClick('/services')}>Services</a>
                            <a className={`nav-link ${isActive('/about') ? 'active' : ''}`} onClick={() => handleNavClick('/about')}>About Us</a>
                            <a href="#contact-section" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Contact</a>
                        </div>
                        {user ? (
                            <div className="user-profile-nav">
                                {user && (user.role === 'worker' || user.profession) && (
                                    <button className="btn btn-primary" onClick={() => navigate('/dashboard')} style={{ marginRight: '1rem', padding: '0.4rem 0.8rem', fontSize: '0.85rem', backgroundColor: '#2a9d8f', border: 'none' }}>
                                        Worker Portal
                                    </button>
                                )}
                                <span className="welcome-text" onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}>
                                    Hi, {((user && user.name) || 'User').split(' ')[0]}
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
                    <ul>{services.slice(0, 5).map(s => <li key={s.name}><Link to={`/services/${encodeURIComponent(s.name)}`}>{s.name}</Link></li>)}</ul>
                </div>
                <div className="footer-col">
                    <h3>Company</h3>
                    <ul><li><Link to="/about">About Us</Link></li><li><a href="#">Careers</a></li><li><a href="#">Press</a></li></ul>
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


export default function Layout() {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [authModalView, setAuthModalView] = useState('login');
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

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
        localStorage.clear();
        setUser(null);
    };

    return (
        <div className="app-wrapper">
            <Navbar
                onLoginClick={openLoginModal}
                onSignupClick={openSignupModal}
                user={user}
                onLogout={handleLogout}
            />
            <main>
                <Outlet context={{ user, openLoginModal, openSignupModal }} />
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
