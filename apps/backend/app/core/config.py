from functools import lru_cache
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "Sunflower Code Studio API"
    env: str = "development"
    port: int = 8000
    log_level: str = "INFO"

    supabase_url: str
    supabase_anon_key: str
    supabase_service_role_key: str
    supabase_jwt_secret: str

    openai_api_key: str
    openai_model: str = "gpt-4.1-mini"

    github_client_id: str
    github_client_secret: str

    cors_origins: str = "http://localhost:3000"

    class Config:
        env_file = ".env"
        case_sensitive = False


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
