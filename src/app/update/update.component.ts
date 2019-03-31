import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {  FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
value: any;
update = {
  todo: 'string',
  index: 'number'
};
  updateForm = new FormGroup({
  inputForm : new FormControl('')
  });

  constructor(private dialog: MatDialogRef<UpdateComponent>) { }

  ngOnInit() {
  const update = localStorage.getItem('todo');
  this.updateForm.get('inputForm').setValue(update);
  }

  onClick() {
    const updateValue = this.updateForm.value;
    const newValue = updateValue.inputForm;
    this.dialog.close(newValue);
  }

}
