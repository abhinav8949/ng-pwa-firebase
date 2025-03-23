import { inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { CanActivateFn, Router } from '@angular/router';
import { Observable } from 'rxjs';

export const authReverseGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);
  
  return new Observable<boolean>((subscriber)=>{
    auth.onAuthStateChanged((user)=>{
      if(user){
        router.navigate(['/home']);
        subscriber.next(false);
      }else{
        subscriber.next(true);
      }
      subscriber.complete();
    })
  })
};
