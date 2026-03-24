# Sunflower Code Studio (MVP)

Sunflower is a full-stack MVP for a **code-generating AI workspace** with:

- GitHub OAuth authentication (via Supabase Auth)
- Supabase-backed persistence
- FastAPI backend for orchestration and code generation
- Next.js frontend for a lovable, Codex-like project experience
- Docker Compose for local end-to-end bootstrapping

## Monorepo Structure

```
apps/
  backend/      FastAPI app (API, auth verification, code generation services)
  frontend/     Next.js app (UI, auth, project & generation workflows)
packages/
  shared/       Shared TypeScript SDK and API types
infra/
  docker/       Container and runtime definitions
```

## Quick Start

### 1) Copy env files

```bash
cp apps/backend/.env.example apps/backend/.env
cp apps/frontend/.env.example apps/frontend/.env.local
```

### 2) Fill required variables

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_JWT_SECRET`
- `OPENAI_API_KEY`
- `GITHUB_CLIENT_ID`
- `GITHUB_CLIENT_SECRET`

### 3) Start services

```bash
docker compose -f infra/docker/docker-compose.yml up --build
```

### 4) Access apps

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:8000/docs`

## Supabase Setup

1. Create a Supabase project.
2. In Auth providers, enable GitHub and configure callback URL: 
   - `http://localhost:3000/auth/callback`
3. Run SQL in `infra/supabase/schema.sql`.
4. Set frontend/backend environment variables.

## API Highlights

- `GET /health` — health check
- `POST /api/v1/projects` — create project
- `GET /api/v1/projects` — list projects
- `POST /api/v1/generate` — generate code from prompt/context
- `GET /api/v1/generations/{id}` — get generation metadata

All secured routes require a Supabase JWT bearer token.

## Frontend UX

- GitHub sign-in
- Dashboard with projects
- Project detail with prompt editor
- Generated code viewer
- Saved generation history

## Local Development

### Backend

```bash
cd apps/backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### Frontend

```bash
cd apps/frontend
npm install
npm run dev
```

## Production Notes

- Use managed Postgres and point Supabase accordingly.
- Add Redis for queueing and streaming token updates.
- Add secure secret manager integration.
- Enable audit logging and org-level RBAC.

## Disclaimer

This is an MVP intended for learning and accelerated prototyping. Apply security hardening, abuse controls, and monitoring before production deployment.
