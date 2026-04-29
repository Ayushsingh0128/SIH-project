import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./components/LandingPage";
import ServicesPage from "./components/ServicesPage";
import ProvidersPage from "./components/ProvidersPage";
import AboutPage from "./components/AboutPage";
import DashboardWrapper from "./components/DashboardWrapper";
import WorkerRegistration from "./components/WorkerRegistration";
import PGRegistration from "./components/PGRegistration";
import Chatbot from "./components/Chatbot";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <Routes>
        {/* Routes inside the shared Layout (Navbar + Footer) */}
        <Route element={<Layout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:category" element={<ProvidersPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Route>

        {/* Standalone routes (no shared layout) */}
        <Route path="/dashboard" element={<DashboardWrapper />} />
        <Route path="/worker-register" element={<WorkerRegistration />} />
        <Route path="/pg-register" element={<PGRegistration />} />
      </Routes>
      <Chatbot />
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
}

export default App;