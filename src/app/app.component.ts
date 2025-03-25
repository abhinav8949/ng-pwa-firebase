import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NetworkService } from './core/services/network.service';
import { FirebaseMessagingService } from './core/services/firebase-messaging.service';

@Component({
  selector: 'app-root',
  imports: [RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'expense-tracker';
  
  isOffline$;
  showOnlineBanner$;

  constructor(private readonly networkService:NetworkService,
              private fcmService:FirebaseMessagingService
  ){
    this.isOffline$ = this.networkService.isOffline$;  // ✅ Assign inside constructor
    this.showOnlineBanner$ = this.networkService.shownOnlineBanner$;  // ✅ Assign inside constructor
  }

  ngOnInit(): void {
    this.fcmService.requestPermission();
    this.fcmService.listenForMessages()
  }

  deferredPrompt: any;
  showInstallButton = false;

  @HostListener('window:beforeinstallprompt', ['$event'])
  onBeforeInstallPrompt(event: any) {
    event.preventDefault();
    this.deferredPrompt = event;
    this.showInstallButton = true;
  }

  installPWA() {
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      this.deferredPrompt.userChoice.then(() => {
        this.deferredPrompt = null;
        this.showInstallButton = false;
      });
    }
  }
}
