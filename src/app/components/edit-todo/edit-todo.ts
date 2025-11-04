import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ZardButtonComponent } from 'n/button/button.component';
import { ZardSheetModule } from 'n/sheet/sheet.module';
import { ZardSheetService } from 'n/sheet/sheet.service';
import { map, Observable } from 'rxjs';
import { AddTodoFormat } from 'src/app/models/Habit.model';
import { Authservice } from 'src/app/services/authservice';
import { Habitservice } from 'src/app/services/habitservice';

@Component({
  selector: 'app-edit-todo',
  imports: [AsyncPipe, ReactiveFormsModule],
  templateUrl: './edit-todo.html',
  styleUrl: './edit-todo.css',
})
export class EditTodo implements OnInit {
  habitservice = inject(Habitservice);
  authservice = inject(Authservice);
  CategoryList$: Observable<any[]> = new Observable<any[]>();

  loggedinUser: any;

  user = {
    name: '',
    id: '',
  };

  constructor() {
    this.authservice.status().subscribe({
      next: (response: any) => {
        this.form.get('userid')?.setValue(response.userid);
      },
      error: (error: any) => {
        console.log('error', error);
      },
    });
  }

  ngOnInit(): void {
    this.CategoryList$ = this.habitservice.getallCategory().pipe(
      map((response: any) => {
        const category = response.Categories;
        return Array.isArray(category) ? category : [category];
      }),
    );
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
  selector: 'app-edit-todo-trigger',
  standalone: true,
  imports: [ZardButtonComponent, ZardSheetModule],
  template: `
    <button z-button zType="ghost" (click)="openSheet()" class="absolute top-1 right-28 z-50">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-pencil-icon lucide-pencil"
      >
        <path
          d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"
        />
        <path d="m15 5 4 4" />
      </svg>
    </button>
  `,
})
export class EditTodoTrigger {
  private sheetService = inject(ZardSheetService);
  habitService = inject(Habitservice);

  locationReload() {
    window.location.reload();
  }

  openSheet() {
    this.sheetService.create({
      zTitle: 'Add Todo',
      zDescription: `Fill out the below data and Click save when you're done.`,
      zContent: EditTodo,
      zOkText: 'Save changes',
      zOnOk: (instance) => {
        const formdata = instance.form.value;
        this.habitService.addtodo(formdata).subscribe({
          next: (response: any) => {
            if (response?.result == true) {
              this.habitService.showSuccessToast('Success', 'Todo Added Successfully');
              this.locationReload();
            }
          },
        });
      },
    });
  }
}
