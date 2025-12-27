from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
from emergentintegrations.llm.chat import LlmChat, UserMessage
import qrcode
import io
import base64

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app
app = FastAPI()
api_router = APIRouter(prefix="/api")

# Models
class MenuItem(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    price: float
    category: str
    allergens: Optional[List[str]] = []

class Restaurant(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    type: str
    description: str
    hours: str
    image_url: str
    menu: List[MenuItem] = []

class RestaurantCreate(BaseModel):
    name: str
    type: str
    description: str
    hours: str
    image_url: str
    menu: List[MenuItem] = []

class Excursion(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    duration: str
    price: float
    image_url: str
    available_dates: List[str]

class ExcursionCreate(BaseModel):
    name: str
    description: str
    duration: str
    price: float
    image_url: str
    available_dates: List[str]

class Entertainment(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    type: str
    description: str
    venue: str
    time: str
    image_url: str

class EntertainmentCreate(BaseModel):
    name: str
    type: str
    description: str
    venue: str
    time: str
    image_url: str

class InternetPackage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    duration: str
    price: float
    features: List[str]
    speed: str

class InternetPackageCreate(BaseModel):
    name: str
    duration: str
    price: float
    features: List[str]
    speed: str

class ChatMessageInput(BaseModel):
    message: str
    session_id: str

class ChatMessageResponse(BaseModel):
    response: str
    session_id: str

class GuestService(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    hours: str
    location: str
    contact: str

class GuestServiceCreate(BaseModel):
    name: str
    description: str
    hours: str
    location: str
    contact: str

class Booking(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    excursion_id: str
    guest_name: str
    guest_email: str
    date: str
    num_guests: int
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class BookingCreate(BaseModel):
    excursion_id: str
    guest_name: str
    guest_email: str
    date: str
    num_guests: int

# Routes
@api_router.get("/")
async def root():
    return {"message": "Cruise Ship Hospitality API"}

# Restaurants
@api_router.get("/restaurants", response_model=List[Restaurant])
async def get_restaurants():
    restaurants = await db.restaurants.find({}, {"_id": 0}).to_list(100)
    return restaurants

@api_router.get("/restaurants/{restaurant_id}", response_model=Restaurant)
async def get_restaurant(restaurant_id: str):
    restaurant = await db.restaurants.find_one({"id": restaurant_id}, {"_id": 0})
    if not restaurant:
        raise HTTPException(status_code=404, detail="Restaurant not found")
    return restaurant

@api_router.post("/restaurants", response_model=Restaurant)
async def create_restaurant(restaurant: RestaurantCreate):
    restaurant_obj = Restaurant(**restaurant.model_dump())
    doc = restaurant_obj.model_dump()
    await db.restaurants.insert_one(doc)
    return restaurant_obj

# Excursions
@api_router.get("/excursions", response_model=List[Excursion])
async def get_excursions():
    excursions = await db.excursions.find({}, {"_id": 0}).to_list(100)
    return excursions

@api_router.post("/excursions", response_model=Excursion)
async def create_excursion(excursion: ExcursionCreate):
    excursion_obj = Excursion(**excursion.model_dump())
    doc = excursion_obj.model_dump()
    await db.excursions.insert_one(doc)
    return excursion_obj

# Entertainment
@api_router.get("/entertainment", response_model=List[Entertainment])
async def get_entertainment():
    entertainment = await db.entertainment.find({}, {"_id": 0}).to_list(100)
    return entertainment

@api_router.post("/entertainment", response_model=Entertainment)
async def create_entertainment(entertainment: EntertainmentCreate):
    entertainment_obj = Entertainment(**entertainment.model_dump())
    doc = entertainment_obj.model_dump()
    await db.entertainment.insert_one(doc)
    return entertainment_obj

# Internet Packages
@api_router.get("/packages", response_model=List[InternetPackage])
async def get_packages():
    packages = await db.packages.find({}, {"_id": 0}).to_list(100)
    return packages

@api_router.post("/packages", response_model=InternetPackage)
async def create_package(package: InternetPackageCreate):
    package_obj = InternetPackage(**package.model_dump())
    doc = package_obj.model_dump()
    await db.packages.insert_one(doc)
    return package_obj

# Guest Services
@api_router.get("/services", response_model=List[GuestService])
async def get_services():
    services = await db.services.find({}, {"_id": 0}).to_list(100)
    return services

@api_router.post("/services", response_model=GuestService)
async def create_service(service: GuestServiceCreate):
    service_obj = GuestService(**service.model_dump())
    doc = service_obj.model_dump()
    await db.services.insert_one(doc)
    return service_obj

# Bookings
@api_router.post("/bookings", response_model=Booking)
async def create_booking(booking: BookingCreate):
    booking_obj = Booking(**booking.model_dump())
    doc = booking_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.bookings.insert_one(doc)
    return booking_obj

@api_router.get("/bookings", response_model=List[Booking])
async def get_bookings():
    bookings = await db.bookings.find({}, {"_id": 0}).to_list(100)
    for booking in bookings:
        if isinstance(booking['created_at'], str):
            booking['created_at'] = datetime.fromisoformat(booking['created_at'])
    return bookings

# Chat
@api_router.post("/chat", response_model=ChatMessageResponse)
async def chat(message_input: ChatMessageInput):
    try:
        api_key = os.environ.get('EMERGENT_LLM_KEY')
        
        chat = LlmChat(
            api_key=api_key,
            session_id=message_input.session_id,
            system_message="You are a helpful cruise ship concierge assistant. Help guests with information about restaurants, excursions, entertainment, and ship services. Be friendly, professional, and concise."
        )
        
        chat.with_model("openai", "gpt-5.2")
        
        user_message = UserMessage(text=message_input.message)
        response = await chat.send_message(user_message)
        
        return ChatMessageResponse(
            response=response,
            session_id=message_input.session_id
        )
    except Exception as e:
        logging.error(f"Chat error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# QR Code Generation
@api_router.get("/qrcode/{restaurant_id}")
async def generate_qr_code(restaurant_id: str):
    try:
        frontend_url = os.environ.get('FRONTEND_URL', 'https://sea-services.preview.emergentagent.com')
        menu_url = f"{frontend_url}/menu/{restaurant_id}"
        
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=10,
            border=4,
        )
        qr.add_data(menu_url)
        qr.make(fit=True)
        
        img = qr.make_image(fill_color="black", back_color="white")
        
        buffer = io.BytesIO()
        img.save(buffer, format='PNG')
        buffer.seek(0)
        
        img_base64 = base64.b64encode(buffer.getvalue()).decode()
        
        return {
            "qr_code": f"data:image/png;base64,{img_base64}",
            "url": menu_url
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Initialize sample data
@api_router.post("/init-data")
async def initialize_data():
    # Check if data already exists
    existing = await db.restaurants.count_documents({})
    if existing > 0:
        return {"message": "Data already initialized"}
    
    # Sample restaurants
    restaurants_data = [
        {
            "id": "ocean-blue",
            "name": "Ocean Blue",
            "type": "Seafood Fine Dining",
            "description": "Elegante ristorante di pesce con vista sull'oceano",
            "hours": "18:00 - 23:00",
            "image_url": "https://images.unsplash.com/photo-1751890939642-52aa0d543bd0",
            "menu": [
                {"id": "1", "name": "Carpaccio di Tonno", "description": "Tonno fresco con rucola e parmigiano", "price": 24.0, "category": "Antipasti", "allergens": ["pesce"]},
                {"id": "2", "name": "Linguine ai Frutti di Mare", "description": "Pasta fresca con cozze, vongole e gamberi", "price": 32.0, "category": "Primi", "allergens": ["glutine", "molluschi"]},
                {"id": "3", "name": "Branzino al Forno", "description": "Branzino intero con patate e limone", "price": 38.0, "category": "Secondi", "allergens": ["pesce"]}
            ]
        },
        {
            "id": "iron-grill",
            "name": "The Iron Grill",
            "type": "Steakhouse",
            "description": "Steakhouse premium con carni selezionate",
            "hours": "19:00 - 23:30",
            "image_url": "https://images.unsplash.com/photo-1750943024048-a4c9912b1425",
            "menu": [
                {"id": "4", "name": "Ribeye 400g", "description": "Costata di manzo alla griglia", "price": 45.0, "category": "Secondi", "allergens": []},
                {"id": "5", "name": "Filetto di Manzo", "description": "Filetto con salsa al pepe verde", "price": 52.0, "category": "Secondi", "allergens": ["latticini"]},
                {"id": "6", "name": "Patate al Forno", "description": "Patate croccanti con rosmarino", "price": 8.0, "category": "Contorni", "allergens": []}
            ]
        },
        {
            "id": "sakura",
            "name": "Sakura",
            "type": "Asian Fusion",
            "description": "Cucina asiatica contemporanea",
            "hours": "18:30 - 23:00",
            "image_url": "https://images.unsplash.com/photo-1680946496238-5272d3c407fc",
            "menu": [
                {"id": "7", "name": "Sushi Mix", "description": "Selezione di nigiri e sashimi", "price": 28.0, "category": "Antipasti", "allergens": ["pesce", "soia"]},
                {"id": "8", "name": "Pad Thai", "description": "Noodles thai con gamberi", "price": 22.0, "category": "Primi", "allergens": ["glutine", "arachidi"]},
                {"id": "9", "name": "Anatra Pekinese", "description": "Anatra croccante con pancake", "price": 36.0, "category": "Secondi", "allergens": ["glutine"]}
            ]
        },
        {
            "id": "sunset-bar",
            "name": "Sunset Bar",
            "type": "Cocktail Lounge",
            "description": "Bar panoramico con cocktail d'autore",
            "hours": "16:00 - 02:00",
            "image_url": "https://images.unsplash.com/photo-1746213660917-dedbe610a254",
            "menu": [
                {"id": "10", "name": "Mojito", "description": "Rum bianco, menta e lime", "price": 12.0, "category": "Cocktail", "allergens": []},
                {"id": "11", "name": "Spritz", "description": "Aperol, prosecco e soda", "price": 10.0, "category": "Cocktail", "allergens": []},
                {"id": "12", "name": "Nachos", "description": "Nachos con guacamole e salsa", "price": 14.0, "category": "Snack", "allergens": ["glutine", "latticini"]}
            ]
        }
    ]
    
    for rest in restaurants_data:
        await db.restaurants.insert_one(rest)
    
    # Sample excursions
    excursions_data = [
        {
            "id": "island-tour",
            "name": "Tour Isola Tropicale",
            "description": "Esplora le bellezze naturali dell'isola con guida locale",
            "duration": "4 ore",
            "price": 89.0,
            "image_url": "https://images.unsplash.com/photo-1761426712722-73210bb10b28",
            "available_dates": ["2025-01-15", "2025-01-17", "2025-01-20"]
        },
        {
            "id": "snorkeling",
            "name": "Snorkeling Adventure",
            "description": "Immersione guidata nella barriera corallina",
            "duration": "3 ore",
            "price": 75.0,
            "image_url": "https://images.unsplash.com/photo-1761426712722-73210bb10b28",
            "available_dates": ["2025-01-16", "2025-01-18", "2025-01-21"]
        }
    ]
    
    for exc in excursions_data:
        await db.excursions.insert_one(exc)
    
    # Sample entertainment
    entertainment_data = [
        {
            "id": "jazz-night",
            "name": "Jazz Night",
            "type": "Live Music",
            "description": "Serata jazz con band dal vivo",
            "venue": "Teatro Principale",
            "time": "21:00",
            "image_url": "https://images.unsplash.com/photo-1764099362521-c693d0a59e0a"
        },
        {
            "id": "magic-show",
            "name": "Magic Show",
            "type": "Performance",
            "description": "Spettacolo di magia e illusionismo",
            "venue": "Teatro Principale",
            "time": "20:00",
            "image_url": "https://images.unsplash.com/photo-1764099362521-c693d0a59e0a"
        }
    ]
    
    for ent in entertainment_data:
        await db.entertainment.insert_one(ent)
    
    # Sample packages
    packages_data = [
        {
            "id": "premium-24h",
            "name": "Premium 24 Ore",
            "duration": "24 ore",
            "price": 19.99,
            "features": ["Velocità fino a 50 Mbps", "Streaming HD", "1 dispositivo"],
            "speed": "50 Mbps"
        },
        {
            "id": "pro-cruise",
            "name": "Pro Full Cruise",
            "duration": "Intera crociera",
            "price": 129.99,
            "features": ["Velocità fino a 100 Mbps", "Streaming 4K", "5 dispositivi", "Priorità connessione"],
            "speed": "100 Mbps"
        }
    ]
    
    for pkg in packages_data:
        await db.packages.insert_one(pkg)
    
    # Sample services
    services_data = [
        {
            "id": "reception",
            "name": "Reception",
            "description": "Assistenza per prenotazioni e informazioni",
            "hours": "24/7",
            "location": "Ponte 5, Lobby Principale",
            "contact": "Interno 100"
        },
        {
            "id": "spa",
            "name": "Spa & Wellness",
            "description": "Centro benessere con massaggi e trattamenti",
            "hours": "08:00 - 22:00",
            "location": "Ponte 12",
            "contact": "Interno 250"
        }
    ]
    
    for svc in services_data:
        await db.services.insert_one(svc)
    
    return {"message": "Data initialized successfully"}

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()