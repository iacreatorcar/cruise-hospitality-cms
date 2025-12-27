import React from 'react';
import { Link } from 'react-router-dom';
import { Utensils, Ship, Music, HelpCircle, Wifi, ChevronRight } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { ChatBot } from '@/components/ChatBot';
import { motion } from 'framer-motion';

const quickLinks = [
  {
    title: 'Ristoranti & Bar',
    description: 'Scopri i nostri 4 ristoranti gourmet',
    icon: Utensils,
    path: '/restaurants',
    gradient: 'from-amber-500/20 to-orange-500/20',
  },
  {
    title: 'Escursioni',
    description: 'Avventure indimenticabili',
    icon: Ship,
    path: '/excursions',
    gradient: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    title: 'Intrattenimento',
    description: 'Spettacoli e musica dal vivo',
    icon: Music,
    path: '/entertainment',
    gradient: 'from-purple-500/20 to-pink-500/20',
  },
  {
    title: 'Servizi',
    description: 'Assistenza e informazioni',
    icon: HelpCircle,
    path: '/services',
    gradient: 'from-green-500/20 to-emerald-500/20',
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900" data-testid="home-page">
      <div
        className="relative h-[60vh] bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1761514745080-7cab3a9ad041)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/50 to-slate-950" />
        <div className="relative h-full flex flex-col items-center justify-center px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-heading text-6xl md:text-7xl lg:text-8xl font-medium text-white mb-6 tracking-tight"
            data-testid="hero-title"
          >
            Benvenuto a Bordo
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-300 max-w-2xl leading-relaxed"
            data-testid="hero-subtitle"
          >
            La tua esperienza di lusso inizia qui. Esplora ristoranti gourmet, escursioni esclusive e
            intrattenimento di classe mondiale.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="font-heading text-4xl md:text-5xl text-white mb-4" data-testid="services-title">
            I Nostri Servizi
          </h2>
          <p className="text-lg text-slate-400">Tutto ciò di cui hai bisogno per una crociera perfetta</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20" data-testid="quick-links-grid">
          {quickLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <Link key={link.path} to={link.path} data-testid={`quick-link-${link.title.toLowerCase().replace(/\s+/g, '-')}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="group relative overflow-hidden rounded-3xl p-8 glass hover:border-gold/50 transition-all duration-500"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${link.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  <div className="relative flex items-start justify-between">
                    <div className="flex-1">
                      <div className="mb-4">
                        <div className="inline-flex p-3 rounded-2xl bg-white/5 group-hover:bg-gold/20 transition-colors duration-300">
                          <Icon className="h-8 w-8 text-gold" />
                        </div>
                      </div>
                      <h3 className="font-heading text-2xl md:text-3xl text-white mb-2">
                        {link.title}
                      </h3>
                      <p className="text-slate-400 text-lg">{link.description}</p>
                    </div>
                    <ChevronRight className="h-6 w-6 text-gold opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2 transition-all duration-300" />
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="glass rounded-3xl p-8 md:p-12 text-center"
          data-testid="internet-packages-promo"
        >
          <Wifi className="h-16 w-16 text-gold mx-auto mb-6" />
          <h3 className="font-heading text-3xl md:text-4xl text-white mb-4">
            Rimani Connesso
          </h3>
          <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
            Scegli tra i nostri pacchetti internet Premium e Pro per rimanere in contatto con il mondo
          </p>
          <Link to="/packages">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gold text-slate-950 rounded-full font-medium text-lg hover:bg-gold-light transition-colors duration-300 shadow-xl glow-gold"
              data-testid="view-packages-button"
            >
              Visualizza Pacchetti
            </motion.button>
          </Link>
        </motion.div>
      </div>

      <Navigation />
      <ChatBot />
    </div>
  );
};

export default Home;
