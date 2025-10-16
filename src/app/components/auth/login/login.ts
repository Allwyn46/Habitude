import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ZardButtonComponent } from 'n/button/button.component';
import { ZardCardComponent } from 'n/card/card.component';
import { LoginFormat } from 'src/app/models/Habit.model';
import { Authservice } from 'src/app/services/authservice';
import { Habitservice } from 'src/app/services/habitservice';

@Component({
  selector: 'app-login',
  imports: [ZardCardComponent, ZardButtonComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  authservice = inject(Authservice);
  habitservice = inject(Habitservice);
  router = inject(Router);

  loginForm: FormGroup = new FormGroup<LoginFormat>({
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  onLogin() {
    const formData = this.loginForm.value;
    this.authservice.login(formData).subscribe({
      next: (response: any) => {
        this.habitservice.showSuccessToast('Success', response?.message);
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
}
