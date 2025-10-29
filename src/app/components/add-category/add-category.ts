import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { ZardButtonComponent } from 'n/button/button.component';
import { ZardInputDirective } from 'n/input/input.directive';
import { ZardDialogModule } from 'n/dialog/dialog.component';
import { Z_MODAL_DATA, ZardDialogService } from 'n/dialog/dialog.service';
import { AddCategoryFormat } from 'src/app/models/Habit.model';
import { HttpClient } from '@angular/common/http';
import { Habitservice } from 'src/app/services/habitservice';

interface iDialogData {
  name: string;
  username: string;
}

@Component({
  selector: 'app-add-category',
  imports: [FormsModule, ReactiveFormsModule, ZardInputDirective],
  templateUrl: './add-category.html',
  styleUrl: './add-category.css',
})
export class AddCategory {
  private zData: iDialogData = inject(Z_MODAL_DATA);

  form = new FormGroup<AddCategoryFormat>({
    category: new FormControl('', { nonNullable: true, validators: Validators.required }),
  });
}

@Component({
  selector: 'app-add-category-trigger',
  standalone: true,
  imports: [ZardButtonComponent, ZardDialogModule],
  template: ` <button z-button zType="outline" (click)="openDialog()">Add Category</button> `,
})
export class AddCategoryTrigger {
  private dialogService = inject(ZardDialogService);
  habitService = inject(Habitservice);

  openDialog() {
    this.dialogService.create({
      zTitle: 'Add Category',
      zDescription: `Fill the necessary fields and Click save when you're done.`,
      zContent: AddCategory,
      zOkText: 'Save changes',
      zOnOk: (instance) => {
        const formData = instance.form.value;
        this.habitService.addCategory(formData).subscribe({
          next: (response: any) => {
            if (response?.result == true) {
              this.habitService.showSuccessToast('Success', 'Category added successfully');
            }
          },
          error: (error: any) => {
            this.habitService.showErrorToast('Error', 'Something went wrong');
            console.log(error.message);
          },
        });
      },
      zWidth: '425px',
    });
  }
}
