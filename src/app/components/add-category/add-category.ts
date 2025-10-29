import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ZardButtonComponent } from 'n/button/button.component';
import { ZardInputDirective } from 'n/input/input.directive';
import { ZardDialogModule } from 'n/dialog/dialog.component';
import { Z_MODAL_DATA, ZardDialogService } from 'n/dialog/dialog.service';

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

  form = new FormGroup({
    name: new FormControl('Pedro Duarte'),
    username: new FormControl('@peduarte'),
  });

  constructor() {
    if (this.zData) this.form.patchValue(this.zData);
  }
}

@Component({
  selector: 'app-add-category-trigger',
  standalone: true,
  imports: [ZardButtonComponent, ZardDialogModule],
  template: ` <button z-button zType="outline" (click)="openDialog()">Add Category</button> `,
})
export class ZardDemoDialogBasicComponent {
  private dialogService = inject(ZardDialogService);

  openDialog() {
    this.dialogService.create({
      zTitle: 'Edit Profile',
      zDescription: `Make changes to your profile here. Click save when you're done.`,
      zContent: AddCategory,
      zData: {
        name: 'Samuel Rizzon',
        username: '@samuelrizzondev',
      } as iDialogData,
      zOkText: 'Save changes',
      zOnOk: (instance) => {
        console.log('Form submitted:', instance.form.value);
      },
      zWidth: '425px',
    });
  }
}
