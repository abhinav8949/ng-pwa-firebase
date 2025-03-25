import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  private isOfflineSubject = new BehaviorSubject<boolean>(!navigator.onLine);
  private showOnlineBannerSubject = new BehaviorSubject<boolean>(false);

  isOffline$ = this.isOfflineSubject.asObservable();
  shownOnlineBanner$ = this.showOnlineBannerSubject.asObservable();

  constructor(private ngZone: NgZone) {
    window.addEventListener('online', () => this.updateNetworkStatus(false));
    window.addEventListener('offline', () => this.updateNetworkStatus(true));
    
    if (!this.isOfflineSubject.value) {
      this.showOnlineMessage();
    }
  }

  private updateNetworkStatus(status: boolean) {
    this.ngZone.run(() => {
      this.isOfflineSubject.next(status);
      if (!status) {
        this.showOnlineMessage();
      }
    });
  }

  private showOnlineMessage() {
    this.showOnlineBannerSubject.next(true);
    setTimeout(() => {
      this.ngZone.run(() => {
        this.showOnlineBannerSubject.next(false);
      });
    }, 2000);
  }
}
