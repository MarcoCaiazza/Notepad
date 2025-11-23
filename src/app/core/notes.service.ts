import { Injectable } from '@angular/core';
import { Note } from '../model/note';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private notes: Note[] = []; // array di note
  private callbacks: ((notes: Note[]) => void)[] = []; // array di funzioni - contiene le funzioni che ricevono le note

  constructor() { 

    let storageNotes = localStorage.getItem("notes")
    if(storageNotes != null) {
      this.notes = JSON.parse(storageNotes)
    } else {
      this.notes = []
    }
  }

 

// Metodo che accetta una funzione come parametro (callback), che a sua volta accetta array di oggetti (note) e non restituisce nulla
  subscribe(callback: (notes: Note[]) => void) { // Sottoscrive 
    this.callbacks.push(callback) // aggiunge la funzione di callback nell'array di callbacks
    callback(this.notes) // chiama la callback comunicare con i componenti
  }

  // emitNotes() è il collegamento tra i metodi di gestione e i componenti
  emitNotes() {
    for (let i = 0; i < this.callbacks.length; i++) { // itero array di callback
      this.callbacks[i](this.notes) // ogni callback viene richiamata con le note aggiornate
    }
  }

  newNota: Note | undefined;

   addNote(titolo: string, contenuto: string) {
    let date = new Date();
    let dataFormat = date.toLocaleString() 

    this.newNota = {
      id: !this.notes.length ? 1 : this.notes[this.notes.length - 1].id + 1,
      titolo: titolo,
      contenuto: contenuto,
      data: dataFormat
      }

     this.notes.push(this.newNota);
     localStorage.setItem("notes", JSON.stringify(this.notes));
     this.emitNotes();
  }

  updateNota: Note | undefined;

  updateNote(id:number, titolo:string, contenuto:string) {
        let date = new Date();
    let dataFormat = date.toLocaleString() 

    let indexNote: number | undefined;
          for (let i = 0; i < this.notes.length; i++) {
        if (this.notes[i].id === id) {
          indexNote = i;
          break;
        }
      }
        if (indexNote !== undefined) {
    this.updateNota = {
      id: this.notes[indexNote].id, 
      titolo: titolo,
      contenuto: contenuto,
      data: dataFormat
    };
    
    this.notes[indexNote] = this.updateNota;
     localStorage.setItem("notes", JSON.stringify(this.notes));
    this.emitNotes();
  };
}


deleteNote(id:number) {
  let indexNoteDelete: number | undefined;

          for (let i = 0; i < this.notes.length; i++) {
        if (this.notes[i].id === id) {
          indexNoteDelete = i;
          break;
        }
      }
        if (indexNoteDelete !== undefined) {
    this.notes.splice(indexNoteDelete, 1)
    localStorage.setItem("notes", JSON.stringify(this.notes));
    this.emitNotes();
}

}


getNoteId(id:number){
  return this.notes.find(noteId => noteId.id === id)
}

    }
  
