import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { User } from 'firebase/auth';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  userEmail: string | null = null;
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private toast: ToastrService) { }

  ngOnInit(): void {
    this.authService.getUserObservable().subscribe((user: User | null) => {
      this.isLoggedIn = !!user;
      this.userEmail = user?.email || null;
    });
  }

  logout() {
    localStorage.removeItem('budgetNotifications');
    localStorage.clear();
    sessionStorage.clear();
    this.authService.logout();
    this.toast.info(`${this.userEmail} logged out successfully.`, 'info')
  }
}
