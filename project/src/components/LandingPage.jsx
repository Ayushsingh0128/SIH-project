import { useNavigate, useOutletContext } from 'react-router-dom';
import heroVideo from '../assets/video.mp4';
import { services } from '../data/mockData';
import { serviceIconMap } from '../data/icons';

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

export default function LandingPage() {
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
                            <div key={service.name} className="service-card" onClick={() => handleServiceClick(service.name)}>
                                <div className="service-card-content"> {serviceIconMap[service.name]} <h3>{service.name}</h3> <p>{service.description}</p> </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
