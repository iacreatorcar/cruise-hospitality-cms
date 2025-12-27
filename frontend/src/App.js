import React, { useEffect } from 'react';
import '@/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Home from '@/pages/Home';
import Restaurants from '@/pages/Restaurants';
import MenuPage from '@/pages/MenuPage';
import Excursions from '@/pages/Excursions';
import Entertainment from '@/pages/Entertainment';
import Services from '@/pages/Services';
import InternetPackages from '@/pages/InternetPackages';
import KioskMode from '@/pages/KioskMode';
import AdminDashboard from '@/pages/AdminDashboard';
import { Toaster } from '@/components/ui/sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function App() {
  useEffect(() => {
    const initData = async () => {
      try {
        await axios.post(`${API}/init-data`);
      } catch (e) {
        console.log('Init data:', e.message);
      }
    };
    initData();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/menu/:restaurantId" element={<MenuPage />} />
          <Route path="/excursions" element={<Excursions />} />
          <Route path="/entertainment" element={<Entertainment />} />
          <Route path="/services" element={<Services />} />
          <Route path="/packages" element={<InternetPackages />} />
          <Route path="/kiosk" element={<KioskMode />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
