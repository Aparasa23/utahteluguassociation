from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend_py.app.routers import tournaments, analytics, communications

app = FastAPI(
    title="Utah Telugu Association (UTA) Python Core Engine",
    description="Algorithmic tournament scheduling, ICC Net Run Rate engine, financial forecasting, and communication synthesis microservice.",
    version="1.0.0"
)

# Configure CORS for Next.js app communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3005", "http://127.0.0.1:3000", "http://127.0.0.1:3005"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(tournaments.router)
app.include_router(analytics.router)
app.include_router(communications.router)

@app.get("/")
def root():
    return {
        "service": "Utah Telugu Association Python Core Engine",
        "status": "ONLINE",
        "version": "1.0.0",
        "docs_url": "/docs"
    }

@app.get("/api/py/health")
def health():
    return {
        "status": "healthy",
        "modules": {
            "tournaments": "ready",
            "analytics": "ready",
            "communications": "ready"
        }
    }
