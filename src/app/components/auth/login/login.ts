import { Component } from '@angular/core';
import { ZardButtonComponent } from 'n/button/button.component';
import { ZardCardComponent } from 'n/card/card.component';

@Component({
  selector: 'app-login',
  imports: [ZardCardComponent, ZardButtonComponent],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {}
