import React, { useState } from 'react';
import { X, Send, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { useLanguage } from '@/i18n/LanguageContext';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const FeedbackSurvey = () => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    rating: 0,
    usability: 0,
    design: 0,
    features: [],
    improvements: '',
    would_recommend: null,
    email: '',
    role: ''
  });

  const texts = {
    it: {
      title: 'Feedback App',
      subtitle: 'Aiutaci a migliorare',
      question1: 'Valutazione generale',
      question2: 'Facilità d\'uso',
      question3: 'Design e interfaccia',
      question4: 'Funzionalità più utili',
      features: {
        restaurants: 'Menu Ristoranti',
        qr: 'QR Code',
        booking: 'Prenotazioni',
        chat: 'Chat AI',
        multilang: 'Multilingua'
      },
      question5: 'Cosa miglioreresti?',
      question6: 'Consiglieresti l\'app?',
      yes: 'Sì',
      no: 'No',
      maybe: 'Forse',
      email: 'Email (opzionale)',
      role: 'Il tuo ruolo',
      roles: {
        guest: 'Ospite',
        staff: 'Staff',
        manager: 'Manager',
        other: 'Altro'
      },
      submit: 'Invia Feedback',
      thankyou: 'Grazie per il feedback!',
      thankyouMsg: 'Il tuo feedback ci aiuterà a migliorare.',
      close: 'Chiudi',
      openSurvey: '💬 Feedback'
    },
    en: {
      title: 'App Feedback',
      subtitle: 'Help us improve',
      question1: 'Overall rating',
      question2: 'Ease of use',
      question3: 'Design & interface',
      question4: 'Most useful features',
      features: {
        restaurants: 'Restaurant Menus',
        qr: 'QR Code',
        booking: 'Bookings',
        chat: 'AI Chat',
        multilang: 'Multi-language'
      },
      question5: 'What would you improve?',
      question6: 'Would you recommend?',
      yes: 'Yes',
      no: 'No',
      maybe: 'Maybe',
      email: 'Email (optional)',
      role: 'Your role',
      roles: {
        guest: 'Guest',
        staff: 'Staff',
        manager: 'Manager',
        other: 'Other'
      },
      submit: 'Send Feedback',
      thankyou: 'Thank you for your feedback!',
      thankyouMsg: 'Your feedback will help us improve.',
      close: 'Close',
      openSurvey: '💬 Feedback'
    }
  };

  const t = texts[language];

  const handleStarClick = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const toggleFeature = (feature) => {
    const features = formData.features.includes(feature)
      ? formData.features.filter(f => f !== feature)
      : [...formData.features, feature];
    setFormData({ ...formData, features });
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`${API}/feedback`, formData);
      setSubmitted(true);
      toast.success(t.thankyou);
      setTimeout(() => {
        setIsOpen(false);
        setSubmitted(false);
        setFormData({
          rating: 0,
          usability: 0,
          design: 0,
          features: [],
          improvements: '',
          would_recommend: null,
          email: '',
          role: ''
        });
      }, 3000);
    } catch (error) {
      toast.error('Error sending feedback');
    }
  };

  const StarRating = ({ value, onChange, label }) => (
    <div className="mb-6">
      <label className="text-sm text-slate-400 mb-2 block">{label}</label>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => onChange(star)}
            className="transition-transform hover:scale-110"
            type="button"
          >
            <Star
              className={`h-8 w-8 ${
                star <= value
                  ? 'fill-gold text-gold'
                  : 'text-slate-600 hover:text-gold-light'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );

  if (!isOpen) {
    return (
      <motion.button
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 z-40 px-4 py-3 bg-gold hover:bg-gold-light text-slate-950 rounded-full font-medium shadow-xl glow-gold transition-all"
        data-testid="open-survey-button"
      >
        {t.openSurvey}
      </motion.button>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-24 right-6 w-96 max-h-[600px] glass rounded-3xl shadow-2xl flex flex-col z-40"
        data-testid="survey-modal"
      >
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <h3 className="font-heading text-xl text-white">{t.title}</h3>
            <p className="text-sm text-slate-400">{t.subtitle}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="hover:bg-white/5"
            data-testid="close-survey"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {!submitted ? (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <StarRating
              label={t.question1}
              value={formData.rating}
              onChange={(val) => handleStarClick('rating', val)}
            />

            <StarRating
              label={t.question2}
              value={formData.usability}
              onChange={(val) => handleStarClick('usability', val)}
            />

            <StarRating
              label={t.question3}
              value={formData.design}
              onChange={(val) => handleStarClick('design', val)}
            />

            <div className="mb-6">
              <label className="text-sm text-slate-400 mb-2 block">{t.question4}</label>
              <div className="space-y-2">
                {Object.entries(t.features).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => toggleFeature(key)}
                    className={`w-full px-4 py-2 rounded-xl text-sm transition-all ${
                      formData.features.includes(key)
                        ? 'bg-gold text-slate-950'
                        : 'bg-white/5 text-white hover:bg-white/10'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="text-sm text-slate-400 mb-2 block">{t.question5}</label>
              <textarea
                value={formData.improvements}
                onChange={(e) => setFormData({ ...formData, improvements: e.target.value })}
                className="w-full bg-white/5 border border-white/10 text-white rounded-xl p-3 h-24 resize-none"
                placeholder="..."
              />
            </div>

            <div className="mb-6">
              <label className="text-sm text-slate-400 mb-2 block">{t.question6}</label>
              <div className="flex gap-2">
                {[
                  { value: 'yes', label: t.yes },
                  { value: 'no', label: t.no },
                  { value: 'maybe', label: t.maybe }
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, would_recommend: option.value })}
                    className={`flex-1 px-4 py-2 rounded-xl text-sm transition-all ${
                      formData.would_recommend === option.value
                        ? 'bg-gold text-slate-950'
                        : 'bg-white/5 text-white hover:bg-white/10'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="text-sm text-slate-400 mb-2 block">{t.email}</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-white/5 border-white/10 text-white"
                placeholder="your@email.com"
              />
            </div>

            <div className="mb-6">
              <label className="text-sm text-slate-400 mb-2 block">{t.role}</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full bg-white/5 border border-white/10 text-white rounded-xl p-3"
              >
                <option value="">...</option>
                {Object.entries(t.roles).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
            <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center mb-6">
              <Send className="h-10 w-10 text-gold" />
            </div>
            <h3 className="font-heading text-2xl text-white mb-2">{t.thankyou}</h3>
            <p className="text-slate-400">{t.thankyouMsg}</p>
          </div>
        )}

        {!submitted && (
          <div className="p-6 border-t border-white/10">
            <Button
              onClick={handleSubmit}
              disabled={formData.rating === 0}
              className="w-full bg-gold hover:bg-gold-light text-slate-950"
              data-testid="submit-survey"
            >
              <Send className="h-5 w-5 mr-2" />
              {t.submit}
            </Button>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
