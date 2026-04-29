// SVG Icon components for the Local Link platform
import React from 'react';

export const PlumberIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="service-icon" viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="30" fill="#e0f2fe"/>
        {/* Person Head & Cap */}
        <circle cx="32" cy="22" r="8" fill="#0284c7"/>
        <path d="M24 18c0-2 4-4 8-4s8 2 8 4v2H24v-2z" fill="#0369a1"/>
        {/* Person Body */}
        <path d="M16 46c0-6 6-10 16-10s16 4 16 10v4H16v-4z" fill="#0ea5e9"/>
        {/* Plumber Wrench */}
        <path d="M40 32l4-4 4 4-4 4m-4-4l-10 10" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round"/>
    </svg>
);

export const ElectricianIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="service-icon" viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="30" fill="#fef3c7"/>
        {/* Safety Helmet & Head */}
        <circle cx="32" cy="24" r="7" fill="#d97706"/>
        <path d="M22 20c2-3 6-4 10-4s8 1 10 4l2 2H20l2-2z" fill="#f59e0b"/>
        {/* Body & Electric Jacket */}
        <path d="M18 48c0-5 5-8 14-8s14 3 14 8v2H18v-2z" fill="#b45309"/>
        <path d="M26 40v10m12-10v10" stroke="#fef3c7" strokeWidth="2"/>
        {/* Lightning bolt */}
        <path d="M32 28l-4 6h6l-4 8" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const CarpenterIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="service-icon" viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="30" fill="#ffedd5"/>
        {/* Cap & Face */}
        <circle cx="32" cy="24" r="7" fill="#ea580c"/>
        <path d="M24 18l8-2 8 2v3H24v-3z" fill="#c2410c"/>
        {/* Worker Overall Body */}
        <path d="M16 48c0-6 6-9 16-9s16 3 16 9v2H16v-2z" fill="#ea580c"/>
        {/* Hands holding saw */}
        <path d="M40 36l8 8-4 4-8-8" stroke="#9a3412" strokeWidth="3" strokeLinecap="round"/>
    </svg>
);

export const TiffinIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="service-icon" viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="30" fill="#ffe4e6"/>
        {/* Chef Hat & Head */}
        <circle cx="32" cy="26" r="6" fill="#e11d48"/>
        <path d="M26 22c0-4 3-6 6-6s6 2 6 6v2H26v-2z" fill="#be123c"/>
        {/* Apron Body */}
        <path d="M18 48c0-6 5-8 14-8s14 2 14 8v2H18v-2z" fill="#e11d48"/>
        {/* Serving Tray */}
        <path d="M20 38h24" stroke="#fda4af" strokeWidth="3" strokeLinecap="round"/>
    </svg>
);

export const PGsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="service-icon" viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="30" fill="#f0fdf4"/>
        {/* Person greeting at house */}
        <path d="M16 44l16-14 16 14V52H16V44z" fill="#15803d"/>
        <circle cx="32" cy="22" r="6" fill="#16a34a"/>
        <path d="M24 38c0-4 4-6 8-6s8 2 8 6v2H24v-2z" fill="#16a34a"/>
    </svg>
);

export const CleanerIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="service-icon" viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="30" fill="#ede9fe"/>
        {/* Cleaner with uniform */}
        <circle cx="32" cy="22" r="7" fill="#6d28d9"/>
        <path d="M16 48c0-6 6-9 16-9s16 3 16 9v2H16v-2z" fill="#7c3aed"/>
        {/* Mop/Broom */}
        <path d="M40 24L20 44" stroke="#a78bfa" strokeWidth="4" strokeLinecap="round"/>
        <path d="M18 42h6v4h-6z" fill="#a78bfa"/>
    </svg>
);

export const StarIcon = ({ filled }) => ( <svg className="star-icon" fill={filled ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg> );

export const HeartIcon = ({ filled }) => ( <svg xmlns="http://www.w3.org/2000/svg" fill={filled ? "red" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg> );

// Map service names to their icons
export const serviceIconMap = {
    'Plumbers': <PlumberIcon />,
    'Electricians': <ElectricianIcon />,
    'Carpenters': <CarpenterIcon />,
    'Tiffin Services': <TiffinIcon />,
    'PGs & Flats': <PGsIcon />,
    'Cleaners': <CleanerIcon />,
};
