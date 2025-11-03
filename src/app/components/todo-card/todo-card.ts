import { Component, Input } from '@angular/core';
import { ZardAlertComponent } from 'n/alert/alert.component';
import { ZardButtonComponent } from 'n/button/button.component';
import { ZardIconComponent } from 'n/icon/icon.component';

@Component({
  selector: 'app-todo-card',
  imports: [ZardAlertComponent, ZardButtonComponent, ZardIconComponent],
  templateUrl: './todo-card.html',
  styleUrl: './todo-card.css',
})
export class TodoCard {
  @Input() title!: string;
  @Input() description!: string;
}
