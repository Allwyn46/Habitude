import { Component, HostListener, inject } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { Navbar } from '../navbar/navbar';
import {
  SidebarComponent,
  SidebarGroupComponent,
  SidebarGroupLabelComponent,
} from 'n/layout/sidebar.component';
import { ZardSkeletonComponent } from 'n/skeleton/skeleton.component';
import { ZardButtonComponent } from 'n/button/button.component';
import { ZardIconComponent } from 'n/icon/icon.component';
import { ContentComponent } from 'n/layout/content.component';
import { LayoutComponent } from 'n/layout/layout.component';
import { HeaderComponent } from 'n/layout/header.component';
import { FooterComponent } from 'n/layout/footer.component';
import { Authservice } from 'src/app/services/authservice';
import { Habitservice } from 'src/app/services/habitservice';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    Navbar,
    LayoutComponent,
    HeaderComponent,
    ContentComponent,
    FooterComponent,
    SidebarComponent,
    SidebarGroupComponent,
    SidebarGroupLabelComponent,
    ZardButtonComponent,
    ZardSkeletonComponent,
    ZardIconComponent,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  year = new Date().getFullYear();

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
