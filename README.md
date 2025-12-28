# 🚢 Cruise Ship Hospitality CMS

> A comprehensive hospitality management system for cruise ships, featuring digital menus, excursion bookings, AI concierge, and IPTV kiosk mode.

![Cruise Ship CMS](https://images.unsplash.com/photo-1761514745080-7cab3a9ad041?w=1200&h=400&fit=crop)

## 🌟 Overview

A full-stack luxury hospitality platform designed specifically for cruise ships. This application provides guests with seamless access to dining, entertainment, excursions, and services through an elegant, IPTV-compatible interface with real-time AI assistance.

**Created by:** [Carmine Dalise](https://github.com/carmine-dalise)

---

## ✨ Key Features

### 🍽️ **Digital Restaurant System**
- **4 Premium Venues**: Ocean Blue (Seafood), The Iron Grill (Steakhouse), Sakura (Asian Fusion), Sunset Bar (Cocktails)
- **Dynamic Digital Menus** with categories, prices, and allergen information
- **QR Code Generation** for smartphone menu access
- Multi-language support (Italian/English)

### 🏝️ **Excursion Management**
- Browse available shore excursions with detailed descriptions
- Real-time booking system with guest information capture
- Date selection and party size management
- Instant confirmation notifications

### 🎭 **Entertainment Hub**
- Live shows and performances schedule
- Theater and venue information
- Event timing and descriptions

### 🤖 **AI Concierge Assistant**
- Powered by **OpenAI GPT-5.2**
- Real-time chat support for guest inquiries
- Context-aware responses about ship services
- Elegant floating chat interface

### 📡 **Internet Packages**
- **Premium 24h**: €19.99 - 50 Mbps, HD Streaming
- **Pro Full Cruise**: €129.99 - 100 Mbps, 4K Streaming, Priority Connection
- Easy purchase and activation flow

### 🖥️ **Kiosk Mode**
- Touch-optimized interface for public information terminals
- Large, accessible navigation buttons
- Idle screen with touch-to-start functionality
- Perfect for IPTV hotel mode integration

### 👨‍💼 **Admin Dashboard**
- Comprehensive CMS statistics
- Real-time booking monitoring
- Content management overview

---

## 🎨 Design System

**Theme:** "Midnight Ocean Luxury"

- **Color Palette:**
  - Background: Deep Navy (`#020617`)
  - Accent: Gold (`#d4af37`)
  - Text: Cream/Slate (`#f8fafc`)

- **Typography:**
  - Headings: Playfair Display (Serif)
  - Body: Manrope (Sans-serif)
  - Code: JetBrains Mono

- **Visual Effects:**
  - Glassmorphism with backdrop blur
  - Gold glow effects for CTAs
  - Smooth 500ms transitions
  - Responsive bento grid layouts

---

## 🛠️ Technology Stack

### **Frontend**
- **React 19** - Modern UI library
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Shadcn/UI** - Premium component library
- **Framer Motion** - Smooth animations
- **Axios** - HTTP client
- **React QR Code** - QR generation
- **Sonner** - Toast notifications

### **Backend**
- **FastAPI** - High-performance Python API framework
- **MongoDB** - NoSQL database
- **Motor** - Async MongoDB driver
- **Pydantic** - Data validation
- **Emergent Integrations** - Unified LLM API (GPT-5.2)
- **QRCode** - Server-side QR generation
- **Python-dotenv** - Environment management

### **AI Integration**
- **OpenAI GPT-5.2** via Emergent Universal Key
- Real-time conversational AI
- Context-aware cruise ship assistance

---

## 📁 Project Structure

```
/app
├── backend/
│   ├── server.py              # FastAPI application
│   ├── .env                   # Environment variables
│   └── requirements.txt       # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatBot.jsx    # AI assistant
│   │   │   ├── Navigation.jsx # Bottom navigation
│   │   │   └── ui/            # Shadcn components
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Restaurants.jsx
│   │   │   ├── MenuPage.jsx
│   │   │   ├── Excursions.jsx
│   │   │   ├── Entertainment.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── InternetPackages.jsx
│   │   │   ├── KioskMode.jsx
│   │   │   └── AdminDashboard.jsx
│   │   ├── App.js
│   │   └── index.css
│   ├── package.json
│   └── tailwind.config.js
└── README.md
```

---

## 🚀 Installation & Setup

### **Prerequisites**
- Node.js 18+ and Yarn
- Python 3.11+
- MongoDB 5.0+

### **Backend Setup**

```bash
cd backend

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your MongoDB URL and API keys

# Run server
uvicorn server:app --reload --host 0.0.0.0 --port 8001
```

### **Frontend Setup**

```bash
cd frontend

# Install dependencies
yarn install

# Configure environment
cp .env.example .env
# Edit .env with your backend URL

# Run development server
yarn start
```

### **Environment Variables**

**Backend (.env)**
```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=cruise_hospitality
CORS_ORIGINS=*
EMERGENT_LLM_KEY=your_key_here
```

**Frontend (.env)**
```env
REACT_APP_BACKEND_URL=http://localhost:8001
```

---

## 📱 Usage

### **For Guests**
1. **Browse Restaurants** - View menus and dining hours
2. **Scan QR Codes** - Access menus on your phone
3. **Book Excursions** - Reserve shore activities
4. **Check Entertainment** - See show schedules
5. **Chat with AI** - Get instant assistance
6. **Purchase Internet** - Stay connected during the cruise

### **For Staff (Kiosk Mode)**
- Access via `/kiosk` route
- Touch-friendly interface for information terminals
- Quick navigation to all services

### **For Administrators**
- Dashboard at `/admin`
- View statistics and booking data
- Monitor system usage

---

## 🔌 API Endpoints

### **Restaurants**
- `GET /api/restaurants` - List all restaurants
- `GET /api/restaurants/{id}` - Get restaurant details
- `POST /api/restaurants` - Create restaurant (admin)

### **Excursions**
- `GET /api/excursions` - List excursions
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - List all bookings

### **Entertainment**
- `GET /api/entertainment` - List events

### **Services**
- `GET /api/services` - Guest services
- `GET /api/packages` - Internet packages

### **AI Chat**
- `POST /api/chat` - Send message to AI assistant

### **QR Codes**
- `GET /api/qrcode/{restaurant_id}` - Generate menu QR code

### **Utilities**
- `POST /api/init-data` - Initialize sample data

---

## 🌐 Multi-Language Support

- **Italian** (Italiano) 🇮🇹
- **English** (English) 🇬🇧

Language switcher available in all pages for seamless translation.

---

## 📸 Screenshots

### Home Page
Elegant landing page with quick access to all services

### Restaurant & Digital Menus
Beautiful menu presentation with QR code access

### AI Concierge Chat
Real-time assistance powered by GPT-5.2

### Kiosk Mode
Touch-optimized interface for public terminals

---

## 🎯 Use Cases

- **Cruise Ships** - Primary use case
- **Hotels** - IPTV room service integration
- **Resorts** - Guest services portal
- **Conference Centers** - Event information kiosks
- **Restaurants** - Digital menu systems

---

## 🔒 Security Features

- Environment-based configuration
- CORS protection
- MongoDB ObjectId exclusion for JSON safety
- Input validation with Pydantic
- Secure API key management

---

## 🚀 Deployment

This application is deployment-ready for:
- **Emergent Platform** (Native deployment)
- **Docker** containers
- **Cloud platforms** (AWS, Azure, GCP)
- **Traditional VPS** hosting

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

MIT License - feel free to use this project for your portfolio or commercial purposes.

---

## 👨‍💻 Author

**Carmine Dalise**

- Portfolio: [Your Portfolio URL]
- GitHub: [@carmine-dalise](https://github.com/carmine-dalise)
- LinkedIn: [Your LinkedIn]
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- Built with [Emergent AI Platform](https://emergent.sh)
- Design inspiration from luxury cruise industry standards
- Icons by [Lucide](https://lucide.dev)
- Fonts from [Google Fonts](https://fonts.google.com)

---

## 📞 Support

For questions or support, please open an issue on GitHub or contact the author directly.

---

**⚓ Bon Voyage! Set sail with the future of cruise ship hospitality. ⚓**