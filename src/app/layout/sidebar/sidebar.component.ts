import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { User } from 'firebase/auth';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
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
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, logout"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('budgetNotifications');
        localStorage.clear();
        sessionStorage.clear();
        this.authService.logout();
        this.toast.info(`${this.userEmail} logged out successfully.`, 'info')
        Swal.fire("Logged Out!", "You have been successfully logged out.", "success");
      }
    });
  }
}
