import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ZardAvatarComponent } from 'n/avatar/avatar.component';
import { ZardDropdownModule } from 'n/dropdown/dropdown.module';
import { Authservice } from 'src/app/services/authservice';
import { Habitservice } from 'src/app/services/habitservice';

@Component({
  selector: 'app-navbar',
  imports: [ZardAvatarComponent, ZardDropdownModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  authsevice = inject(Authservice);
  habitservice = inject(Habitservice);
  router = inject(Router);
  readonly zImageDefault = {
    fallback: 'ZA',
  };
  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  onProfile() {
    console.log('Profile clicked');
  }

  onBilling() {
    console.log('Billing clicked');
  }

  onSettings() {
    console.log('Settings clicked');
  }

  onKeyboardShortcuts() {
    console.log('Keyboard shortcuts clicked');
  }

  onTeam() {
    console.log('Team clicked');
  }

  onNewTeam() {
    console.log('New Team clicked');
  }

  onGitHub() {
    console.log('GitHub clicked');
  }

  onSupport() {
    console.log('Support clicked');
  }

  onLogout() {
    this.authsevice.logout().subscribe({
      next: (response: any) => {
        this.habitservice.showSuccessToast('Success', 'Logged out successfully');
        setTimeout(() => {
          this.router.navigateByUrl('login');
        }, 1000);
      },
      error: (error) => {
        this.habitservice.showErrorToast('Error', 'Something went wrong');
        console.log(error);
      },
    });
  }
}
