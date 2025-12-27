import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LayoutDashboard, Utensils, Ship, Music, Wifi, Users } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { ChatBot } from '@/components/ChatBot';
import { motion } from 'framer-motion';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    restaurants: 0,
    excursions: 0,
    entertainment: 0,
    packages: 0,
    bookings: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [restaurants, excursions, entertainment, packages, bookings] = await Promise.all([
          axios.get(`${API}/restaurants`),
          axios.get(`${API}/excursions`),
          axios.get(`${API}/entertainment`),
          axios.get(`${API}/packages`),
          axios.get(`${API}/bookings`),
        ]);

        setStats({
          restaurants: restaurants.data.length,
          excursions: excursions.data.length,
          entertainment: entertainment.data.length,
          packages: packages.data.length,
          bookings: bookings.data.length,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { label: 'Ristoranti', value: stats.restaurants, icon: Utensils, color: 'from-amber-500 to-orange-500' },
    { label: 'Escursioni', value: stats.excursions, icon: Ship, color: 'from-blue-500 to-cyan-500' },
    { label: 'Eventi', value: stats.entertainment, icon: Music, color: 'from-purple-500 to-pink-500' },
    { label: 'Pacchetti', value: stats.packages, icon: Wifi, color: 'from-green-500 to-emerald-500' },
    { label: 'Prenotazioni', value: stats.bookings, icon: Users, color: 'from-indigo-500 to-blue-500' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center" data-testid="loading-admin">
        <div className="text-gold text-xl">Caricamento dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 pb-32" data-testid="admin-dashboard">
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <LayoutDashboard className="h-12 w-12 text-gold" />
            <h1 className="font-heading text-5xl md:text-6xl text-white" data-testid="page-title">
              Dashboard Admin
            </h1>
          </div>
          <p className="text-lg text-slate-400">
            Panoramica del sistema CMS
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12" data-testid="stats-grid">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-3xl p-8 relative overflow-hidden"
                data-testid={`stat-card-${stat.label.toLowerCase()}`}
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-10 rounded-full -mr-8 -mt-8`} />
                <div className="relative">
                  <Icon className="h-10 w-10 text-gold mb-4" />
                  <div className="text-5xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-slate-400 text-lg">{stat.label}</div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass rounded-3xl p-8"
          data-testid="admin-info"
        >
          <h2 className="font-heading text-3xl text-white mb-6">Funzionalità CMS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-xl text-gold font-medium">Gestione Contenuti</h3>
              <ul className="text-slate-400 space-y-2">
                <li>• Ristoranti e menu dinamici</li>
                <li>• Escursioni con sistema prenotazioni</li>
                <li>• Eventi e spettacoli</li>
                <li>• Servizi ospiti</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl text-gold font-medium">Funzionalità Avanzate</h3>
              <ul className="text-slate-400 space-y-2">
                <li>• Chatbot AI assistente</li>
                <li>• Generazione QR code per menu</li>
                <li>• Pacchetti internet</li>
                <li>• Modalità kiosk touch</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>

      <Navigation />
      <ChatBot />
    </div>
  );
};

export default AdminDashboard;
