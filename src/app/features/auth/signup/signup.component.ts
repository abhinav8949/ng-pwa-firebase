import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-signup',
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  email: string='';
  password: string='';
  confirmPassword: string='';
  errorMessages: string='';

  constructor(private authService:AuthService, private router:Router) {}

  async signUp() {
    if(this.password !== this.confirmPassword) {
      this.errorMessages = 'Passwords do not match';
      return;
    }
    try {
      await this.authService.signup(this.email, this.password);
      this.router.navigate(['/']);
    } catch(error: any) {
      this.errorMessages = error.message;
    }    
  }

}
