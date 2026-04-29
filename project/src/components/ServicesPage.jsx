import React, { useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { services } from '../data/mockData';
import { serviceIconMap } from '../data/icons';

export default function ServicesPage() {
    const navigate = useNavigate();
    const { user, openLoginModal } = useOutletContext();

    const handleServiceClick = (serviceName) => {
        if (!user) {
            openLoginModal();
        } else {
            navigate(`/services/${encodeURIComponent(serviceName)}`);
        }
    };

    return (
        <section className="page-section">
            <div className="container">
                <div className="section-header">
                    <h2>Our Services</h2>
                    <p>One platform for all your local needs. Select a service to find verified and trusted professionals in your area.</p>
                </div>
                <div className="services-grid">
                    {services.map((service) => (
                        <div key={service.name} className="service-card" onClick={() => handleServiceClick(service.name)}>
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
}
