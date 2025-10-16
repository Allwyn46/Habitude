import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ZardButtonComponent } from 'n/button/button.component';

@Component({
  selector: 'app-profile',
  imports: [ZardButtonComponent, ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  profileForm: FormGroup = new FormGroup({});
}
