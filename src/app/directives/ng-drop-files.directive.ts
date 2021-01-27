import { FileItem } from '../models/file-item.model';
import { Directive, EventEmitter, ElementRef,
  HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  @Input() files: FileItem[] = [];
  @Output() mouseHover: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  @HostListener('dragover', ['$event'] )
  public onDragEnter( event: any ): void {
    this.mouseHover.emit(true);
  }
  @HostListener('dragleave', ['$event'] )
  public onDragLeave( event: any ): void {
    this.mouseHover.emit(false);
  }

  // VAlidaciones
  // Valida que el archivo pueda ser cargado
  private fileCanUpload(file: File): boolean {
    if (!this.noDuplicateFiles(file.name) && this.isImage(file.type)) {
      return true;
    } else {
      return false;
    }
  }

  // Evita que el navegador al arrastrar la imagen encima, se abra la imagen el navegador.
  private preventOpenImagenInBrowser( event: Event ): void {
    event.preventDefault();
    event.stopPropagation();
  }

  // No haya archivos duplicados
  private noDuplicateFiles( filename: string ): boolean {
    for (const file of this.files) {
      if ( file.fileName === filename) {
        console.log(`File exist: ${filename}`);
        return true;
      }
    }
    return false;
  }

  // Validar que solo suban imágenes
  private isImage( typeFile: string): boolean {
    return (typeFile === '' || typeFile === undefined)
      ? false
      // Devuelve un 1 si la encuentra o -1 sino la encuentra (-1 javascript lo toma como false)
      : typeFile.startsWith('image');
  }
}
