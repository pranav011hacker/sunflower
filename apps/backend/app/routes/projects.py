from fastapi import APIRouter, Depends

from app.core.security import verify_supabase_token
from app.db.supabase import get_admin_client
from app.models import ProjectCreate

router = APIRouter()


@router.post("/projects")
def create_project(payload: ProjectCreate, user=Depends(verify_supabase_token)):
    supabase = get_admin_client()
    row = {
        "owner_id": user.get("sub"),
        "name": payload.name,
        "description": payload.description,
    }
    result = supabase.table("projects").insert(row).execute()
    return result.data[0]


@router.get("/projects")
def list_projects(user=Depends(verify_supabase_token)):
    supabase = get_admin_client()
    owner_id = user.get("sub")
    result = supabase.table("projects").select("*").eq("owner_id", owner_id).order("created_at", desc=True).execute()
    return {"items": result.data}
