import { Component } from '@angular/core';
import { ZardButtonComponent } from 'n/button/button.component';
import { AddTodoTrigger } from 'src/app/components/add-todo/add-todo';

@Component({
  selector: 'app-dashboard',
  imports: [ZardButtonComponent, AddTodoTrigger],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {}
