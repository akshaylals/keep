from sqlalchemy.orm import Session

from . import models, schemas


def get_notes(db: Session):
    return db.query(models.Note).all()

def get_note(db: Session, note_id: int):
    return db.query(models.Note).filter(models.Note.id == note_id).first()

def create_note(db: Session, note: schemas.NoteCreate):
    db_note = models.Note(**note.dict())
    db.add(db_note)
    db.commit()
    db.refresh(db_note)
    return db_note


# def delete_annotation(db: Session, annotation_id: int):
#     db_annotation = db.query(models.Annotation).filter(models.Annotation.id == annotation_id).first()
#     if db_annotation:
#         db.delete(db_annotation)
#         db.commit()
#         return db_annotation
#     else:
#         return None
