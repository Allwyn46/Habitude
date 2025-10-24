import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ZardButtonComponent } from 'n/button/button.component';
import { Z_MODAL_DATA, ZardSheetService } from 'n/sheet/sheet.service';
import { ZardInputDirective } from 'n/input/input.directive';
import { ZardSheetModule } from 'n/sheet/sheet.module';

interface iSheetData {
  name: string;
  username: string;
}

@Component({
  selector: 'app-add-todo',
  imports: [FormsModule, ReactiveFormsModule, ZardInputDirective],
  templateUrl: './add-todo.html',
  styleUrl: './add-todo.css',
})
export class AddTodo {
  private zData: iSheetData = inject(Z_MODAL_DATA);

  public form = new FormGroup({
    name: new FormControl('Matheus Ribeiro'),
    username: new FormControl('@ribeiromatheus.dev'),
  });

  constructor() {
    if (this.zData) this.form.patchValue(this.zData);
  }
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
      zTitle: 'Edit profile',
      zDescription: `Make changes to your profile here. Click save when you're done.`,
      zContent: AddTodo,
      zData: {
        name: 'Matheus Ribeiro',
        username: '@ribeiromatheus.dev',
      } as iSheetData,
      zOkText: 'Save changes',
      zOnOk: (instance) => {
        console.log('Form submitted:', instance.form.value);
      },
    });
  }
}
