import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ZardButtonComponent } from 'n/button/button.component';
import { Authservice } from 'src/app/services/authservice';
import { ZardAlertComponent } from 'n/alert/alert.component';
import { Habitservice } from 'src/app/services/habitservice';

@Component({
  selector: 'app-setup2fa',
  imports: [ZardButtonComponent, ZardAlertComponent],
  templateUrl: './setup2fa.html',
  styleUrl: './setup2fa.css',
})
export class Setup2fa implements OnInit {
  router = inject(Router);
  authservice = inject(Authservice);
  habitservice = inject(Habitservice);

  imageUrl = '';
  tokenSecret = '';

  copyclipboard(value: any) {
    navigator.clipboard.writeText(value);
    this.habitservice.showSuccessToast('Success', 'Text copied to clipboard');
  }

  onSetupComplete() {
    this.router.navigateByUrl('/verify-2fa');
  }

  ngOnInit(): void {
    this.authservice.setup2fa().subscribe({
      next: (response: any) => {
        this.imageUrl = response?.qrcode;
        this.tokenSecret = response?.secret;
      },
      error: (error) => {
        alert('something went wrong');
        console.log(error);
      },
    });
  }
}
