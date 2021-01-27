import { Component, OnInit } from '@angular/core';
import { FileItem } from '../../models/file-item.model';
import { UploadImagesService } from '../../services/upload-images.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styles: [
  ]
})
export class UploadComponent implements OnInit {

  files: FileItem[] = [];

  constructor( public uploadImagesService: UploadImagesService) { }

  ngOnInit(): void {
  }

  uploadImages(): void {
    this.uploadImagesService.uploadImagesFirebase(this.files);
  }
}
