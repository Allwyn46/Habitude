import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ZardButtonComponent } from 'n/button/button.component';
import { Z_MODAL_DATA, ZardSheetService } from 'n/sheet/sheet.service';
import { ZardInputDirective } from 'n/input/input.directive';
import { ZardSheetModule } from 'n/sheet/sheet.module';
import { AddTodoFormat } from 'src/app/models/Habit.model';
import { Habitservice } from 'src/app/services/habitservice';
import { map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-add-todo',
  imports: [FormsModule, ReactiveFormsModule, ZardInputDirective, AsyncPipe],
  templateUrl: './add-todo.html',
  styleUrl: './add-todo.css',
})
export class AddTodo implements OnInit {
  /*  private zData: iSheetData = inject(Z_MODAL_DATA); */
  habitservice = inject(Habitservice);
  CategoryList$: Observable<any[]> = new Observable<any[]>();

  loggedinUser: any;

  user = {
    name: '',
    id: '',
  };

  ngOnInit(): void {
    this.CategoryList$ = this.habitservice.getallCategory().pipe(
      map((response: any) => {
        const category = response.Categories;
        return Array.isArray(category) ? category : [category];
      }),
    );

    if (this.loggedinUser) {
      this.user = {
        name: this.loggedinUser.employeeName,
        id: this.loggedinUser.employeeId,
      };
      this.form.get('userid')?.setValue(this.user.id);
    }
  }

  constructor() {
    const userString = localStorage.getItem('loggedinUser');
    if (userString) {
      this.loggedinUser = JSON.parse(userString);
    }
  }

  public form = new FormGroup<AddTodoFormat>({
    userid: new FormControl('', { nonNullable: true }),
    title: new FormControl('', { nonNullable: true, validators: Validators.required }),
    description: new FormControl('', { nonNullable: true, validators: Validators.required }),
    category: new FormControl('', { nonNullable: true, validators: Validators.required }),
    date: new FormControl('', { nonNullable: true, validators: Validators.required }),
  });
}

@Component({
  selector: 'app-add-todo-trigger',
  standalone: true,
  imports: [ZardButtonComponent, ZardSheetModule],
  template: ` <button z-button (click)="openSheet()">Add Todo</button> `,
})
export class AddTodoTrigger {
  private sheetService = inject(ZardSheetService);
  habitService = inject(Habitservice);

  openSheet() {
    this.sheetService.create({
      zTitle: 'Add Todo',
      zDescription: `Fill out the below data and Click save when you're done.`,
      zContent: AddTodo,
      zOkText: 'Save changes',
      zOnOk: (instance) => {
        const formdata = instance.form.value;
        this.habitService.addtodo(formdata).subscribe({
          next: (response: any) => {
            if (response?.result == true) {
              this.habitService.showSuccessToast('Success', 'Todo Added Successfully');
            }
          },
        });
      },
    });
  }
}
