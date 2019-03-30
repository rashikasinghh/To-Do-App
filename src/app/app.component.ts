import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
inputArray = [];

  toDoForm = new FormGroup({
    inputbox: new FormControl('')
  });
  onClick() {
   const a = this.toDoForm.value;
  const inputvalue = a.inputbox;
  this.inputArray.push(inputvalue);
  }

onDelete(i) {
this.inputArray.splice(i, 1);
}
}
