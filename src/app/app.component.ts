import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { RouterModule } from '@angular/router';
import { NetworkService } from './core/services/network.service';

@Component({
  selector: 'app-root',
  imports: [RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'expense-tracker';
  
  isOffline$;
  showOnlineBanner$;

  constructor(private readonly networkService:NetworkService){
    this.isOffline$ = this.networkService.isOffline$;  // ✅ Assign inside constructor
    this.showOnlineBanner$ = this.networkService.shownOnlineBanner$;  // ✅ Assign inside constructor
  }
}
