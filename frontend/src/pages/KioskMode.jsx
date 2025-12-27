import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Utensils, Ship, Music, HelpCircle, Wifi, Home, Hand } from 'lucide-react';
import { motion } from 'framer-motion';

const kioskLinks = [
  { title: 'Home', icon: Home, path: '/', color: 'from-slate-600 to-slate-700' },
  { title: 'Ristoranti', icon: Utensils, path: '/restaurants', color: 'from-amber-600 to-orange-600' },
  { title: 'Escursioni', icon: Ship, path: '/excursions', color: 'from-blue-600 to-cyan-600' },
  { title: 'Intrattenimento', icon: Music, path: '/entertainment', color: 'from-purple-600 to-pink-600' },
  { title: 'Servizi', icon: HelpCircle, path: '/services', color: 'from-green-600 to-emerald-600' },
  { title: 'Internet', icon: Wifi, path: '/packages', color: 'from-indigo-600 to-blue-600' },
];

const KioskMode = () => {
  const [isIdle, setIsIdle] = useState(true);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-8" data-testid="kiosk-mode-page">
      {isIdle ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
          data-testid="kiosk-idle-screen"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mb-8"
          >
            <Hand className="h-32 w-32 text-gold mx-auto" />
          </motion.div>
          <h1 className="font-heading text-6xl text-white mb-6">
            Benvenuto
          </h1>
          <p className="text-2xl text-slate-400 mb-12">
            Tocca lo schermo per iniziare
          </p>
          <button
            onClick={() => setIsIdle(false)}
            className="px-12 py-6 bg-gold text-slate-950 rounded-full text-2xl font-medium hover:bg-gold-light transition-all duration-300 shadow-2xl glow-gold"
            data-testid="kiosk-start-button"
          >
            Inizia
          </button>
        </motion.div>
      ) : (
        <div className="w-full max-w-7xl" data-testid="kiosk-menu">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="font-heading text-6xl text-white mb-4">
              Come possiamo aiutarti?
            </h1>
            <p className="text-2xl text-slate-400">
              Seleziona un servizio
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {kioskLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <Link key={link.path} to={link.path} data-testid={`kiosk-link-${link.title.toLowerCase()}`}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -10 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative overflow-hidden rounded-3xl p-12 aspect-square flex flex-col items-center justify-center text-center cursor-pointer bg-gradient-to-br ${link.color} shadow-2xl`}
                  >
                    <Icon className="h-24 w-24 text-white mb-6" />
                    <h2 className="font-heading text-3xl text-white font-medium">
                      {link.title}
                    </h2>
                  </motion.div>
                </Link>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-12"
          >
            <button
              onClick={() => setIsIdle(true)}
              className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full text-xl hover:bg-white/10 transition-colors duration-300"
              data-testid="kiosk-back-button"
            >
              Torna all'inizio
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default KioskMode;
