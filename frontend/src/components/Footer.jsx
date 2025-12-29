import React from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export const Footer = () => {
  const { language } = useLanguage();

  const text = {
    it: {
      createdBy: 'Creato con',
      by: 'da',
      rights: 'Tutti i diritti riservati',
      project: 'Cruise Ship Hospitality CMS',
    },
    en: {
      createdBy: 'Created with',
      by: 'by',
      rights: 'All rights reserved',
      project: 'Cruise Ship Hospitality CMS',
    },
  };

  const t = text[language];

  return (
    <footer className="glass border-t border-white/10 mt-20" data-testid="footer">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Created By Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-slate-400"
          >
            <span>{t.createdBy}</span>
            <Heart className="h-4 w-4 text-gold fill-gold" />
            <span>{t.by}</span>
            <a
              href="https://github.com/iacreatorcar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:text-gold-light transition-colors font-medium"
              data-testid="author-link"
            >
              Carmine D'Alise
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-4"
          >
            <a
              href="https://github.com/iacreatorcar/cruise-hospitality-cms"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-white/5 transition-colors"
              data-testid="github-link"
            >
              <Github className="h-5 w-5 text-slate-400 hover:text-white" />
            </a>
            <a
              href="https://www.linkedin.com/in/carmine-d-alise-3b25024b"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-white/5 transition-colors"
              data-testid="linkedin-link"
            >
              <Linkedin className="h-5 w-5 text-slate-400 hover:text-white" />
            </a>
            <a
              href="mailto:carmine.dalise@example.com"
              className="p-2 rounded-full hover:bg-white/5 transition-colors"
              data-testid="email-link"
            >
              <Mail className="h-5 w-5 text-slate-400 hover:text-white" />
            </a>
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-sm text-center md:text-right"
          >
            <p>© {new Date().getFullYear()} {t.project}</p>
            <p>{t.rights}</p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};
