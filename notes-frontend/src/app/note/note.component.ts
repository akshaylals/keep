import { Component, OnInit } from '@angular/core';
import { NoteService } from './services/note.service';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  notes: any[] = [];

  showNewNoteCard = false;
  newNote: any = { title: '', note: '' };

  constructor(private noteService: NoteService) {}

  ngOnInit(): void {
    this.noteService.getNotes().subscribe((notes) => {
      this.notes = notes;
    });
  }

  openNewNoteCard(): void {
    this.showNewNoteCard = true;
  }

  closeNewNoteCard(): void {
    this.newNote = { title: '', note: '' };
    this.showNewNoteCard = false;
  }

  createNewNote(): void {
    this.noteService.createNote(this.newNote).subscribe((data) => {
      this.notes.push({ ...data });
    })
    this.newNote = { title: '', note: '' };
    this.showNewNoteCard = false;
  }
}
