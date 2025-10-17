import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ZardButtonComponent } from 'n/button/button.component';
import { ZardCardComponent } from 'n/card/card.component';
import { Digitsonly } from 'src/app/directives/digitsonly';
import { Verify2faFormat } from 'src/app/models/Habit.model';
import { Authservice } from 'src/app/services/authservice';
import { Habitservice } from 'src/app/services/habitservice';

@Component({
  selector: 'app-verify2fa',
  imports: [ZardCardComponent, ZardButtonComponent, ReactiveFormsModule, Digitsonly],
  templateUrl: './verify2fa.html',
  styleUrl: './verify2fa.css',
})
export class Verify2fa {
  router = inject(Router);
  habitservice = inject(Habitservice);
  authservice = inject(Authservice);

  verifyForm: FormGroup = new FormGroup<Verify2faFormat>({
    token: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  handleVerification() {
    const formdata = this.verifyForm.value;
    this.authservice.verify2fa(formdata).subscribe({
      next: () => {
        this.habitservice.showSuccessToast('Success', 'Verified Successfully');
        setTimeout(() => {
          this.router.navigateByUrl('dashboard');
        }, 1000);
      },
      error: (error) => {
        this.habitservice.showErrorToast('Error', 'Something went wrong');
        console.log(error);
      },
    });
  }

  handleReset() {}
}
