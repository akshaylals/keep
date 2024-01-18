import { Component, OnInit } from '@angular/core';
import { NoteService } from './services/note.service';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { Note } from './note';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  notes: any[] = [];

  showEditNoteCard = false;
  showNewNoteCard = false;
  editNote: any = { id: null, title: '', note: ''};
  newNote: any = { title: '', note: '' };
  breakpoint: number;

  constructor(private noteService: NoteService) {
    this.breakpoint = this.getGridCols();
  }

  ngOnInit(): void {
    this.noteService.getNotes().subscribe((notes) => {
      this.notes = notes;
    });
    this.breakpoint = this.getGridCols();
  }

  onResize(event: any) {
    this.breakpoint = this.getGridCols();
  }

  getGridCols(){
    if (window.innerWidth <= 400){
      return 1;
    } else if (window.innerWidth <= 700){
      return 2;
    } else if (window.innerWidth <= 1000){
      return 3;
    } else {
      return 6;
    }
  }

  openNewNoteCard(): void {
    this.showNewNoteCard = true;
  }

  closeNewNoteCard(): void {
    this.newNote = { title: '', note: '' };
    this.showNewNoteCard = false;
  }

  closeEditNoteCard(): void {
    this.newNote = { title: '', note: '' };
    this.showEditNoteCard = false;
  }

  createNewNote(): void {
    this.noteService.createNote(this.newNote).subscribe((data) => {
      this.notes.push({ ...data });
    })
    this.newNote = { title: '', note: '' };
    this.showNewNoteCard = false;
  }

  updateNote(): void {
    this.noteService.updateNote(this.editNote).subscribe((data) => {
      for (let i = 0; i < this.notes.length; ++i) {
        if (this.notes[i].id === data.id) {
          this.notes[i] = { ...this.notes[i], ...data };
        }
      }
    })
    this.editNote = { id: null, title: '', note: '' };
    this.showEditNoteCard = false;
  }

  deleteNote(): void{
    this.noteService.deleteNote(this.editNote.id).subscribe((data) => {
      this.notes = this.notes.filter(note => note.id !== data.id);
    })
    this.editNote = { id: null, title: '', note: '' };
    this.showEditNoteCard = false;
  }

  openEditNoteCard(note: Note): void {
    this.editNote = {...note};
    this.showEditNoteCard = true;
  }
}
