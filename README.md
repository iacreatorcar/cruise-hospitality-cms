# 🚢 Cruise Ship Hospitality CMS

> Modern hospitality management platform for cruise ships with AI-powered assistance, digital menus, and seamless booking experience.

![Cruise Ship CMS](https://images.unsplash.com/photo-1761514745080-7cab3a9ad041?w=1200&h=400&fit=crop)

[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-Latest-green?logo=fastapi)](https://fastapi.tiangolo.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-5.0-green?logo=mongodb)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## ✨ Features

**🍽️ Digital Dining**
- 4 Premium restaurants with dynamic menus (Ocean Blue, The Iron Grill, Sakura, Sunset Bar)
- QR code generation for instant mobile access
- Allergen information and multi-language support (IT/EN)

**🤖 AI Concierge**
- Real-time assistance powered by OpenAI GPT-5.2
- 24/7 guest support for reservations, services, and inquiries
- Context-aware responses about ship facilities

**🏝️ Excursion Booking**
- Shore excursion catalog with detailed descriptions
- Real-time booking system with instant confirmation
- Date selection and party size management

**🎭 Entertainment Hub**
- Live show schedules and theater information
- Event timing and venue details
- Entertainment calendar

**📡 Connectivity Packages**
- Premium (€19.99/24h) - 50 Mbps, HD streaming
- Pro Full Cruise (€129.99) - 100 Mbps, 4K streaming, priority connection

**🖥️ IPTV Kiosk Mode**
- Touch-optimized interface for public terminals
- Large accessibility buttons
- Idle screen with touch-to-start

---

## 🛠️ Tech Stack

**Frontend:** React 19 • Tailwind CSS • Framer Motion • Shadcn/UI  
**Backend:** FastAPI • MongoDB • Motor (Async)  
**AI:** OpenAI GPT-5.2 via Emergent Integrations  
**Design:** Glassmorphism • "Midnight Ocean Luxury" theme

---

## 📁 Project Structure

```
cruise-hospitality-cms/
├── backend/          # FastAPI server, MongoDB models, AI integration
├── frontend/         # React app, components, pages, i18n
├── DEPLOYMENT.md     # Deployment guide
└── README.md         # This file
```

---

## 🚀 Quick Start

```bash
git clone https://github.com/iacreatorcar/cruise-hospitality-cms.git
cd cruise-hospitality-cms

# Backend setup
cd backend && pip install -r requirements.txt
uvicorn server:app --reload

# Frontend setup
cd frontend && yarn install
yarn start
```

Visit `http://localhost:3000` to see the application.

> **Note:** Configure `.env` files in both backend and frontend directories with your credentials. See `.env.example` for reference.

---

## 🎨 Design Philosophy

The "Midnight Ocean Luxury" theme combines:
- Deep navy backgrounds (#020617) with gold accents (#d4af37)
- Glassmorphism effects with 24px backdrop blur
- Playfair Display (headings) + Manrope (body) typography
- Smooth 500ms transitions and micro-interactions

---

## 🌐 Multi-Language

Full internationalization support:
- 🇮🇹 Italian (Italiano)
- 🇬🇧 English

Language switcher available on all pages.

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Carmine D'Alise**

- 💼 [LinkedIn](https://www.linkedin.com/in/carmine-d-alise-3b25024b)
- 🐙 [GitHub](https://github.com/iacreatorcar)

---

## 🙏 Acknowledgments

Built with [Emergent AI Platform](https://emergent.sh) • Design inspired by luxury cruise industry standards • Icons by [Lucide](https://lucide.dev)

---

<p align="center">⚓ <em>Setting sail with the future of cruise ship hospitality</em> ⚓</p>