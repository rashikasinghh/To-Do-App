import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {
  trigger,
  style,
  animate,
  transition,
  keyframes,
} from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { UpdateComponent } from './update/update.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('moveInLeft', [
       transition('void=> *', [style({transform: 'translateX(300px)'}),
         animate(200, keyframes ([
          style({transform: 'translateX(300px)'}),
          style({transform: 'translateX(0)'})
           ]))]),
    transition('*=>void', [style({transform: 'translateX(0px)'}),
         animate(100, keyframes([
          style({transform: 'translateX(0px)'}),
          style({transform: 'translateX(300px)'})
        ]))])
     ])
 ]
})

export class AppComponent {

constructor(public dialog: MatDialog) {}

inputArray = [];
  toDoForm = new FormGroup({
    inputbox: new FormControl('')
  });

  onClick() {
   const a = this.toDoForm.value;
  const inputvalue = a.inputbox;
  this.inputArray.push(inputvalue);
  this.toDoForm.reset();
  }

onDelete(i) {
this.inputArray.splice(i, 1);
}

edit(i, todo): void {
  const index = i ;
  localStorage.setItem('todo', todo);
   this.dialog.open(UpdateComponent)
  .afterClosed()
    .subscribe(result => {
      this.inputArray.splice(index, 1, result);
    });
}

drop(event: CdkDragDrop<string[]>) {
  moveItemInArray(this.inputArray, event.previousIndex, event.currentIndex);
}
}
