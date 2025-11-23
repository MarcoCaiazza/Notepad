import { Routes } from '@angular/router';
import { NotesListComponent } from './pages/notes-list/notes-list.component';
import { NoteFormComponent } from './pages/note-form/note-form.component';

export const routes: Routes = [
    {path:"notes", component: NotesListComponent},
    {path:"notes/new", component: NoteFormComponent},
    {path:"notes/:id/edit", component: NoteFormComponent},
    {path:"", component: NoteFormComponent}
];
