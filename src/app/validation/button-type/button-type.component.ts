import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'app-button-type',
  templateUrl: './button-type.component.html',
})
export class ButtonTypeComponent extends FieldType implements OnInit {

  constructor() {
    super();
   }

  onClick($event) {
    if (this.to.onClick) {
      this.to.onClick($event);
    }
  }


  ngOnInit() {
  }

}
