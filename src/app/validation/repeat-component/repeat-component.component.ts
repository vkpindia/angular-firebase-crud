import { Component } from '@angular/core';
import { FieldArrayType, FormlyFormBuilder } from '@ngx-formly/core';

@Component({
  selector: 'app-repeat-component',
  templateUrl: './repeat-component.component.html',
  styleUrls: ['./repeat-component.component.css']
})
export class RepeatComponentComponent extends FieldArrayType {

  constructor(builder: FormlyFormBuilder) {
    super(builder);
  }
}
