/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ServicePage from './components/ServicePage';
import Home from './pages/Home';
import Services from './pages/Services';
import CustomShelving from './pages/CustomShelving';
import GarageDoorRepair from './pages/GarageDoorRepair';
import AutoOpenerInstall from './pages/AutoOpenerInstall';
import Process from './pages/Process';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import ReserveConfirmation from './pages/ReserveConfirmation';
import PaymentSuccess from './pages/PaymentSuccess';
import Admin from './pages/Admin';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          {/* Existing dedicated service pages (kept as aliases) */}
          <Route path="services/custom-shelving" element={<CustomShelving />} />
          <Route path="services/garage-door-repair" element={<GarageDoorRepair />} />
          <Route path="services/auto-opener-install" element={<AutoOpenerInstall />} />
          {/* Dynamic service entity pages */}
          <Route path="services/:slug" element={<ServicePage />} />
          <Route path="process" element={<Process />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="reserve-confirmation" element={<ReserveConfirmation />} />
          <Route path="payment-success" element={<PaymentSuccess />} />
          <Route path="admin" element={<Admin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

