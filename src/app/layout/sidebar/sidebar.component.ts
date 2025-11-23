import { Component } from '@angular/core';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from "@angular/router";
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  imports: [MatDividerModule, MatButtonModule, RouterLink,RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

}
