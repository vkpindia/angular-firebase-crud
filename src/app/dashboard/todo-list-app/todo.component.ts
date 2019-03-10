import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TodoService } from './shared/todo.service';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit, AfterViewInit {
  toDoListArray: any[];
  maxLength = 250;
  currentText: string;
  hideToggle = true;
  isCollapsed = true;
  text = `Lorem Ipsum is simply dummy text of the printing and
  typesetting industry.Lorem Ipsum is simply dummy text of the 
  printing and typesetting industry. Lorem Ipsum has been the 
  industry's standard dummy text ever since the 1500s, when an 
  unknown printer took a galley of type and scrambled it to make
   a type specimen book. It has survived not only five centuries, 
   but also the leap into electronic typesetting, remaining essentially 
   unchanged. It was popularised in the 1960s with the release of Letraset 
   sheets containing Lorem Ipsum passages, and more recently with desktop 
   publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;

  constructor(private _toDoService: TodoService) { }

  ngOnInit() {
    this._toDoService.getToDoList().snapshotChanges()
      .subscribe(item => {
        this.toDoListArray = [];
        item.forEach(element => {
          const x = element.payload.toJSON();
          x['$key'] = element.key;
          this.toDoListArray.push(x);
        });
        // sort array isChecked false-> true
        this.toDoListArray.sort((a, b) => {
          return a.isChecked - b.isChecked;
        });
      });
  }
  ngAfterViewInit() {
    this.determineView();
  }
  onAdd(itemTitle) {
    this._toDoService.addTitle(itemTitle.value);
    itemTitle.value = null;
  }

  alterCheck($key: string, isChecked) {
    this._toDoService.checkOrUnCheckTitle($key, !isChecked);
  }

  onDelete($key: string) {
    this._toDoService.removeTitle($key);
  }

  toggleView() {
    this.isCollapsed = !this.isCollapsed;
    this.determineView();
}
determineView() {
    if (!this.text || this.text.length <= this.maxLength) {
        this.currentText = this.text;
        this.isCollapsed = false;
        this.hideToggle = false;
        return;
    }
    this.hideToggle = false;
    if (this.isCollapsed === true) {
        this.currentText = this.text.substring(0, this.maxLength) + '...';
        this.isCollapsed = true;
        this.hideToggle = true;
    } else if (this.isCollapsed === false)  {
        this.currentText = this.text;
        this.isCollapsed = false;
        this.hideToggle = true;
    }

}
}
