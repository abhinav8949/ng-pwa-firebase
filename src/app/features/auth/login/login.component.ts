import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService:AuthService, private router:Router) { }

  async login(){
    try {
      await this.authService.login(this.email, this.password);
      this.router.navigate(['/home/']);
    } catch (error:any) {
      this.errorMessage = error.message;
    }  
    
  }

  async loginWithGoogle(){
    try {
      await this.authService.googleLogin();
      this.router.navigate(['/home/']);
    } catch (error:any) {
      this.errorMessage = error.message;
    }
  }
  
}
