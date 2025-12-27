import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Utensils, Ship, Music, HelpCircle, Wifi, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/restaurants', icon: Utensils, label: 'Ristoranti' },
  { path: '/excursions', icon: Ship, label: 'Escursioni' },
  { path: '/entertainment', icon: Music, label: 'Intrattenimento' },
  { path: '/services', icon: HelpCircle, label: 'Servizi' },
  { path: '/packages', icon: Wifi, label: 'Internet' },
];

export const Navigation = () => {
  const location = useLocation();

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40"
      data-testid="bottom-navigation"
    >
      <div className="glass px-4 py-3 rounded-full flex items-center gap-2 shadow-2xl">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className="relative group"
              data-testid={`nav-link-${item.label.toLowerCase()}`}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`p-3 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'bg-gold text-slate-950'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="h-5 w-5" />
              </motion.div>
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gold rounded-full"
                />
              )}
            </Link>
          );
        })}
        <Link
          to="/kiosk"
          data-testid="kiosk-mode-link"
          className="ml-2 pl-2 border-l border-white/10"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 rounded-full text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-300"
          >
            <Monitor className="h-5 w-5" />
          </motion.div>
        </Link>
      </div>
    </motion.nav>
  );
};
