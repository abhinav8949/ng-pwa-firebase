import { ApplicationConfig, provideZoneChangeDetection, isDevMode, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app'
import { provideAuth, getAuth } from '@angular/fire/auth'
import { provideFirestore, initializeFirestore, persistentLocalCache } from '@angular/fire/firestore';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';
import { environment } from '../environments/environment';
import { provideServiceWorker } from '@angular/service-worker';
import { ReactiveFormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { NgxApexchartsModule } from "ngx-apexcharts";

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes),
  provideHttpClient(),
    ReactiveFormsModule,
  provideAnimations(), // required animations providers
  provideToastr(),
  importProvidersFrom(NgxApexchartsModule),

  // Firebase Providers
  provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
  provideAuth(() => getAuth()),
  // provideFirestore(() => getFirestore()),
  provideFirestore(() => {
    return initializeFirestore(initializeApp(environment.firebaseConfig), {
      localCache: persistentLocalCache()
    });
  }),
  provideMessaging(() => getMessaging()),
  provideServiceWorker('ngsw-worker.js', {
    enabled: !isDevMode(),
    registrationStrategy: 'registerWhenStable:30000'
  }), provideServiceWorker('ngsw-worker.js', {
    enabled: !isDevMode(),
    registrationStrategy: 'registerWhenStable:30000'
  })

  ]
};
