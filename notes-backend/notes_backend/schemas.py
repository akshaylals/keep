from pydantic import BaseModel


class NoteBase(BaseModel):
    title: str
    note: str


class Note(NoteBase):
    id: int

    class Config:
        orm_mode = True


class NoteCreate(NoteBase):
    pass