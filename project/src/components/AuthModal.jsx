import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthModal = ({ initialView, onClose, onAuthSuccess }) => {
    const navigate = useNavigate();
    const [formView, setFormView] = useState(initialView);
    const [loginType, setLoginType] = useState('user');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        username: '', // some routes use 'username' or 'name'
        mobile: '',
        dob: '',
        gender: 'male'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const showForm = (view) => {
        setFormView(view);
        setError('');
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const apiUrl = import.meta.env.VITE_API_URL;
            const res = await fetch(`${apiUrl}/user/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                    role: loginType
                })
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.clear();
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify({ ...data.user, role: data.role }));
                onAuthSuccess({ ...data.user, role: data.role });
                onClose();
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('Server error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const apiUrl = import.meta.env.VITE_API_URL;
            // The backend uses /user-register for users
            const endpoint = loginType === 'user' ? '/user/user-register' : '/user/worker-register';
            
            const res = await fetch(`${apiUrl}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    mobile: formData.mobile,
                    dob: formData.dob,
                    gender: formData.gender
                })
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.clear();
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify({ ...data.user, role: data.role }));
                onAuthSuccess({ ...data.user, role: data.role });
                onClose();
            } else {
                setError(data.message || 'Signup failed');
            }
        } catch (err) {
            setError('Server error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-modal-backdrop" onClick={onClose}>
            <div className="auth-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="auth-close-btn" onClick={onClose} aria-label="Close">&times;</button>
                {formView === 'login' && (
                    <div className="form-container">
                        <form onSubmit={handleLogin}>
                            <div className="login-type-selector">
                                <button type="button" className={`login-type-tab ${loginType === 'user' ? 'active' : ''}`} onClick={() => setLoginType('user')}>User</button>
                                <button type="button" className={`login-type-tab ${loginType === 'recruiter' ? 'active' : ''}`} onClick={() => setLoginType('recruiter')}>Worker</button>
                            </div>
                            <h2>{loginType === 'user' ? "Welcome Back!" : "Worker Portal"}</h2>
                            <p>{loginType === 'user' ? "Glad to see you again. Please log in." : "Access the worker dashboard."}</p>
                            
                            {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}

                            <div className="input-group">
                                <label htmlFor="login-email">Email</label>
                                <input 
                                    type="email" 
                                    id="login-email" 
                                    name="email" 
                                    placeholder="Enter your email" 
                                    value={formData.email}
                                    onChange={handleChange}
                                    required 
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="login-password">Password</label>
                                <input 
                                    type="password" 
                                    id="login-password" 
                                    name="password" 
                                    placeholder="Enter your password" 
                                    value={formData.password}
                                    onChange={handleChange}
                                    required 
                                />
                            </div>
                            <button type="submit" className="auth-btn" disabled={loading}>
                                {loading ? "Logging in..." : "Secure Login"}
                            </button>
                            <div className="form-links">
                                <a href="#" onClick={(e) => { e.preventDefault(); showForm('reset'); }}>Forgot Password?</a>
                                <span>|</span>
                                <a href="#" onClick={(e) => { e.preventDefault(); showForm('signup'); }}>Create a New Account</a>
                            </div>
                        </form>
                    </div>
                )}
                {formView === 'signup' && (
                    <div className="form-container">
                        <form onSubmit={handleSignup}>
                            <h2>Join Us!</h2>
                            <p>Create your account to get started.</p>

                            {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}

                            <div className="input-group">
                                <label htmlFor="signup-name">Full Name</label>
                                <input 
                                    type="text" 
                                    id="signup-name" 
                                    name="name" 
                                    placeholder="Enter your name" 
                                    value={formData.name}
                                    onChange={handleChange}
                                    required 
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="signup-email">Email</label>
                                <input 
                                    type="email" 
                                    id="signup-email" 
                                    name="email" 
                                    placeholder="Enter your email" 
                                    value={formData.email}
                                    onChange={handleChange}
                                    required 
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="signup-password">Password</label>
                                <input 
                                    type="password" 
                                    id="signup-password" 
                                    name="password" 
                                    placeholder="Create a password" 
                                    value={formData.password}
                                    onChange={handleChange}
                                    required 
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="signup-mobile">Mobile Number</label>
                                <input 
                                    type="tel" 
                                    id="signup-mobile" 
                                    name="mobile" 
                                    placeholder="10-digit mobile number" 
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    pattern="[0-9]{10}"
                                    required 
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="signup-dob">Date of Birth</label>
                                <input 
                                    type="date" 
                                    id="signup-dob" 
                                    name="dob" 
                                    value={formData.dob}
                                    onChange={handleChange}
                                    required 
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="signup-gender">Gender</label>
                                <select 
                                    id="signup-gender" 
                                    name="gender" 
                                    value={formData.gender}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                            <button type="submit" className="auth-btn" disabled={loading}>
                                {loading ? "Signing up..." : "Sign Up"}
                            </button>
                            <div className="form-links">
                                <p>Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); showForm('login'); }}>Log In</a></p>
                                <p style={{ marginTop: '0.5rem', borderTop: '1px solid var(--gray-200)', paddingTop: '0.5rem', width: '100%', textAlign: 'center', fontSize: '0.85rem' }}>
                                    Are you a Professional? <a href="/worker-register" onClick={(e) => { e.preventDefault(); navigate('/worker-register'); onClose(); }}>Join as a Worker</a>
                                </p>
                            </div>
                        </form>
                    </div>
                )}
                {formView === 'reset' && (
                    <div className="form-container">
                        <form action="/password-reset" method="post">
                            <h2>Forgot Password?</h2>
                            <p>Enter your email to receive a reset link.</p>
                            <div className="input-group">
                                <label htmlFor="reset-email">Email Address</label>
                                <input type="email" id="reset-email" name="email" placeholder="Enter your email" required />
                            </div>
                            <button type="submit" className="auth-btn">Send Reset Link</button>
                            <div className="form-links">
                                <p>Remember your password? <a href="#" onClick={(e) => { e.preventDefault(); showForm('login'); }}>Log In</a></p>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AuthModal;
