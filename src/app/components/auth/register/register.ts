import { Component } from '@angular/core';
import { ZardButtonComponent } from 'n/button/button.component';
import { ZardCardComponent } from 'n/card/card.component';

@Component({
  selector: 'app-register',
  imports: [ZardCardComponent, ZardButtonComponent],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {}
