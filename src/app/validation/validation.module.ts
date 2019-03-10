import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';

import { ValidationRoutingModule } from './validation-routing.module';
import { FormValidationComponent } from './form-validation/form-validation.component';
import { FormlyFieldFileComponent } from './formly-field-file/formly-field-file.component';
import { PannelWrapperComponent } from './pannel-wrapper/pannel-wrapper.component';
import { SchemaTypeComponent } from './schema-type/schema-type.component';
import { ButtonTypeComponent } from './button-type/button-type.component';
import { MatStepperModule } from '@angular/material/stepper';
import { HorizontalWrapperComponent } from './horizontal-wrapper/horizontal-wrapper.component';
import { MatTabsModule } from '@angular/material';
import { RepeatComponentComponent } from './repeat-component/repeat-component.component';


export function minlengthValidationMessage(err, field) {
  return `Should have atleast ${field.templateOptions.minLength} characters`;
}

export function maxlengthValidationMessage(err, field) {
  return `This value should be less than ${field.templateOptions.maxLength} characters`;
}

export function minValidationMessage(err, field) {
  return `This value should be more than ${field.templateOptions.min}`;
}

export function maxValidationMessage(err, field) {
  return `This value should be less than ${field.templateOptions.max}`;
}

@NgModule({
  imports: [
    CommonModule,
    ValidationRoutingModule,
    ReactiveFormsModule,
    FormlyModule,
    FormlyBootstrapModule,
    MatStepperModule,
    MatTabsModule,
    FormlyModule.forRoot({
      validationMessages: [
        { name: 'required', message: 'This field is required' },
        { name: 'minlength', message: minlengthValidationMessage },
        { name: 'maxlength', message: maxlengthValidationMessage },
        { name: 'min', message: minValidationMessage },
        { name: 'max', message: maxValidationMessage },
      ],
      types: [
        { name: 'file', component: FormlyFieldFileComponent, wrappers: ['form-field'] },
        { name: 'string', extends: 'input' },
        { name: 'number', extends: 'input', defaultOptions: { templateOptions: { type: 'number', }, }, },
        { name: 'integer', extends: 'input', defaultOptions: { templateOptions: { type: 'number', }, }, },
        { name: 'object', extends: 'formly-group' },
        { name: 'boolean', extends: 'checkbox' },
        { name: 'array', component: SchemaTypeComponent },
        { name: 'enum', extends: 'select' },
        { name: 'repeat', component: RepeatComponentComponent },
        {
          name: 'button',
          component: ButtonTypeComponent, wrappers: ['form-field'], defaultOptions: {
            templateOptions: {
              btnType: 'default', type: 'button',
            },
          },
        },
      ],
      wrappers: [
        { name: 'formPanel', component: PannelWrapperComponent },
        { name: 'form-field-horizontal', component: HorizontalWrapperComponent }
      ],
    }),
  ],
  declarations: [
    FormValidationComponent,
    FormlyFieldFileComponent,
    PannelWrapperComponent,
    SchemaTypeComponent,
    ButtonTypeComponent,
    HorizontalWrapperComponent,
    RepeatComponentComponent,
  ]
})
export class ValidationModule { }
