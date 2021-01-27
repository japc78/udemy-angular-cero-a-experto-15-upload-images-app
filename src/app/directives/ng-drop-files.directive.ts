import { Directive, EventEmitter, ElementRef,
  HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

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

}
