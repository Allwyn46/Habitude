import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ZardButtonComponent } from 'n/button/button.component';
import { ZardCardComponent } from 'n/card/card.component';
import { RegisterFormat } from 'src/app/models/Habit.model';
import { Authservice } from 'src/app/services/authservice';
import { Habitservice } from 'src/app/services/habitservice';

@Component({
  selector: 'app-register',
  imports: [ZardCardComponent, ZardButtonComponent, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  authservice = inject(Authservice);
  habitservice = inject(Habitservice);
  router = inject(Router);

  passwordMatchValidator(): ValidatorFn {
    return (form: AbstractControl) => {
      const password = form.get('password')?.value;
      const confirmPassword = form.get('confirmPassword')?.value;
      if (password !== confirmPassword) {
        form.get('confirmPassword')?.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      }
      return null;
    };
  }

  registerForm: FormGroup = new FormGroup<RegisterFormat>(
    {
      username: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      confirmPassword: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      ismfaactive: new FormControl(false, { nonNullable: true }),
    },
    { validators: this.passwordMatchValidator() },
  );

  onregister() {
    const formdata = this.registerForm.value;
    this.authservice.register(formdata).subscribe({
      next: (response: any) => {
        this.habitservice.showSuccessToast('Success', response?.message);
        setTimeout(() => {
          this.router.navigateByUrl('login');
        }, 1000);
      },
      error: (eror) => {
        console.log(eror);
        this.habitservice.showErrorToast('Error', 'Something went wrong');
      },
    });
  }
}
