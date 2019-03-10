import { Component, OnInit } from '@angular/core';
import { FieldArrayType, FormlyFormBuilder } from '@ngx-formly/core';

@Component({
  selector: 'app-schema-type',
  templateUrl: './schema-type.component.html',
  styleUrls: ['./schema-type.component.css']
})
export class SchemaTypeComponent extends FieldArrayType implements OnInit {

  constructor(builder: FormlyFormBuilder) {
    super(builder);
  }
  ngOnInit() {
  }

}
