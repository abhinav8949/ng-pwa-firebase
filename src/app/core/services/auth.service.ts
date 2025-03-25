import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, User, UserCredential } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { onAuthStateChanged } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userData = new BehaviorSubject<User | null>(null);

  constructor(private auth:Auth, private router:Router) { 
    onAuthStateChanged(this.auth, (user) => {
      if(user){
        this.userData.next(user);
        localStorage.setItem('user', JSON.stringify(user));
      }else{
        localStorage.removeItem('user');
      }
    });
  }

  // Sign Up with Email/Password
  async signup(email:string, password:string):Promise<UserCredential>{
    return await createUserWithEmailAndPassword(this.auth, email, password);
  }

  // Login with Email/Password
  async login(email: string, password: string): Promise<UserCredential> {
    return await signInWithEmailAndPassword(this.auth, email, password);
  }

  // Login with Google
  async googleLogin(): Promise<UserCredential> {
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(this.auth, provider);
  }

  async logout(){
    await signOut(this.auth).then(() => {
      localStorage.removeItem('user');
      this.userData.next(null);
      this.router.navigate(['/']);
    }).catch((error) => {
      console.log("Logout Error: "+error);
    });
  }

  getUser(): User | null {
    return this.userData.value || JSON.parse(localStorage.getItem('user') || 'null');
  }

  getUserObservable(){
    return this.userData.asObservable();
  }
}
