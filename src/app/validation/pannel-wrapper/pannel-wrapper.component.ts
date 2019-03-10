import { Component, ViewChild, ViewContainerRef, OnInit } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';


@Component({
  selector: 'app-pannel-wrapper',
  templateUrl: './pannel-wrapper.component.html',
  styleUrls: ['./pannel-wrapper.component.css']
})
export class PannelWrapperComponent extends FieldWrapper implements OnInit {

  @ViewChild('fieldComponent', {read: ViewContainerRef}) fieldComponent: ViewContainerRef;

  ngOnInit() {
  }

}
