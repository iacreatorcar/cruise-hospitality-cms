import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Clock, Users, Calendar } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { ChatBot } from '@/components/ChatBot';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Excursions = () => {
  const [excursions, setExcursions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState({
    guest_name: '',
    guest_email: '',
    date: '',
    num_guests: 1,
  });
  const [selectedExcursion, setSelectedExcursion] = useState(null);

  useEffect(() => {
    const fetchExcursions = async () => {
      try {
        const response = await axios.get(`${API}/excursions`);
        setExcursions(response.data);
      } catch (error) {
        console.error('Error fetching excursions:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchExcursions();
  }, []);

  const handleBooking = async (excursionId) => {
    try {
      await axios.post(`${API}/bookings`, {
        ...bookingData,
        excursion_id: excursionId,
      });
      toast.success('Prenotazione confermata!', {
        description: 'Riceverai una email di conferma a breve.'
      });
      setBookingData({ guest_name: '', guest_email: '', date: '', num_guests: 1 });
    } catch (error) {
      toast.error('Errore nella prenotazione', {
        description: 'Riprova più tardi.'
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center" data-testid="loading-excursions">
        <div className="text-gold text-xl">Caricamento...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 pb-32" data-testid="excursions-page">
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="font-heading text-5xl md:text-6xl text-white mb-4" data-testid="page-title">
            Escursioni
          </h1>
          <p className="text-lg text-slate-400">
            Avventure indimenticabili ti aspettano
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" data-testid="excursions-grid">
          {excursions.map((excursion, index) => (
            <motion.div
              key={excursion.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-3xl overflow-hidden hover:border-gold/50 transition-all duration-500"
              data-testid={`excursion-card-${excursion.id}`}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={excursion.image_url}
                  alt={excursion.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-gold text-slate-950 px-4 py-2 rounded-full font-medium">
                  €{excursion.price}
                </div>
              </div>
              
              <div className="p-8">
                <h2 className="font-heading text-3xl text-white mb-4">
                  {excursion.name}
                </h2>
                
                <p className="text-slate-400 mb-6 leading-relaxed">
                  {excursion.description}
                </p>
                
                <div className="flex items-center gap-6 mb-6 text-sm text-slate-400">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{excursion.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{excursion.available_dates.length} date disponibili</span>
                  </div>
                </div>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => setSelectedExcursion(excursion)}
                      className="w-full bg-gold text-slate-950 hover:bg-gold-light"
                      data-testid={`book-button-${excursion.id}`}
                    >
                      Prenota Ora
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-slate-900 border-white/10" data-testid="booking-dialog">
                    <DialogHeader>
                      <DialogTitle className="font-heading text-2xl text-white">
                        Prenota {selectedExcursion?.name}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div>
                        <label className="text-sm text-slate-400 mb-2 block">Nome</label>
                        <Input
                          value={bookingData.guest_name}
                          onChange={(e) => setBookingData({ ...bookingData, guest_name: e.target.value })}
                          className="bg-white/5 border-white/10 text-white"
                          data-testid="booking-name-input"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-slate-400 mb-2 block">Email</label>
                        <Input
                          type="email"
                          value={bookingData.guest_email}
                          onChange={(e) => setBookingData({ ...bookingData, guest_email: e.target.value })}
                          className="bg-white/5 border-white/10 text-white"
                          data-testid="booking-email-input"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-slate-400 mb-2 block">Data</label>
                        <select
                          value={bookingData.date}
                          onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 text-white rounded-xl h-12 px-4"
                          data-testid="booking-date-select"
                        >
                          <option value="">Seleziona una data</option>
                          {selectedExcursion?.available_dates.map((date) => (
                            <option key={date} value={date}>{date}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-sm text-slate-400 mb-2 block">Numero ospiti</label>
                        <Input
                          type="number"
                          min="1"
                          value={bookingData.num_guests}
                          onChange={(e) => setBookingData({ ...bookingData, num_guests: parseInt(e.target.value) })}
                          className="bg-white/5 border-white/10 text-white"
                          data-testid="booking-guests-input"
                        />
                      </div>
                      <Button
                        onClick={() => handleBooking(selectedExcursion?.id)}
                        className="w-full bg-gold text-slate-950 hover:bg-gold-light"
                        data-testid="confirm-booking-button"
                      >
                        Conferma Prenotazione
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
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

export default Excursions;
