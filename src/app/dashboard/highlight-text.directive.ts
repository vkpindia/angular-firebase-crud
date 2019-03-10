import { Directive, Input, ElementRef, AfterViewChecked } from '@angular/core';

@Directive({
  selector: '[appHighlightText]'
})
export class HighlightTextDirective implements AfterViewChecked {
  @Input() color = 'white';
  private dom: any = null;
  constructor(ui: ElementRef) {
      this.dom = ui.nativeElement;
  }
  ngAfterViewChecked() {
      const firstName = this.dom.innerText;
      if (firstName.indexOf('text') < 0) { return; }
      this.dom.style.backgroundColor = this.color;
  }

}
