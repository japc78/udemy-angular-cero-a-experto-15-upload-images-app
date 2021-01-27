import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class UploadImagesService {

  private IMAGES_FOLDER = 'img';

  constructor( private db: AngularFirestore ) { }

  private saveImage( image: { name: string, url: string }): void {
    this.db.collection(`/${this.IMAGES_FOLDER}`)
      .add( image );
  }
}
