import { Component,  ViewContainerRef, ViewChild } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'app-horizontal-wrapper',
  templateUrl: './horizontal-wrapper.component.html',
})
export class HorizontalWrapperComponent extends FieldWrapper {

  @ViewChild('fieldComponent', { read: ViewContainerRef }) fieldComponent: ViewContainerRef;
}
