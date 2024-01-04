from typing import Annotated

from fastapi import FastAPI, Depends
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session


from . import crud, models, schemas
from .database import engine, get_db


# to get a string like this run:
# openssl rand -hex 32
SECRET_KEY="f3a91b46476469e51ce8a1a3eade4a1c1a5830235f3552f0cec41c2baad1070c"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

@app.get("/", include_in_schema=False)
async def redirect_to_docs():
    return RedirectResponse(url="/docs")

@app.get("/notes", response_model=list[schemas.Note])
def get_all_notes(db: Annotated[Session, Depends(get_db)]):
    return crud.get_notes(db)

@app.get("/notes/{note_id}", response_model=schemas.Note)
def get_note(db: Annotated[Session, Depends(get_db)], note_id: int):
    return crud.get_note(db, note_id)

@app.post("/notes", response_model=schemas.Note)
def create_note(db: Annotated[Session, Depends(get_db)], note: schemas.NoteCreate):
    return crud.create_note(db, note)