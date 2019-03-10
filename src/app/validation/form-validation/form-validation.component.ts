import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormGroup, FormControl } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyJsonschema } from '@ngx-formly/core/json-schema';
import { Subject } from 'rxjs';
import { takeUntil, startWith, tap } from 'rxjs/operators';
import { SelectService } from '../select.service';


export interface StepType {
  label: string;
  fields3: FormlyFieldConfig[];
}

export interface TabType {
  label: string;
  fields4: FormlyFieldConfig[];
}

@Component({
  selector: 'app-form-validation',
  templateUrl: './form-validation.component.html',
  styleUrls: ['./form-validation.component.css']
})
export class FormValidationComponent implements OnInit, OnDestroy {

  onDestroy$ = new Subject<void>();
  activedStep = 0;
  usersEmail: any = ['sam123@gmail.com', 'john@gmail.com', 'smith67@gmail.com'];
  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {
    // formState: {
    //   disabled: true,
    // },
  };

  fields: FormlyFieldConfig[] = [
    {
      key: 'name',
      type: 'input',
      templateOptions: {
        label: 'Name',
        placeholder: 'Name',
        required: true,
        maxLength: 20,
      },
    },
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        type: 'email',
        label: 'Email',
        placeholder: 'Email',
        addonLeft: {
          class: 'fa fa-envelope',
        },
        required: true,
        pattern: /[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}/,
      },
      asyncValidators: {
        uniqueUsername: {
          expression: (control: FormControl) => {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve(this.usersEmail.indexOf(control.value) === -1);
              }, 1000);
            });
          },
          message: 'This email is already taken.',
        },
      },
      validation: {
        messages: {
          pattern: (error, field: FormlyFieldConfig) => `"${field.formControl.value}" is not a valid email`,
        },
      },
    },
    {
      key: 'phone',
      type: 'input',
      templateOptions: {
        label: 'Phone',
        placeholder: 'Phone',
        addonLeft: {
          class: 'fa fa-phone',
        },
        required: true,
        maxLength: 13,
        minLength: 10,
        pattern: /^[0-9-+s()]*$/,
      },
      expressionProperties: {
        'templateOptions.disabled': '!model.email',
      },
      validation: {
        messages: {
          pattern: (error, field: FormlyFieldConfig) => `"${field.formControl.value}" is not a valid phune number`,
        },
      },
    },
    {
      key: 'password',
      validators: {
        fieldMatch: {
          expression: (control) => {
            const value = control.value;
            // avoid displaying the message error when values are empty
            return value.passwordConfirm === value.password || (!value.passwordConfirm || !value.password);
          },
          message: 'Password Not Matching',
          errorPath: 'passwordConfirm',
        },
      },
      fieldGroup: [
        {
          key: 'password',
          type: 'input',
          templateOptions: {
            type: 'password',
            label: 'Password',
            placeholder: 'Enter password',
            required: true,
            minLength: 3,
          },
        },
        {
          key: 'passwordConfirm',
          type: 'input',
          templateOptions: {
            type: 'password',
            label: 'Confirm Password',
            placeholder: 'Please re-enter your password',
            required: true,
          },
          hideExpression: '!model.password',
        },
      ],
    },
    {
      type: 'input',
      key: 'dob',
      className: 'col-sm-4',
      templateOptions: {
        type: 'date',
        label: 'Date of birth',
        required: true
      },
    },
    {
      key: 'gender',
      type: 'radio',
      templateOptions: {
        label: 'Gender',
        options: [
          {
            label: 'Male',
            value: 'male'
          },
          {
            label: 'Female',
            value: 'female'
          }
        ],
        required: true,
      }
    },
    {
      key: 'married',
      type: 'checkbox',
      templateOptions: {
        label: 'Are you married?',
        required: true,
      },
      expressionProperties: {
        'templateOptions.disabled': '!model.gender',
      },
    },
    {
      key: 'checked',
      type: 'checkbox',
      templateOptions: {
        label: 'City required?',
      },
    },
    {
      key: 'city',
      type: 'select',
      templateOptions: {
        label: 'Select city',
        required: true,
        options: this.selectService.getCities(),
        valueProp: 'label',
        labelProp: 'value',
      },
      validation: {
        show: true,
      },
      expressionProperties: {
        'templateOptions.required': 'model.checked',
      },
    },
    {
      key: 'showError',
      type: 'checkbox',
      templateOptions: {
        label: 'Force to show message error',
      },
    },
    {
      key: 'message',
      type: 'textarea',
      modelOptions: {
        updateOn: 'blur',
      },
      templateOptions: {
        label: 'Message',
        placeholder: 'Enter message here',
        rows: 2,
        required: true,
      },
      validation: {
        show: true,
      },
      expressionProperties: {
        'validation.show': 'model.showError',
      },
    },
  ];

  formFormly = new FormGroup({});
  model1: any = {};
  options1: FormlyFormOptions = {};

  fields1: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-6',
          type: 'input',
          key: 'firstName',
          modelOptions: {
            debounce: {
              default: 1000
            },
          },
          templateOptions: {
            label: 'First Name',
            placeholder: 'First Name',
            required: true
          },
        },
        {
          className: 'col-6',
          type: 'input',
          key: 'lastName',
          templateOptions: {
            label: 'Last Name',
            placeholder: 'Last Name',
            required: true
          },
          expressionProperties: {
            'templateOptions.disabled': '!model.firstName',
          },
        },
      ],
    },
    {
      className: 'section-label',
      template: '<hr />',
    },
    {
      key: 'address',
      wrappers: ['formPanel'],
      templateOptions: { label: 'Address', },
      type: 'repeat',
      fieldArray: {
        fieldGroupClassName: 'row',
        templateOptions: {
          btnText: 'Add address',
        },
        fieldGroup: [
          {
            className: 'col-6',
            type: 'input',
            key: 'street',
            templateOptions: {
              label: 'Street',
              placeholder: 'Street'
            },
          },
          {
            className: 'col-3',
            type: 'input',
            key: 'cityName',
            templateOptions: {
              label: 'City',
              placeholder: 'City',
              required: true
            },
          },
          {
            className: 'col-3',
            type: 'input',
            key: 'zip',
            templateOptions: {
              type: 'number',
              label: 'Zip',
              placeholder: 'Zip',
              max: 99999,
              min: 0,
              pattern: '\\d{5}',
            },
          },
        ],
      },
    },
    { template: '<hr />' },
    {
      key: 'file',
      type: 'file',
    },
    { template: '<hr />' },
    {
      type: 'textarea',
      key: 'message',
      modelOptions: {
        updateOn: 'blur',
      },
      templateOptions: {
        label: 'Message',
        placeholder: 'Message',
      },
    },
    {
      key: 't&c',
      type: 'checkbox',
      templateOptions: {
        label: 'Accept term & conditions',
        required: true
      },
    },
    {
      type: 'button',
      templateOptions: {
        text: 'Click',
        btnType: 'info',
        onClick: ($event) => {
          this.form.get('message').setValue('These can have labels and stuff too if you want....!');
          return alert('You clicked me!');
        },
      },
    },
  ];

  // Formly advanced JsonSchema
  form2 = new FormGroup({});
  model2: any = {
    'listOfStrings': [
      'Hyderabad',
      'Bengaluru',
      'Ahmadabad',
      'Bilaspur',
      'Sitamarhi'
    ],
    'multipleChoicesList': [
      'Ahmadabad',
      'Bilaspur',
      'Sitamarhi'
    ],
  };
  options2: FormlyFormOptions = {};

  fields2: FormlyFieldConfig[] = [this.formlyJsonschema.toFieldConfig({
    'title': 'A registration form',
    'description': '',
    'type': 'object',
    'required': [
      'firstName',
      'lastName',
      'password',
      'telephone'
    ],
    'properties': {
      'firstName': {
        'type': 'string',
        'title': 'First name',
      },
      'lastName': {
        'type': 'string',
        'title': 'Last name',
      },
      'pin': {
        'type': 'integer',
        'title': 'Age',
        'minLength': 4,
      },
      'password': {
        'type': 'string',
        'title': 'Password',
        'minLength': 6,
      },
      'telephone': {
        'type': 'string',
        'title': 'Telephone',
        'minLength': 10,
      },
      'numberEnum': {
        'type': 'string',
        'title': 'City',
        'enum': [
          'Hyderabad',
          'Bengaluru',
          'Ahmadabad',
          'Bilaspur',
          'Sitamarhi'
        ],
      },
    }
  })];

  // Multi-step form
  model3: any = {};
  steps: StepType[] = [
    {
      label: 'Personal data',
      fields3: [
        {
          key: 'firstname',
          type: 'input',
          wrappers: ['form-field-horizontal'],
          templateOptions: {
            label: 'First name',
            required: true,
          },
        },
        {
          key: 'age',
          type: 'input',
          wrappers: ['form-field-horizontal'],
          templateOptions: {
            type: 'number',
            label: 'Age',
            required: true,
          },
        },
      ],
    },
    {
      label: 'Destination',
      fields3: [
        {
          key: 'country',
          type: 'input',
          wrappers: ['form-field-horizontal'],
          templateOptions: {
            label: 'Country',
            required: true,
          },
        },
      ],
    },
    {
      label: 'Day of the trip',
      fields3: [
        {
          key: 'day',
          type: 'input',
          wrappers: ['form-field-horizontal'],
          templateOptions: {
            type: 'date',
            label: 'Day of the trip',
            required: true,
          },
        },
      ],
    },
    {
      label: 'Sport team',
      fields3: [
        {
          key: 'sport',
          type: 'select',
          templateOptions: {
            label: 'Sport',
            options: [
              { id: '1', name: 'Soccer' },
              { id: '2', name: 'Basketball' },
            ],
            valueProp: 'id',
            labelProp: 'name',
          },
        },
        {
          key: 'team',
          type: 'select',
          templateOptions: {
            label: 'Team',
            options: [],
            valueProp: 'id',
            labelProp: 'name',
          },
          lifecycle: {
            onInit: (form, field) => {
              const teams = [
                { id: '1', name: 'Dhoni', sportId: '1' },
                { id: '2', name: 'Virat', sportId: '1' },
                { id: '3', name: 'Shavrkar', sportId: '2' },
                { id: '4', name: 'Gavskar', sportId: '2' },
              ];

              form.get('sport').valueChanges.pipe(
                takeUntil(this.onDestroy$),
                startWith(form.get('sport').value),
                tap(sportId => {
                  field.formControl.setValue('');
                  field.templateOptions.options = teams.filter(team => team.sportId === sportId);
                }),
              ).subscribe();
            },
          },
        },
        {
          key: 'player',
          type: 'select',
          templateOptions: {
            label: 'Player',
            options: [],
            valueProp: 'id',
            labelProp: 'name',
          },
          lifecycle: {
            onInit: (form, field) => {
              const players = [
                { id: '1', name: 'Smith', teamId: '1' },
                { id: '2', name: 'Sam', teamId: '1' },
                { id: '3', name: 'John', teamId: '2' },
                { id: '4', name: 'Brian', teamId: '2' },
                { id: '5', name: 'Headly', teamId: '3' },
                { id: '6', name: 'Josheph', teamId: '3' },
                { id: '7', name: 'Jignish', teamId: '4' },
                { id: '8', name: 'Manish', teamId: '4' },
              ];

              form.get('team').valueChanges.pipe(
                takeUntil(this.onDestroy$),
                startWith(form.get('team').value),
                tap(sportId => {
                  field.formControl.setValue('');
                  field.templateOptions.options = players.filter(team => team.teamId === sportId);
                }),
              ).subscribe();
            },
          },
        },
      ]
    },
  ];

  form3 = new FormArray(this.steps.map(() => new FormGroup({})));
  options3 = this.steps.map(() => <FormlyFormOptions>{});

  // Tabs Form
  model4 = {};
  tabs: TabType[] = [
    {
      label: 'Personal data',
      fields4: [
        {
          key: 'name',
          type: 'input',
          templateOptions: {
            label: 'Name',
            placeholder: 'Name',
            required: true,
            maxLength: 20,
          },
        },
        {
          key: 'email',
          type: 'input',
          templateOptions: {
            type: 'email',
            label: 'Email',
            placeholder: 'Email',
            addonLeft: {
              class: 'fa fa-envelope',
            },
            required: true,
            pattern: /[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}/,
          },
          validation: {
            messages: {
              pattern: (error, field: FormlyFieldConfig) => `"${field.formControl.value}" is not a valid email`,
            },
          },
        },
        {
          type: 'input',
          key: 'dob',
          className: 'col-sm-4',
          templateOptions: {
            type: 'date',
            label: 'Date of birth',
            required: true
          },
        },
        {
          key: 'age',
          type: 'input',
          templateOptions: {
            type: 'number',
            label: 'Age',
            required: true,
          },
        },
      ],
    },
    {
      label: 'Destination',
      fields4: [
        {
          key: 'destination',
          templateOptions: { label: 'Address', },
          type: 'repeat',
          fieldArray: {
            templateOptions: {
              btnText: 'Add destination',
            },
            fieldGroup: [
              {
                key: 'country',
                type: 'input',
                templateOptions: {
                  label: 'Country',
                  required: true,
                },
              },
              {
                key: 'city',
                type: 'select',
                templateOptions: {
                  label: 'Select city',
                  required: true,
                  options: [
                    { label: 'Ahmadabad', value: 'Ahmadabad' },
                    { label: 'Allahabad', value: 'Allahabad' },
                    { label: 'Hyderabad', value: 'Hyderabad' },
                    { label: 'Bengaluru', value: 'Bengaluru' },
                    { label: 'Mengaluru', value: 'Mengaluru' },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
    {
      label: 'Day of the trip',
      fields4: [
        {
          key: 'day',
          type: 'input',
          templateOptions: {
            type: 'date',
            label: 'Day of the trip',
            required: true,
          },
        },
      ],
    },
  ];

  form4 = new FormArray(this.tabs.map(() => new FormGroup({})));
  options4 = this.tabs.map(() => <FormlyFormOptions>{});


  constructor(private formlyJsonschema: FormlyJsonschema, private selectService: SelectService) { }

  ngOnInit() {
    this.fields.forEach(field => {
      field.expressionProperties = field.expressionProperties || {};
      field.expressionProperties['templateOptions.disabled'] = 'formState.disabled';
    });
  }

  /**
   * @description: This method created for disable and enable form
   * @author: Virendra Pandey
   * @since: 19/09/2018
   */
  toggleDisabled() {
    this.options.formState.disabled = !this.options.formState.disabled;
  }

  /**
    * @description: This method created for desplay alert on submit form
    * @author: Virendra Pandey
    * @since: 19/09/2018
    */
  submit() {
    if (this.form.valid) {
      alert(JSON.stringify(this.model));
      this.form2.reset();
    }
  }

  /**
    * @description: This method created for desplay alert on submit formFormly
    * @author: Virendra Pandey
    * @since: 19/09/2018
    */
  submit1() {
    if (this.formFormly.valid) {
      alert(JSON.stringify(this.model1));
    }
    this.form2.reset();
  }

  /**
    * @description: This method created for desplay alert on submit form2
    * @author: Virendra Pandey
    * @since: 19/09/2018
    */
  submit2() {
    if (this.form2.valid) {
      alert(JSON.stringify(this.model2));
    }
    this.form2.reset();
  }

  /**
   * @description: This method created for previous form field
   * @author: Virendra Pandey
   * @since: 19/09/2018
   */
  prevStep(step) {
    this.activedStep = step - 1;
  }

  /**
   * @description: This method created for next form field
   * @author: Virendra Pandey
   * @since: 19/09/2018
   */
  nextStep(step) {
    this.activedStep = step + 1;
  }

  /**
   * @description: This method created for desplay alert on submit form3
   * @author: Virendra Pandey
   * @since: 19/09/2018
   */
  submit3() {
    if (this.form3.valid) {
      alert(JSON.stringify(this.model3));
    }
    this.form3.reset();
  }

  /**
  * @description: This method created for desplay alert on submit form3
  * @author: Virendra Pandey
  * @since: 20/09/2018
  */
  submit4() {
    if (this.form4.valid) {
      alert(JSON.stringify(this.model4));
    }
    this.form3.reset();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
