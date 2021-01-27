import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import 'firebase/storage';
import { FileItem } from '../models/file-item.model';

@Injectable({
  providedIn: 'root'
})
export class UploadImagesService {

  private IMAGES_FOLDER = 'img';

  constructor( private db: AngularFirestore ) { }

  uploadImagesFirebase( images: FileItem[]): void {
    // console.log(images);

    console.log('Pasa 1');

    // Referencia al store de firebase
    const storageRef = firebase.storage().ref();

    console.log('Pasa 2');

    for (const image of images) {
      image.isUploading = true;
      if (image.progress >= 100 ) {
        continue;
      }

      const uploadTask: firebase.storage.UploadTask =
        storageRef.child(`${this.IMAGES_FOLDER}/${image.fileName}`)
        .put(image.file);

      uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED,
        ( snapshot: firebase.storage.UploadTaskSnapshot ) => {
          image.progress = ( snapshot.bytesTransferred / snapshot.totalBytes ) * 100;
          console.log('snapshot.totalBytes: ' + snapshot.totalBytes);
          console.log('snapshot.bytesTransferred: ' + snapshot.bytesTransferred);
          console.log(image.progress);
        },

        ( error ) => console.error('Error to upload', error),
        () => {
          console.log('File upload correctly');
          uploadTask.snapshot.ref.getDownloadURL().then( (url: string) => {
              image.url = url;
              image.isUploading = false;
              this.saveImage( {
                name: image.fileName,
                url: image.url
              });
            });
        }
      );
    }
  }

  private saveImage( image: { name: string, url: string }): void {
    console.log(image);
    this.db.collection(`/${this.IMAGES_FOLDER}`)
      .add( image );
  }
}
