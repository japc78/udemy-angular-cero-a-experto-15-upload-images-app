import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ImagesComponent } from './components/images/images.component';
import { UploadComponent } from './components/upload/upload.component';
import { APP_ROUTES } from './app.routes';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UploadImagesService } from './services/upload-images.service';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    ImagesComponent,
    UploadComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    APP_ROUTES
  ],
  providers: [
    UploadImagesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
