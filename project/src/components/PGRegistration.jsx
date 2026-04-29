import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Registration.css';

const PGRegistration = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        pgOwnerName: '',
        pgOwnerEmail: '',
        pgOwnerMobile: '',
        pgAddress: '',
        pgCity: 'Bhopal',
        pgState: 'Madhya Pradesh',
        pgPincode: '',
        pgCountry: 'India',
        pgDescription: '',
        pgRooms_1bhk: 0,
        pgRooms_2bhk: 0,
        pgRooms_3bhk: 0,
        pgPrice_1bhk: 0,
        pgPrice_2bhk: 0,
        pgPrice_3bhk: 0,
        pgFacilities: '',
        pgRules: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            pgOwnerName: formData.pgOwnerName,
            pgOwnerEmail: formData.pgOwnerEmail,
            pgOwnerMobile: formData.pgOwnerMobile,
            pgAddress: formData.pgAddress,
            pgCity: formData.pgCity,
            pgState: formData.pgState,
            pgPincode: formData.pgPincode,
            pgCountry: formData.pgCountry,
            pgDescription: formData.pgDescription,
            pgRooms: {
                '1bhk': Number(formData.pgRooms_1bhk),
                '2bhk': Number(formData.pgRooms_2bhk),
                '3bhk': Number(formData.pgRooms_3bhk)
            },
            pgPrice: {
                '1bhk': Number(formData.pgPrice_1bhk),
                '2bhk': Number(formData.pgPrice_2bhk),
                '3bhk': Number(formData.pgPrice_3bhk)
            },
            pgFacilities: formData.pgFacilities.split(',').map(f => f.trim()),
            pgRules: formData.pgRules.split(',').map(r => r.trim()),
            pgImages: ["https://via.placeholder.com/400x300"], // placeholder
            availability: true,
            reviews: 5
        };

        try {
            const apiUrl = import.meta.env.VITE_API_URL;
            const res = await fetch(`${apiUrl}/user/pg-register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("PG listed successfully!");
                navigate('/dashboard');
            } else {
                toast.error(data.message || "Registration failed");
            }
        } catch (err) {
            toast.error("Server error. Please try again.");
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
                        <h1>List Your <span className="highlight-alt">PG or Flat</span></h1>
                        <p>Help newcomers find their perfect home in Bhopal.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="registration-form">
                        <div className="form-row">
                            <div className="form-group">
                                <label>Owner Name</label>
                                <input type="text" name="pgOwnerName" required onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Owner Email</label>
                                <input type="email" name="pgOwnerEmail" required onChange={handleChange} />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Owner Mobile</label>
                                <input type="tel" name="pgOwnerMobile" required pattern="[0-9]{10}" onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Pincode</label>
                                <input type="text" name="pgPincode" required onChange={handleChange} />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Full Address</label>
                            <textarea name="pgAddress" required onChange={handleChange}></textarea>
                        </div>

                        <div className="form-row" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                            <div className="form-group">
                                <label>1BHK Units</label>
                                <input type="number" name="pgRooms_1bhk" min="0" onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>2BHK Units</label>
                                <input type="number" name="pgRooms_2bhk" min="0" onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>3BHK Units</label>
                                <input type="number" name="pgRooms_3bhk" min="0" onChange={handleChange} />
                            </div>
                        </div>

                        <div className="form-row" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                            <div className="form-group">
                                <label>1BHK Price</label>
                                <input type="number" name="pgPrice_1bhk" min="0" onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>2BHK Price</label>
                                <input type="number" name="pgPrice_2bhk" min="0" onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>3BHK Price</label>
                                <input type="number" name="pgPrice_3bhk" min="0" onChange={handleChange} />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Facilities (comma separated)</label>
                            <input type="text" name="pgFacilities" placeholder="WiFi, AC, Food, Laundry" onChange={handleChange} />
                        </div>

                        <div className="form-group">
                            <label>Description</label>
                            <textarea name="pgDescription" required onChange={handleChange}></textarea>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block" style={{ background: 'var(--auth-secondary-color)' }} disabled={loading}>
                            {loading ? "Listing PG..." : "List Property Now"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PGRegistration;
