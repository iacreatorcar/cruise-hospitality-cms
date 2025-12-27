import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, QrCode as QrCodeIcon, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { ChatBot } from '@/components/ChatBot';
import { motion } from 'framer-motion';
import QRCode from 'react-qr-code';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const MenuPage = () => {
  const { restaurantId } = useParams();
  const [searchParams] = useSearchParams();
  const showQR = searchParams.get('qr') === 'true';
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qrData, setQrData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [restaurantRes, qrRes] = await Promise.all([
          axios.get(`${API}/restaurants/${restaurantId}`),
          axios.get(`${API}/qrcode/${restaurantId}`)
        ]);
        setRestaurant(restaurantRes.data);
        setQrData(qrRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [restaurantId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center" data-testid="loading-menu">
        <div className="text-gold text-xl">Caricamento menu...</div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center" data-testid="menu-not-found">
        <div className="text-white text-xl">Ristorante non trovato</div>
      </div>
    );
  }

  const categorizedMenu = restaurant.menu.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  if (showQR && qrData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 pb-32" data-testid="qr-code-page">
        <div className="container mx-auto px-6 py-12">
          <Link to="/restaurants">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="mb-8 flex items-center gap-2 text-gold hover:text-gold-light transition-colors"
              data-testid="back-button"
            >
              <ArrowLeft className="h-5 w-5" />
              Torna ai Ristoranti
            </motion.button>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h1 className="font-heading text-4xl md:text-5xl text-white mb-4" data-testid="qr-title">
              Scansiona il QR Code
            </h1>
            <p className="text-lg text-slate-400 mb-12">
              Accedi al menu di {restaurant.name} dal tuo smartphone
            </p>

            <div className="glass rounded-3xl p-12">
              <div className="bg-white p-8 rounded-2xl inline-block mb-8" data-testid="qr-code-container">
                <QRCode value={qrData.url} size={256} />
              </div>
              <p className="text-slate-400 text-sm mb-6">oppure visita:</p>
              <p className="text-gold font-mono text-sm break-all" data-testid="qr-url">{qrData.url}</p>
            </div>
          </motion.div>
        </div>
        <Navigation />
        <ChatBot />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen pb-32"
      style={{
        background: `linear-gradient(to bottom, rgba(2, 6, 23, 0.95), rgba(2, 6, 23, 0.98)), url(${restaurant.image_url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
      data-testid="menu-page"
    >
      <div className="container mx-auto px-6 py-12">
        <Link to="/restaurants">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="mb-8 flex items-center gap-2 text-gold hover:text-gold-light transition-colors"
            data-testid="back-to-restaurants"
          >
            <ArrowLeft className="h-5 w-5" />
            Torna ai Ristoranti
          </motion.button>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="font-heading text-5xl md:text-6xl text-white mb-4" data-testid="restaurant-name">
            {restaurant.name}
          </h1>
          <p className="text-xl text-gold mb-2">{restaurant.type}</p>
          <p className="text-lg text-slate-400">{restaurant.description}</p>
        </motion.div>

        <div className="space-y-12" data-testid="menu-categories">
          {Object.entries(categorizedMenu).map(([category, items], catIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: catIndex * 0.1 }}
              className="glass rounded-3xl p-8"
              data-testid={`category-${category.toLowerCase()}`}
            >
              <h2 className="font-heading text-3xl text-white mb-8 border-b border-white/10 pb-4">
                {category}
              </h2>
              <div className="space-y-6">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-start gap-4 pb-6 border-b border-white/5 last:border-0"
                    data-testid={`menu-item-${item.id}`}
                  >
                    <div className="flex-1">
                      <h3 className="text-xl text-white font-medium mb-2">{item.name}</h3>
                      <p className="text-slate-400 leading-relaxed mb-2">{item.description}</p>
                      {item.allergens && item.allergens.length > 0 && (
                        <p className="text-xs text-slate-500">Allergeni: {item.allergens.join(', ')}</p>
                      )}
                    </div>
                    <div className="text-gold font-medium text-xl whitespace-nowrap">
                      €{item.price.toFixed(2)}
                    </div>
                  </div>
                ))}
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

export default MenuPage;
