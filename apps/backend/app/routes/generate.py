from datetime import datetime, timezone
from uuid import uuid4

from fastapi import APIRouter, Depends, HTTPException

from app.core.security import verify_supabase_token
from app.db.supabase import get_admin_client
from app.models import GenerationRequest
from app.services.openai_service import generate_code_bundle

router = APIRouter()


@router.post("/generate")
def generate(payload: GenerationRequest, user=Depends(verify_supabase_token)):
    supabase = get_admin_client()
    project = (
        supabase.table("projects")
        .select("id, owner_id")
        .eq("id", payload.project_id)
        .limit(1)
        .execute()
    )
    if not project.data:
        raise HTTPException(status_code=404, detail="Project not found")
    if project.data[0]["owner_id"] != user.get("sub"):
        raise HTTPException(status_code=403, detail="Forbidden")

    result = generate_code_bundle(
        prompt=payload.prompt,
        context=payload.context or "",
        target_language=payload.target_language,
    )

    row = {
        "id": str(uuid4()),
        "project_id": payload.project_id,
        "owner_id": user.get("sub"),
        "prompt": payload.prompt,
        "context": payload.context,
        "target_language": payload.target_language,
        "result_code": result["code"],
        "explanation": result["explanation"],
        "model": result["model"],
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    insert = supabase.table("generations").insert(row).execute()
    return insert.data[0]


@router.get("/generations/{generation_id}")
def get_generation(generation_id: str, user=Depends(verify_supabase_token)):
    supabase = get_admin_client()
    result = (
        supabase.table("generations")
        .select("*")
        .eq("id", generation_id)
        .eq("owner_id", user.get("sub"))
        .limit(1)
        .execute()
    )
    if not result.data:
        raise HTTPException(status_code=404, detail="Generation not found")
    return result.data[0]
