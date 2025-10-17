import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ZardButtonComponent } from 'n/button/button.component';
import { Authservice } from 'src/app/services/authservice';

@Component({
  selector: 'app-profile',
  imports: [ZardButtonComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  profileForm: FormGroup = new FormGroup({});
  authservice = inject(Authservice);

  is2faactive = false;

  ngOnInit(): void {
    this.authservice.status().subscribe({
      next: (response: any) => {
        if (response?.ismfaactive == true) {
          this.is2faactive = true;
        } else {
          this.is2faactive = false;
        }
      },
    });
  }
}
