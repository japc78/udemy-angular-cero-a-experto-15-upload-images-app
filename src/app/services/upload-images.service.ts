import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { FileItem } from '../models/file-item.model';

@Injectable({
  providedIn: 'root'
})
export class UploadImagesService {

  private IMAGES_FOLDER = 'img';

  constructor( private db: AngularFirestore ) { }

  uploadImagesFirebase( images: FileItem[]): void {
    console.log(images);
  }

  private saveImage( image: { name: string, url: string }): void {
    this.db.collection(`/${this.IMAGES_FOLDER}`)
      .add( image );
  }
}
