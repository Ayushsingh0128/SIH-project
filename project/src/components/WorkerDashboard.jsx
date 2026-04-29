import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Dashboard.css';

const WorkerDashboard = () => {
    const navigate = useNavigate();
    const [worker, setWorker] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [availability, setAvailability] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        profession: '',
        address: '',
        rate: 0
    });

    useEffect(() => {
        if (worker) {
            setFormData({
                name: worker.name || '',
                profession: Array.isArray(worker.profession) ? worker.profession.join(', ') : worker.profession || '',
                address: worker.address || '',
                rate: worker.rate || 0
            });
        }
    }, [worker]);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            navigate('/');
            return;
        }
        const parsed = JSON.parse(storedUser);
        setWorker(parsed);
        setAvailability(parsed.availability !== false);

        const fetchBookings = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL;
                const res = await fetch(`${apiUrl}/bookings/worker`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (res.ok) {
                    const data = await res.json();
                    setBookings(data.bookings || []);
                }
            } catch (error) {
                toast.error("Failed to load jobs.");
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [navigate]);

    const handleStatusUpdate = async (bookingId, newStatus) => {
        try {
            const apiUrl = import.meta.env.VITE_API_URL;
            const res = await fetch(`${apiUrl}/bookings/${bookingId}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (res.ok) {
                toast.success(`Job marked as ${newStatus}`);
                setBookings(bookings.map(b => b._id === bookingId ? { ...b, status: newStatus } : b));
            } else {
                toast.error("Failed to update job status.");
            }
        } catch (error) {
            toast.error("Error updating status.");
        }
    };

    const toggleAvailability = async () => {
        try {
            const updatedAvailability = !availability;
            const apiUrl = import.meta.env.VITE_API_URL;
            const res = await fetch(`${apiUrl}/workers/profile`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ availability: updatedAvailability })
            });

            if (res.ok) {
                setAvailability(updatedAvailability);
                const updatedWorker = { ...worker, availability: updatedAvailability };
                setWorker(updatedWorker);
                localStorage.setItem('user', JSON.stringify(updatedWorker));
                toast.info(`Availability set to ${updatedAvailability ? 'Online' : 'Offline'}`);
            } else {
                toast.error("Failed to sync availability with server.");
            }
        } catch (error) {
            toast.error("Failed to update availability.");
        }
    };

    const handleProfileSave = async (e) => {
        e.preventDefault();
        try {
            const apiUrl = import.meta.env.VITE_API_URL;
            const res = await fetch(`${apiUrl}/workers/profile`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    name: formData.name,
                    profession: formData.profession.split(',').map(p => p.trim()),
                    address: formData.address,
                    rate: Number(formData.rate)
                })
            });

            if (res.ok) {
                const data = await res.json();
                setWorker(data.user);
                localStorage.setItem('user', JSON.stringify({ ...data.user, role: 'worker' }));
                setEditMode(false);
                toast.success("Profile updated successfully!");
            } else {
                toast.error("Failed to save profile updates.");
            }
        } catch (error) {
            toast.error("Error saving profile.");
        }
    };

    if (!worker) return null;

    return (
        <div className="dashboard-container">
            <header className="dashboard-header" style={{ background: 'var(--auth-background-gradient)' }}>
                <div className="container">
                    <div className="header-content">
                        <div className="user-welcome">
                            <button 
                                onClick={() => navigate('/')} 
                                style={{ 
                                    background: 'rgba(255,255,255,0.2)', 
                                    color: 'white', 
                                    border: 'none', 
                                    padding: '0.4rem 0.8rem', 
                                    borderRadius: '6px', 
                                    fontSize: '0.85rem', 
                                    marginBottom: '1rem', 
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.4rem'
                                }}
                            >
                                🏠 Back to Home
                            </button>
                            <h1>Welcome back, <span style={{ color: 'var(--yellow-400)' }}>{worker.name.split(' ')[0]}!</span></h1>
                            <p>Manage your appointments and availability.</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span style={{ color: 'white', fontWeight: '600' }}>Availability:</span>
                            <button 
                                onClick={toggleAvailability}
                                className={`btn ${availability ? 'btn-primary' : 'btn-secondary'}`}
                                style={{ 
                                    backgroundColor: availability ? 'var(--cyan-500)' : 'var(--cyan-600)',
                                    color: 'white',
                                    border: 'none',
                                    fontWeight: 'bold'
                                }}
                            >
                                {availability ? '● Online (Accepting)' : '○ Offline'}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container dashboard-main">
                <div className="dashboard-grid" style={{ gridTemplateColumns: '1fr' }}>
                    {/* Profile Overview */}
                    <div className="dashboard-card profile-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #f1f5f9', paddingBottom: '0.75rem', marginBottom: '1.5rem' }}>
                            <h3 style={{ borderBottom: 'none', margin: 0, paddingBottom: 0 }}>Professional Details</h3>
                            <button 
                                className="btn" 
                                onClick={() => setEditMode(!editMode)}
                                style={{ 
                                    backgroundColor: editMode ? 'var(--cyan-600)' : 'var(--auth-secondary-color)', 
                                    color: 'white', 
                                    border: 'none',
                                    padding: '0.5rem 1rem',
                                    fontSize: '0.85rem'
                                }}
                            >
                                {editMode ? 'Cancel' : 'Edit Profile'}
                            </button>
                        </div>

                        {editMode ? (
                            <form onSubmit={handleProfileSave} style={{ display: 'grid', gap: '1rem' }}>
                                <div className="input-group">
                                    <label style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 'bold' }}>Full Name</label>
                                    <input 
                                        type="text" 
                                        value={formData.name} 
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        required 
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--gray-200)' }}
                                    />
                                </div>
                                <div className="input-group">
                                    <label style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 'bold' }}>Professions (comma separated)</label>
                                    <input 
                                        type="text" 
                                        value={formData.profession} 
                                        onChange={(e) => setFormData({...formData, profession: e.target.value})}
                                        placeholder="e.g. plumber, electrician"
                                        required 
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--gray-200)' }}
                                    />
                                </div>
                                <div className="input-group">
                                    <label style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 'bold' }}>Service Location (Address)</label>
                                    <input 
                                        type="text" 
                                        value={formData.address} 
                                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                                        required 
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--gray-200)' }}
                                    />
                                </div>
                                <div className="input-group">
                                    <label style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 'bold' }}>Hourly Charge (in ₹)</label>
                                    <input 
                                        type="number" 
                                        value={formData.rate} 
                                        onChange={(e) => setFormData({...formData, rate: e.target.value})}
                                        required 
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--gray-200)' }}
                                    />
                                </div>
                                <button 

                                    type="submit" 
                                    className="btn" 
                                    style={{ backgroundColor: 'var(--auth-secondary-color)', color: 'white', border: 'none', padding: '0.75rem', width: '100%', marginTop: '1rem' }}
                                >
                                    Save Changes
                                </button>
                            </form>
                        ) : (
                            <div className="profile-info" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                                <div className="info-item">
                                    <label>Profession</label>
                                    <p>{Array.isArray(worker.profession) ? worker.profession.join(', ') : worker.profession || 'N/A'}</p>
                                </div>
                                <div className="info-item">
                                    <label>Registered Mobile</label>
                                    <p>{worker.mobile}</p>
                                </div>
                                <div className="info-item">
                                    <label>Service Location</label>
                                    <p>{worker.address || 'Bhopal'}</p>
                                </div>
                                <div className="info-item">
                                    <label>Hourly Charge</label>
                                    <p>₹{worker.rate || 0}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Jobs Section */}
                    <div className="dashboard-card activity-card">
                        <h3>Assigned Job Inquiries</h3>
                        {loading ? (
                            <p style={{ textAlign: 'center', padding: '2rem' }}>Loading jobs...</p>
                        ) : bookings.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--gray-500)' }}>
                                <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛠️</p>
                                <p>No bookings assigned yet. Ensure your status is set to "Online" to receive requests.</p>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                {bookings.map((job) => (
                                    <div key={job._id} style={{ 
                                        background: 'white', 
                                        padding: '1.5rem', 
                                        borderRadius: '12px', 
                                        border: '1px solid var(--gray-200)',
                                        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        flexWrap: 'wrap',
                                        gap: '1rem'
                                    }}>
                                        <div>
                                            <span style={{ 
                                                padding: '0.25rem 0.75rem', 
                                                borderRadius: '1rem', 
                                                fontSize: '0.75rem', 
                                                fontWeight: 'bold', 
                                                backgroundColor: job.status === 'completed' ? '#ccfbf1' : job.status === 'cancelled' ? '#fee2e2' : '#fef3c7',
                                                color: job.status === 'completed' ? '#14b8a6' : job.status === 'cancelled' ? '#ef4444' : '#d97706',
                                                marginBottom: '0.5rem',
                                                display: 'inline-block'
                                            }}>
                                                {job.status.toUpperCase()}
                                            </span>
                                            <h4 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--gray-900)' }}>
                                                Client: {job.user?.name || 'Standard User'}
                                            </h4>
                                            <p style={{ margin: '0.5rem 0', fontSize: '0.9rem', color: 'var(--gray-600)' }}>
                                                📅 <strong>Date:</strong> {new Date(job.date).toLocaleDateString('en-IN')} | 🕒 <strong>Time:</strong> {job.time || 'Anytime'}
                                            </p>
                                            <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: 'var(--gray-600)' }}>
                                                📍 <strong>Address:</strong> {job.user?.address || 'Not specified'}
                                            </p>
                                            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--gray-600)' }}>
                                                💳 <strong>Payment:</strong> {job.paymentMethod ? job.paymentMethod.toUpperCase() : 'N/A'}
                                            </p>
                                        </div>
                                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                            {job.status === 'confirmed' && (
                                                <button 
                                                    className="btn btn-primary" 
                                                    style={{ backgroundColor: 'var(--auth-secondary-color)', border: 'none', color: 'white' }}
                                                    onClick={() => handleStatusUpdate(job._id, 'completed')}
                                                >
                                                    ✓ Mark Complete
                                                </button>
                                            )}
                                            {job.status === 'pending' && (
                                                <>
                                                    <button 
                                                        className="btn btn-primary" 
                                                        style={{ backgroundColor: 'var(--auth-secondary-color)', border: 'none', color: 'white' }}
                                                        onClick={() => handleStatusUpdate(job._id, 'confirmed')}
                                                    >
                                                        Accept Job
                                                    </button>
                                                    <button 
                                                        className="btn btn-secondary" 
                                                        style={{ backgroundColor: 'var(--cyan-600)', border: 'none', color: 'white' }}
                                                        onClick={() => handleStatusUpdate(job._id, 'cancelled')}
                                                    >
                                                        Decline
                                                    </button>
                                                </>
                                            )}
                                            {job.user?.mobile && (
                                                <a 
                                                    href={`tel:${job.user.mobile}`} 
                                                    className="btn btn-secondary-outline" 
                                                    style={{ padding: '0.75rem' }}
                                                >
                                                    📞 Call
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default WorkerDashboard;
