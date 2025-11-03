import { Component, Input } from '@angular/core';
import { ZardAlertComponent } from 'n/alert/alert.component';

@Component({
  selector: 'app-todo-card',
  imports: [ZardAlertComponent],
  templateUrl: './todo-card.html',
  styleUrl: './todo-card.css',
})
export class TodoCard {
  @Input() title!: string;
  @Input() description!: string;
}
