from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field


class ProjectCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    description: Optional[str] = None


class Project(BaseModel):
    id: str
    owner_id: str
    name: str
    description: Optional[str] = None
    created_at: datetime


class GenerationRequest(BaseModel):
    project_id: str
    prompt: str = Field(min_length=8, max_length=12000)
    context: Optional[str] = Field(default="", max_length=30000)
    target_language: str = Field(default="typescript", max_length=40)


class GenerationResponse(BaseModel):
    id: str
    project_id: str
    result_code: str
    explanation: str
    model: str
    created_at: datetime
