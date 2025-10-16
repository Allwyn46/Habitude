import { CommonModule } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ZardAvatarComponent } from 'n/avatar/avatar.component';
import { ZardDropdownModule } from 'n/dropdown/dropdown.module';
import { Authservice } from 'src/app/services/authservice';
import { Habitservice } from 'src/app/services/habitservice';

@Component({
  selector: 'app-navbar',
  imports: [ZardAvatarComponent, ZardDropdownModule, CommonModule, RouterLink],
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

  isOpen = false;

  toggleDropdown(event: MouseEvent) {
    event.stopPropagation(); // Prevent body click from immediately closing
    this.isOpen = !this.isOpen;
  }

  // Close dropdown when clicking outside
  @HostListener('document:click')
  closeDropdown() {
    this.isOpen = false;
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

  onProfile() {
    this.router.navigateByUrl('profile');
  }
}
