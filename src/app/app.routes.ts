import { Routes, RouterModule } from '@angular/router';
import { ImagesComponent } from './components/images/images.component';
import { UploadComponent } from './components/upload/upload.component';

const ROUTES: Routes = [
    { path: 'images', component: ImagesComponent },
    { path: 'upload', component: UploadComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'images'}
];

export const APP_ROUTES = RouterModule.forRoot(ROUTES);
