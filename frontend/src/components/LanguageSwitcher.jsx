import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { motion } from 'framer-motion';

export const LanguageSwitcher = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleLanguage}
      className="fixed top-6 right-6 z-50 glass px-4 py-2 rounded-full flex items-center gap-2 text-white hover:border-gold/50 transition-all duration-300"
      data-testid="language-switcher"
    >
      <Globe className="h-5 w-5 text-gold" />
      <span className="font-medium">{language === 'it' ? '🇮🇹 IT' : '🇬🇧 EN'}</span>
    </motion.button>
  );
};
