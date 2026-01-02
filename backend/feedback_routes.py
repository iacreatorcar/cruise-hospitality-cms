from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from datetime import datetime, timezone
import uuid
from motor.motor_asyncio import AsyncIOMotorClient
import os

router = APIRouter()

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

class FeedbackSubmission(BaseModel):
    rating: int = Field(ge=1, le=5)
    usability: int = Field(ge=0, le=5)
    design: int = Field(ge=0, le=5)
    features: List[str] = []
    improvements: str = ""
    would_recommend: Optional[str] = None
    email: Optional[EmailStr] = None
    role: Optional[str] = None

class FeedbackResponse(BaseModel):
    model_config = {"extra": "ignore"}
    id: str
    rating: int
    usability: int
    design: int
    features: List[str]
    improvements: str
    would_recommend: Optional[str]
    email: Optional[str]
    role: Optional[str]
    created_at: datetime
    user_agent: Optional[str] = None

@router.post("/feedback", response_model=FeedbackResponse)
async def submit_feedback(feedback: FeedbackSubmission):
    """
    Submit user feedback survey
    """
    feedback_obj = FeedbackResponse(
        id=str(uuid.uuid4()),
        **feedback.model_dump(),
        created_at=datetime.now(timezone.utc)
    )
    
    doc = feedback_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.feedback.insert_one(doc)
    
    return feedback_obj

@router.get("/feedback/stats")
async def get_feedback_stats():
    """
    Get feedback statistics (admin only in production)
    """
    total = await db.feedback.count_documents({})
    
    # Average ratings
    pipeline = [
        {
            "$group": {
                "_id": None,
                "avg_rating": {"$avg": "$rating"},
                "avg_usability": {"$avg": "$usability"},
                "avg_design": {"$avg": "$design"}
            }
        }
    ]
    
    averages_cursor = db.feedback.aggregate(pipeline)
    averages = await averages_cursor.to_list(1)
    
    # Recommendation count
    would_recommend = await db.feedback.count_documents({"would_recommend": "yes"})
    would_not = await db.feedback.count_documents({"would_recommend": "no"})
    maybe = await db.feedback.count_documents({"would_recommend": "maybe"})
    
    # Most popular features
    pipeline_features = [
        {"$unwind": "$features"},
        {"$group": {"_id": "$features", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}},
        {"$limit": 5}
    ]
    
    features_cursor = db.feedback.aggregate(pipeline_features)
    popular_features = await features_cursor.to_list(5)
    
    return {
        "total_responses": total,
        "averages": averages[0] if averages else {},
        "recommendations": {
            "yes": would_recommend,
            "no": would_not,
            "maybe": maybe
        },
        "popular_features": popular_features
    }

@router.get("/feedback/recent")
async def get_recent_feedback(limit: int = 10):
    """
    Get recent feedback (admin only in production)
    """
    feedback_list = await db.feedback.find(
        {},
        {"_id": 0}
    ).sort("created_at", -1).limit(limit).to_list(limit)
    
    return feedback_list
