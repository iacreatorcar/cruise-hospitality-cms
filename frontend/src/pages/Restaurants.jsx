import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Clock, MapPin, ChevronRight, QrCode } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { ChatBot } from '@/components/ChatBot';
import { motion } from 'framer-motion';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get(`${API}/restaurants`);
        setRestaurants(response.data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center" data-testid="loading-restaurants">
        <div className="text-gold text-xl">Caricamento...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 pb-32" data-testid="restaurants-page">
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="font-heading text-5xl md:text-6xl text-white mb-4" data-testid="page-title">
            Ristoranti & Bar
          </h1>
          <p className="text-lg text-slate-400">
            Esperienze culinarie di classe mondiale
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" data-testid="restaurants-grid">
          {restaurants.map((restaurant, index) => (
            <motion.div
              key={restaurant.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
              data-testid={`restaurant-card-${restaurant.id}`}
            >
              <div className="relative overflow-hidden rounded-3xl glass hover:border-gold/50 transition-all duration-500">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={restaurant.image_url}
                    alt={restaurant.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
                </div>
                
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="font-heading text-3xl text-white mb-2">
                        {restaurant.name}
                      </h2>
                      <p className="text-gold font-medium">{restaurant.type}</p>
                    </div>
                  </div>
                  
                  <p className="text-slate-400 mb-6 leading-relaxed">
                    {restaurant.description}
                  </p>
                  
                  <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
                    <Clock className="h-4 w-4" />
                    <span>{restaurant.hours}</span>
                  </div>
                  
                  <div className="flex gap-3">
                    <Link to={`/menu/${restaurant.id}`} className="flex-1">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full px-6 py-3 bg-gold text-slate-950 rounded-full font-medium hover:bg-gold-light transition-colors duration-300 flex items-center justify-center gap-2"
                        data-testid={`view-menu-button-${restaurant.id}`}
                      >
                        Vedi Menu
                        <ChevronRight className="h-5 w-5" />
                      </motion.button>
                    </Link>
                    <Link to={`/menu/${restaurant.id}?qr=true`}>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-full hover:bg-white/10 transition-colors duration-300"
                        data-testid={`qr-button-${restaurant.id}`}
                      >
                        <QrCode className="h-5 w-5" />
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Navigation />
      <ChatBot />
    </div>
  );
};

export default Restaurants;
