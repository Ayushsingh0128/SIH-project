import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Registration.css';

const WorkerRegistration = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        password: '',
        address: '',
        dob: '',
        gender: 'male',
        profession: 'plumber'
    });
    const [loading, setLoading] = useState(false);

    const professions = [
        "plumber", "carpenter", "electrician", "cleaner", 
        "sweeper", "laundry", "tiffin", "pg"
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const apiUrl = import.meta.env.VITE_API_URL;
            const res = await fetch(`${apiUrl}/user/worker-register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    profession: [formData.profession] // Backend expects an array
                })
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Registration successful! Welcome to Local Link.");
                localStorage.clear();
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify({ ...data.user, role: 'worker' }));
                navigate('/dashboard');
            } else {
                toast.error(data.message || "Registration failed");
            }
        } catch (err) {
            toast.error("Server error. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="registration-page">
            <div className="container">
                <button className="btn btn-back" onClick={() => navigate('/')} style={{ marginBottom: '1.5rem' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
                    Back to Home
                </button>
                <div className="registration-card">
                    <div className="registration-header">
                        <h1>Join as a <span className="highlight">Professional</span></h1>
                        <p>Grow your business and reach thousands of customers in Bhopal.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="registration-form">
                        <div className="form-row">
                            <div className="form-group">
                                <label>Full Name</label>
                                <input type="text" name="name" placeholder="John Doe" required onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input type="email" name="email" placeholder="john@example.com" required onChange={handleChange} />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Mobile Number</label>
                                <input type="tel" name="mobile" placeholder="10-digit number" required pattern="[0-9]{10}" onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" name="password" placeholder="Min 8 characters" required minLength="8" onChange={handleChange} />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Full Address</label>
                            <textarea name="address" placeholder="Enter your business/home address" required onChange={handleChange}></textarea>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Date of Birth</label>
                                <input type="date" name="dob" required onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Gender</label>
                                <select name="gender" onChange={handleChange}>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Primary Profession</label>
                            <select name="profession" onChange={handleChange}>
                                {professions.map(p => (
                                    <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>
                                ))}
                            </select>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                            {loading ? "Registering..." : "Complete Registration"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default WorkerRegistration;
