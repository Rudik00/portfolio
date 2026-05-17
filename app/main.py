import logging
import os
import sys
import time
import pathlib

from contextlib import asynccontextmanager

from fastapi import FastAPI, Request

from fastapi.responses import FileResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles

# Добавляем корень проекта в путь для импорта logging_config
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from .logging_config import setup_logging  # noqa: E402


logger = logging.getLogger("my_portfolio")


@asynccontextmanager
async def lifespan(app: FastAPI):
    setup_logging()   # вызывается внутри воркера uvicorn
    logger.info("=== Приложение My Portfolio запущено ===")
    yield
    logger.info("=== Приложение My Portfolio остановлено ===")


app = FastAPI(title="My Portfolio API", lifespan=lifespan)


# Подключаем раздачу статических файлов из app/static
static_dir = pathlib.Path(__file__).parent / "static"
app.mount("/static", StaticFiles(directory=static_dir), name="static")


@app.middleware("http")
async def log_requests(request: Request, call_next):
    start = time.perf_counter()
    try:
        response = await call_next(request)
    except Exception as exc:
        logger.error(
            "Необработанное исключение: %s %s — %s",
            request.method, request.url.path, exc,
            exc_info=True,
        )
        raise
    elapsed = (time.perf_counter() - start) * 1000
    level = logging.WARNING if response.status_code >= 400 else logging.INFO
    logger.log(
        level,
        "%s %s → %s  (%.1f ms)",
        request.method,
        request.url.path,
        response.status_code,
        elapsed,
    )
    return response


@app.get("/")
async def root_redirect():
    # Автоматически перенаправляет пользователя с сервера / на /home_page
    return RedirectResponse(url="/home_page")


@app.get("/home_page")
async def home_page():
    return FileResponse("home_page/index.html")


@app.get("/home_page/project_1")
async def project_1_page():
    return FileResponse("my_projects/project_1/pr_1.html")


@app.get("/home_page/project_2")
async def project_2_page():
    return FileResponse("my_projects/project_2/pr_2.html")


@app.get("/home_page/project_3")
async def project_3_page():
    return FileResponse("my_projects/project_3/pr_3.html")


@app.get("/home_page/project_4")
async def project_4_page():
    return FileResponse("my_projects/project_4/pr_4.html")


@app.get("/home_page/project_5")
async def project_5_page():
    return FileResponse("my_projects/project_5/pr_5.html")


@app.get("/home_page/project_6")
async def project_6_page():
    return FileResponse("my_projects/project_6/pr_6.html")
