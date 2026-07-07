from fastapi import (
    APIRouter,
    File,
    Form,
    HTTPException,
    UploadFile,
)

from app.services.ats_pipeline import (
    run_ats_pipeline,
)

router = APIRouter(
    prefix="/api/ats",
    tags=["ATS Scanner"],
)


@router.post("/analyze")
async def analyze_resume(
    resume: UploadFile = File(...),
    jobDescription: str = Form(...),
):
    """
    Analyze a resume against a job description.

    All business logic is delegated to the ATS pipeline.
    """

    try:

        if not jobDescription.strip():
            raise HTTPException(
                status_code=400,
                detail="Job Description cannot be empty.",
            )

        return await run_ats_pipeline(
            resume=resume,
            job_description=jobDescription,
        )

    except HTTPException:
        raise

    except ValueError as e:

        raise HTTPException(
            status_code=400,
            detail=str(e),
        )

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail={
                "message": "Failed to analyze resume.",
                "error": str(e),
            },
        )