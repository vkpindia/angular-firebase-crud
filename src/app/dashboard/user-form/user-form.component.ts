import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  @Input() employeeRecord: any = [];
  @Input() employeeData: any;
  @Output() addEmployeeRecord = new EventEmitter();
  showForm = true;
  buttonLabel = 'Add';
  isValidFormSubmitted = null;
  emailPattern = '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}';
  phonePattern = '^[0-9-+s()]*$';
  cities: any = ['Ahmadabad', 'Allahabad', 'Azamer', 'Bengaluru', 'Bilaspur', 'Bhopal', 'Chhatarpur', 'Chhindwada', 'Hyderabad'];
  myCars: any = ['Volvo', 'Audi', 'Jaguar', 'BMW'];

  employeeForm = new FormGroup({
    id: new FormControl(''),
    employeeName: new FormControl('', Validators.required),
    department: new FormControl('', Validators.required),
    myEmail: new FormControl('', [Validators.required, Validators.email, Validators.pattern(this.emailPattern)]),
    phone: new FormControl('', [Validators.required, Validators.pattern(this.phonePattern)]),
    married: new FormControl(''),
    gender: new FormControl('', Validators.required),
    city: new FormControl(undefined, Validators.required),
    cars: new FormControl([], Validators.required),
    message: new FormControl('', [Validators.required, Validators.minLength(50), Validators.maxLength(1000)])
  });

  constructor() {
  }

  /**
  * @description: This method created for edit record
  * @author: Virendra Pandey
  * @since: 14/09/2018
  */
  ngOnInit() {
    if (this.employeeRecord) {
      this.editRecord();
      this.buttonLabel = 'Update';
    }
  }

  /**
   * @description: This mithod is created for getting form controls
   * @author: Virendra Pandey
   * @returns: employeeForm controls
   * @since: 14/09/2018
   */
  get employeeFormControl() {
    return this.employeeForm.controls;
  }

  /**
   * @description: This mithod is created for  hide Form
   * @author: Virendra Pandey
   * @since: 14/09/2018
   */
  cancel() {
    this.addEmployeeRecord.emit(null);
  }

  /**
  * @description: This mithod is created for emitting the form value on (ngSubmit)
  *  to (addRecord) event so that we can send the form data to parent component
  * @author: Virendra Pandey
  * @since: 14/09/2018
  */
  submitRecord() {
    this.isValidFormSubmitted = false;
    if (this.employeeForm.invalid) {
      return;
    }
    if (this.buttonLabel === 'Add') {
      if (this.employeeData.length) {
        const lastRecord: any = this.employeeData[this.employeeData.length - 1];
        this.employeeData.id = lastRecord.id + 1;
      } else {
        this.employeeData.id = this.employeeData.length + 1;
      }
      this.employeeForm.value.id = this.employeeData.id;
      const employeeFormRecord = this.employeeForm.value;
      this.addEmployeeRecord.emit(employeeFormRecord);
      this.employeeForm.reset();
    } else {
      this.employeeData.forEach((element, index) => {
        if (element['id'] === this.employeeRecord['id']) {
          this.employeeData[index] = this.employeeForm.value;
        }
      });
      this.employeeForm.reset();
    }
    this.cancel();
  }

  /**
  * @description: This method is created for Edit record of employeeList
  * @author: Virendra Pandey
  * @since: 14/09/2018
  */
  editRecord() {
    this.employeeForm.setValue({
      id: this.employeeRecord['id'],
      employeeName: this.employeeRecord.employeeName,
      department: this.employeeRecord.department,
      myEmail: this.employeeRecord.myEmail,
      phone: this.employeeRecord.phone,
      married: this.employeeRecord.married,
      gender: this.employeeRecord.gender,
      city: this.employeeRecord.city,
      cars: this.employeeRecord.cars,
      message: this.employeeRecord.message
    });
  }

}
