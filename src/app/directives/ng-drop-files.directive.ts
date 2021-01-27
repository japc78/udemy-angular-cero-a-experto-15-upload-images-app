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

  // Eventos
  @HostListener('dragover', ['$event'] )
  public onDragEnter( event: any ): void {
    this.mouseHover.emit(true);
    this.preventOpenImagenInBrowser(event);
  }

  @HostListener('dragleave', ['$event'] )
  public onDragLeave( event: any ): void {
    this.mouseHover.emit(false);
  }

  @HostListener('drop', ['$event'] )
  public onDrop( event: any ): void {
    // Se captura el modo de transferencia del navegador
    const transfer = this.getTransfer(event);

    if (!transfer) {
      return;
    }

    this.pullFiles(transfer.files);
    this.preventOpenImagenInBrowser(event);
    this.mouseHover.emit(false);
  }

  // Nos ayuda a compatibilidad e la aplicación
  // Hay navegadores que interpretan de manera diferente el drag&Drop
  private getTransfer( event: any): DataTransfer {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  // Para extraer los archivos.
  private pullFiles(fileList: FileList): void{
    console.log(fileList);

    // Filelist devuelve una lista de objetos. Es necesario pasarlos a array.

    for (const property of Object.getOwnPropertyNames(fileList)) {
      console.log(property);

      const fileTemp = fileList[Number(property)];
      console.log(fileTemp);

      if (this.fileCanUpload(fileTemp)) {
        const newFile = new FileItem( fileTemp );
        this.files.push(newFile);
      }
    }
    console.log(this.files);
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
