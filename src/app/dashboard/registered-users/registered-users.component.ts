import { Component, OnInit } from '@angular/core';
import { UsersService } from '../user-list/users.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-registered-users',
  templateUrl: './registered-users.component.html',
  styleUrls: ['./registered-users.component.css']
})
export class RegisteredUsersComponent implements OnInit {

  selectedRowindex;
  registrationData: any = [];
  usersData: any = [];
  public userKey: any;
  public selectedusers: any;
  public viewItem: any;
  public showTable = true;
  public showButton = true;
  public buttonLabel = 'Register';
  isValidRegFormSubmitted = null;
  phonePattern = '^[0-9-+s()]*$';
  emailPattern = '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}';
  url = 'https://users-list-a70f5.firebaseio.com/users.json';
  cities: any = ['Ahmadabad', 'Allahabad', 'Azamer', 'Bengaluru', 'Bilaspur', 'Bhopal', 'Chhatarpur', 'Chhindwada', 'Hyderabad'];

  registrationForm: FormGroup;

  constructor(private usersService: UsersService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.getRegisteredUsers();
  }

  /**
   * @description: This method is created for getting registered users
   * @param event: It takes a parameter that is emitted object of child component
   * @author: Virendra Pandey
   * @since: 21/09/2018
   */
  getRegisteredUsers() {
    this.usersService.getUsers().subscribe((usersList) => {
      this.usersData = Object.entries(usersList).map(list => Object.assign({}, { key: list[0] }, list[1]));
      this.showTable = true;
    },
      err => {
        console.log(err);
      });
  }

  /**
  * @description: This method is created for Edit record of employeeList
  * @param user: for form value
  * @param index: for getting array index
  * @author: Virendra Pandey
  * @since: 21/09/2018
  */
  showForm(user = null, index = null) {
    this.registrationForm = new FormGroup({
      id: new FormControl(''),
      userName: new FormControl(null, Validators.required),
      myEmail: new FormControl(null, [Validators.required, Validators.email, Validators.pattern(this.emailPattern)]),
      phone: new FormControl(null, [Validators.required, Validators.pattern(this.phonePattern)]),
      password: new FormControl(null, Validators.required),
      gender: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      isTCAccepted: new FormControl(null, Validators.requiredTrue)
    });
    this.buttonLabel = 'Add';
    if (user) {
      this.registrationForm.setValue({
        id: user.id,
        userName: user.userName,
        myEmail: user.myEmail,
        phone: user.phone,
        password: user.password,
        gender: user.gender,
        city: user.city,
        isTCAccepted: user.isTCAccepted
      });
      this.buttonLabel = 'Update';
      this.selectedRowindex = index;
    }
    this.showTable = false;
  }

  /**
  * @description: method for creating and udtading users
  * @author: Virendra Pandey
  * @since: 21/09/2018
  */
  submitRecord(): void {
    const notification = 'Registered successfully!!';
    this.isValidRegFormSubmitted = false;
    if (this.registrationForm.invalid) {
      return;
    } else if (this.registrationForm.valid && !this.registrationForm.value.id && this.buttonLabel === 'Add') {
      if (this.usersData.length) {
        const lastRecord: any = this.usersData[this.usersData.length - 1];
        this.usersData.id = lastRecord.id + 1;
      } else {
        this.usersData.id = this.usersData.length + 1;
      }
      this.registrationForm.value.id = this.usersData.id;
      this.usersService.postUsers(this.registrationForm.value).subscribe(res => {
        this.isValidRegFormSubmitted = true;
        this.getRegisteredUsers();
        this.openSnackBar(notification);
      }, (err) => {
        console.log(err);
      });
    } else {
      const updateNotification = 'User updated successfully!!';
      this.usersData[this.selectedRowindex] = this.registrationForm.value;
      this.usersService.updateUsers(this.usersData)
        .subscribe(res => {
          this.getRegisteredUsers();
        }, (err) => {
          console.log(err);
        });
        this.openSnackBar(updateNotification);
    }
  }

  /**
  * @description: This method is created for delete record on modal confirmation
  * @author: Virendra Pandey
  * @since: 21/09/2018
  */
  deleteRecord() {
    this.usersData.splice(this.selectedRowindex, 1);
    this.usersService.updateUsers(this.usersData).subscribe();
  }

  /**
 * @description: This method is created for open confirmation pop-up based on index
 * @param index : It takes a parameter for Array index of registered users
 * @author: Virendra Pandey
 * @since: 21/09/2018
 */
  openDeleteModel(index) {
    this.selectedRowindex = index;
  }

  /**
  * @description: This method is created for Edit record of employeeList
  * @param item: It takes a parameter of employeeRecord from employeeList
  * @author: Virendra Pandey
  * @since: 21/09/2018
  */
  viewRecord(item: any) {
    this.viewItem = item;
  }

  /**
 * @description: Method for notification after registration
 * @author: Virendra Pandey
 * @since: 21/09/2018
 */
  openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
