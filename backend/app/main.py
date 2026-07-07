from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.routes.ats import router


# ==========================================================
# Application Lifespan
# ==========================================================

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("✅ ATS Scanner API Started")
    yield
    print("🛑 ATS Scanner API Stopped")


# ==========================================================
# FastAPI App
# ==========================================================

app = FastAPI(
    title="ATS Resume Scanner API",
    description="Professional ATS Resume Analysis Backend",
    version="2.0.0",
    lifespan=lifespan,
)


# ==========================================================
# CORS
# ==========================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5173",

        # Production frontend
        "https://resume-builder-mini.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==========================================================
# Routers
# ==========================================================

app.include_router(router)


# ==========================================================
# Root
# ==========================================================

@app.get("/")
async def root():
    return {
        "success": True,
        "message": "ATS Resume Scanner API Running",
        "version": app.version,
    }


# ==========================================================
# Health Check
# ==========================================================

@app.get("/health")
async def health():
    return {
        "status": "healthy",
        "service": "ATS Resume Scanner",
        "version": app.version,
    }


# ==========================================================
# Global Exception Handler
# ==========================================================

@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    return JSONResponse(
        status_code=500,
        content={
            "success": False,
            "message": "Internal Server Error",
            "error": str(exc),
        },
    )