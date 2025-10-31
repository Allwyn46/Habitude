import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ZardAlertComponent } from 'n/alert/alert.component';
import { ZardButtonComponent } from 'n/button/button.component';
import { AddTodoTrigger } from 'src/app/components/add-todo/add-todo';
import { Authservice } from 'src/app/services/authservice';
import { Habitservice } from 'src/app/services/habitservice';

@Component({
  selector: 'app-dashboard',
  imports: [ZardButtonComponent, AddTodoTrigger, CommonModule, ZardAlertComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  authservice = inject(Authservice);
  habitService = inject(Habitservice);
  userid = '';
  todos: any[] = [];

  constructor() {
    this.authservice.status().subscribe({
      next: (response: any) => {
        this.userid = response.userid;
        this.habitService.getalltodo(response).subscribe({
          next: (response: any) => {
            this.todos = Array.isArray(response.todos) ? response.todos : [response.todos];
          },
          error: (error: any) => {
            console.log('error', error);
          },
        });
      },
      error: (error: any) => {
        console.log('error', error);
      },
    });
  }
}
