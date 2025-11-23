import { Component, OnInit } from '@angular/core';
import {ChangeDetectionStrategy} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { NotesService } from '../../core/notes.service';
import { Note } from '../../model/note';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, NgForm,  } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { ToastrModule, ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-note-form',
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatDividerModule, MatButtonModule, FormsModule, NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './note-form.component.html',
  styleUrl: './note-form.component.css',
  standalone: true
})
export class NoteFormComponent implements OnInit {

  constructor(private noteService: NotesService, private route: ActivatedRoute, private toastr: ToastrService ) {}
  notes: Note[] = [];

  titolo: string = '';
  contenuto: string = '';

  noteId: number | undefined;
  isEdit: boolean = false;
  noteToEdit: Note | undefined;
  isOver: boolean = false;



  ngOnInit(): void {
    this.noteService.subscribe(notesAggiornate => {
      this.notes = notesAggiornate
    } )
   
  this.route.params.subscribe(params => {
    if (params['id']) {
      this.noteId = +params['id']; //il + converte il la stringa in numero
      console.log(this.noteId);
      this.isEdit = true;

      // recupera la nota dal service
      this.noteToEdit = this.noteService.getNoteId(this.noteId);
      console.log(this.noteToEdit)

      if(this.noteToEdit){
        this.titolo = this.noteToEdit.titolo;
        this.contenuto = this.noteToEdit.contenuto
      }
    } else {
      this.isEdit = false;
      this.noteId = undefined;
    }
  });
  }

  addNota(titolo: string, contenuto: string) {
    this.noteService.addNote(titolo,contenuto)
    this.toastr.success('Nota aggiunta!');

  }

  onSubmit(form: NgForm) {
    if (this.isEdit && this.noteId) {
      this.noteService.updateNote(this.noteId,this.titolo,this.contenuto)
      this.toastr.success('Nota modificata!');

            form.reset();
                  this.isEdit = false;

    } else if (form.valid) {
      console.log("prova")
      this.addNota(this.titolo,this.contenuto)
      form.reset();
    }
  }


  onMouseOver() {
  this.isOver = true;
}


}
