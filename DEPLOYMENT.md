# 🚀 Deployment Guide - Cruise Ship Hospitality CMS

## Quick Deploy Options

### Option 1: Emergent Platform (Recommended) ⭐

**Advantages**:
- ✅ Full-stack working (Backend + Frontend + Database + AI)
- ✅ One-click deployment
- ✅ Automatic HTTPS
- ✅ MongoDB included
- ✅ Environment variables managed

**Steps**:
1. In Emergent interface, click **"Deploy"** button
2. Choose project name: `cruise-hospitality-cms`
3. Deploy automatically configures:
   - Backend FastAPI on port 8001
   - Frontend React on port 3000
   - MongoDB connection
   - Environment variables
4. Get live URL: `https://your-project.preview.emergentagent.com`

**Use this URL for your portfolio!**

---

### Option 2: GitHub Pages (Frontend Only) 📄

**Advantages**:
- ✅ Free hosting
- ✅ Fast CDN
- ✅ Custom domain support

**Limitations**:
- ❌ No backend functionality
- ❌ No AI chatbot
- ❌ No bookings system
- ❌ Static content only

**Steps**:

1. **Build frontend**:
```bash
cd frontend
yarn install
yarn build
```

2. **Configure GitHub Pages**:
- Go to repository Settings
- Navigate to "Pages"
- Source: Deploy from branch
- Branch: `main` → folder: `/frontend/build`
- Save

3. **Update frontend/.env for static**:
```env
# Use mock data for static site
REACT_APP_BACKEND_URL=https://your-api.com
```

4. **Access**:
- URL: https://iacreatorcar.github.io/cruise-hospitality-cms/

---

### Option 3: Docker Deployment 🐳

**Create `docker-compose.yml`**:

```yaml
version: '3.8'
services:
  mongodb:
    image: mongo:5.0
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

  backend:
    build: ./backend
    ports:
      - "8001:8001"
    environment:
      - MONGO_URL=mongodb://mongodb:27017
      - DB_NAME=cruise_hospitality
      - EMERGENT_LLM_KEY=${EMERGENT_LLM_KEY}
    depends_on:
      - mongodb

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_BACKEND_URL=http://localhost:8001
    depends_on:
      - backend

volumes:
  mongo_data:
```

**Deploy**:
```bash
docker-compose up -d
```

---

### Option 4: Cloud Platforms ☁️

#### Vercel (Frontend) + Railway (Backend)

**Frontend on Vercel**:
```bash
cd frontend
vercel
```

**Backend on Railway**:
1. Connect GitHub repository
2. Select backend folder
3. Add environment variables
4. Deploy

#### AWS / Azure / GCP

**Architecture**:
- EC2/VM for backend
- S3/Blob Storage for frontend static files
- MongoDB Atlas for database
- CloudFront/CDN for distribution

---

## Environment Variables

### Backend (.env)
```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=cruise_hospitality
CORS_ORIGINS=*
EMERGENT_LLM_KEY=your_key_here
```

### Frontend (.env)
```env
REACT_APP_BACKEND_URL=https://your-backend-url.com
```

---

## Post-Deployment Checklist

### ✅ Backend Verification
```bash
curl https://your-api.com/api/
# Should return: {"message": "Cruise Ship Hospitality API"}

curl https://your-api.com/api/restaurants
# Should return: JSON array of restaurants
```

### ✅ Frontend Verification
1. Open browser to your frontend URL
2. Check:
   - [ ] Homepage loads
   - [ ] Language switcher works (IT/EN)
   - [ ] Navigation working
   - [ ] Restaurant pages load
   - [ ] Chat button appears

### ✅ Full Integration Test
1. Click on restaurant
2. View menu
3. Try QR code
4. Open chatbot
5. Send message to AI
6. Book an excursion

---

## Monitoring

### Health Check Endpoints
```bash
# Backend health
GET /api/

# Database connection
GET /api/restaurants
```

### Logs
```bash
# View backend logs
tail -f /var/log/backend.log

# View frontend logs
tail -f /var/log/frontend.log
```

---

## Performance Optimization

### Frontend
- ✅ Code splitting already implemented
- ✅ Lazy loading for routes
- ✅ Image optimization with Unsplash CDN
- ✅ Tailwind CSS purging

### Backend
- ✅ MongoDB indexing on frequently queried fields
- ✅ CORS configuration for production
- ✅ Async/await for non-blocking operations

---

## Security Checklist

- [ ] Environment variables not committed
- [ ] HTTPS enabled
- [ ] CORS properly configured
- [ ] API rate limiting implemented
- [ ] Input validation with Pydantic
- [ ] MongoDB ObjectId exclusion

---

## Scaling

### Horizontal Scaling
- Multiple backend instances behind load balancer
- MongoDB replica set
- Redis for session management

### Vertical Scaling
- Increase CPU/RAM for backend
- Optimize database queries
- CDN for static assets

---

## Support

For deployment issues:
- Check logs first
- Verify environment variables
- Test API endpoints manually
- Check database connectivity

---

**Created by: Carmine Dalise**
**Repository: https://github.com/iacreatorcar/cruise-hospitality-cms**