import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ZardButtonComponent } from 'n/button/button.component';
import { UpdateUserFormat } from 'src/app/models/Habit.model';
import { Authservice } from 'src/app/services/authservice';
import { Habitservice } from 'src/app/services/habitservice';

@Component({
  selector: 'app-profile',
  imports: [ZardButtonComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  authservice = inject(Authservice);
  habitservice = inject(Habitservice);

  is2faactive = false;
  loggedinuser = '';
  loggedinusername = '';

  profileForm: FormGroup = new FormGroup<UpdateUserFormat>({
    name: new FormControl('', { nonNullable: true, validators: Validators.required }),
    username: new FormControl(this.loggedinuser, { nonNullable: true }),
    id: new FormControl('', { nonNullable: true }),
  });

  ngOnInit(): void {
    this.authservice.status().subscribe({
      next: (response: any) => {
        if (response?.ismfaactive == true) {
          this.is2faactive = true;
          this.loggedinuser = response?.username;
          this.loggedinusername = response?.name;
          this.profileForm.get('username')?.setValue(response?.username);
          this.profileForm.get('id')?.setValue(response?.userid);
        } else {
          this.is2faactive = false;
        }
      },
    });
  }

  handleUpdate() {
    const formData = this.profileForm.value;
    this.authservice.update(formData).subscribe({
      next: (response: any) => {
        if (response?.result == true) {
          this.habitservice.showSuccessToast('Success', response?.message);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      },
      error: (error) => {
        this.habitservice.showErrorToast('Error', 'Something went wrong');
        console.log(error);
      },
    });
  }
}
