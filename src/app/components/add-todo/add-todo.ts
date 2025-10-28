import { Component, inject } from '@angular/core';
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

@Component({
  selector: 'app-add-todo',
  imports: [FormsModule, ReactiveFormsModule, ZardInputDirective],
  templateUrl: './add-todo.html',
  styleUrl: './add-todo.css',
})
export class AddTodo {
  /*  private zData: iSheetData = inject(Z_MODAL_DATA); */

  public form = new FormGroup<AddTodoFormat>({
    userid: new FormControl('', { nonNullable: true }),
    title: new FormControl('', { nonNullable: true, validators: Validators.required }),
    description: new FormControl('', { nonNullable: true, validators: Validators.required }),
    category: new FormControl('', { nonNullable: true, validators: Validators.required }),
    date: new FormControl('', { nonNullable: true, validators: Validators.required }),
  });

  // constructor() {
  //   if (this.zData) this.form.patchValue(this.zData);
  // }
}

@Component({
  selector: 'app-add-todo-trigger',
  standalone: true,
  imports: [ZardButtonComponent, ZardSheetModule],
  template: ` <button z-button (click)="openSheet()">Add Todo</button> `,
})
export class AddTodoTrigger {
  private sheetService = inject(ZardSheetService);

  openSheet() {
    this.sheetService.create({
      zTitle: 'Add Todo',
      zDescription: `Fill out the below data and Click save when you're done.`,
      zContent: AddTodo,
      zOkText: 'Save changes',
      zOnOk: (instance) => {
        console.log('Form submitted:', instance.form.value);
      },
    });
  }
}
