import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UsersService } from './users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  @ViewChild('modalView') modalView: ElementRef;

  public employeeList = [
    {
      id: 1, employeeName: 'Sam', department: 'Sales', married: true, gender: 'Male', myEmail: 'sam123@gmail.com',
      phone: '+918765439035', city: 'Hyderabad', cars: ['Audi', 'Volvo', 'BMW'],
      message: 'A message is a discrete unit of communication intended by the source for consumption by some recipient  group  recipients.'
    },
    {
      id: 2, employeeName: 'smith', department: 'Sales', married: false, gender: 'Male', myEmail: 'smith@gmail.com',
      phone: '+918765439035', city: 'Ahmadabad', cars: ['Audi', 'BMW', 'Jaguar'],
      message: 'A message is a discrete unit of communication intended by the source for consumption by some recipient  group  recipients.'
    },
    {
      id: 3, employeeName: 'john', department: 'Sales', married: true, gender: 'Male', myEmail: 'john@gmail.com',
      phone: '+918765439035', city: 'Bengaluru', cars: ['Jaguar', 'Volvo'],
      message: 'A message is a discrete unit of communication intended by the source for consumption by some recipient  group  recipients.'
    },
    {
      id: 4, employeeName: 'Shruti', department: 'Sales', married: false, gender: 'Female', myEmail: 'shruti@gmail.com',
      phone: '+918765439035', city: 'Chhatarpur', cars: ['Volvo', 'Jaguar'],
      message: 'A message is a discrete unit of communication intended by the source for consumption by some recipient  group  recipients.'
    }
  ];

  public usersData: any [];
  public userKey: any;
  public selectedEmployee: any;
  public viewItem: any;
  public showTable = true;
  public showButton = true;
 // public selectedEmployeeIndex = 0;
 public selectedEmployeeIndex;
  public text;

  constructor(private usersService: UsersService) {
  }

  ngOnInit() {
    this.usersService.getUsers().subscribe((usersList) => {
      console.log('FirebaseList', usersList);
      this.userKey = usersList;
      this.usersData = Object.entries(usersList).map(list => Object.assign({}, { key: list[0] }, list[1]));
      console.log('Firebase Array', this.usersData);
    },
      err => {
        console.log(err);
      });
  }


  /**
  * @description: This mithod is created for show and hide Form
  * @author: Virendra Pandey
  * @since: 14/09/2018
  */
  loadForm() {
    this.showTable = !this.showTable;
  }

  /**
  * @description: This method is created for create records in employeeList and edit records of employeeList
  * @param event: It takes a parameter that is emitted object of child component
  * @author: Virendra Pandey
  * @since: 14/09/2018
  */
  addRecord(event): void {
    if (event) {
      this.employeeList.push(event);
    }
    this.selectedEmployee = null;
    this.showTable = true;
  }

  /**
  * @description: This method is created for delete record of employeeList on modal confirmation
  * @author: Virendra Pandey
  * @since: 14/09/2018
  */
  deleteRecord() {
    // this.usersService.deleteUsers(this.selectedEmployeeIndex);
    this.employeeList.splice(this.selectedEmployeeIndex, 1);
  }

  /**
 * @description: This method is created for open confirmation pop-up based on index
 * @param index : It takes a parameter for Array index of employeeList
 * @author: Virendra Pandey
 * @since: 17/09/2018
 */
  openDeleteModel(index) {
    this.selectedEmployeeIndex = index;

  }

  /**
  * @description: This method is created for Edit record of employeeList
  * @param data: It takes a parameter of employeeRecord from employeeList
  * @author: Virendra Pandey
  * @since: 14/09/2018
  */
  editRecord(data) {
    this.selectedEmployee = data;
    this.showTable = false;
    this.showButton = false;
  }

  /**
  * @description: This method is created for Edit record of employeeList
  * @param item: It takes a parameter of employeeRecord from employeeList
  * @author: Virendra Pandey
  * @since: 17/09/2018
  */
  viewRecord(item: any) {
    this.viewItem = item;
  }
}
