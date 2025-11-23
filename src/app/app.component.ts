import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "./layout/sidebar/sidebar.component";
// import { NotesListComponent } from "./pages/notes-list/notes-list.component";
// import { NoteFormComponent } from "./pages/note-form/note-form.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true

})
export class AppComponent {
  title = 'App-Note';
}
