import { Component, OnInit } from '@angular/core';
import { NotesService } from '../../core/notes.service';
import { Note } from '../../model/note';
import { NgFor } from '@angular/common';
import { NgIf } from '@angular/common';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from "@angular/router";
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-notes-list',
  imports: [NgFor, NgIf, MatDividerModule, MatButtonModule, RouterLink],
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.css',
  standalone: true
})
export class NotesListComponent implements OnInit {
  constructor(private noteService: NotesService, private toastr: ToastrService) {}

  notes: Note[] = [];

  
  ngOnInit(): void {
    this.noteService.subscribe((notesAggiornate) => {
      this.notes = notesAggiornate
    })
  }

    deleteNota(id: number) {
    // console.log();
    this.noteService.deleteNote(id)
    this.toastr.success('Nota eliminata!');

  }
}
