import { Component, OnInit } from '@angular/core';
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

export class AppComponent implements OnInit {

constructor(public dialog: MatDialog) {}

inputtodos = [];

  toDoForm = new FormGroup({
    inputbox: new FormControl('')
  });

  ngOnInit() {
    const input = localStorage.getItem('todos');
    if (input) {
      this.inputtodos = JSON.parse(input);
    }
  }

onClick() {
  const a = this.toDoForm.value;
  const inputvalue = a.inputbox;
  this.inputtodos.push(inputvalue);
  localStorage.setItem('todos', JSON.stringify(this.inputtodos));
  const input = localStorage.getItem('todos');
    if (input) {
      this.inputtodos = JSON.parse(input);
    }
  this.toDoForm.reset();
  }

onDelete(i) {
this.inputtodos.splice(i, 1);
localStorage.setItem('todos', JSON.stringify(this.inputtodos));
  const input = localStorage.getItem('todos');
    if (input) {
      this.inputtodos = JSON.parse(input);
    }
}

edit(i, todo): void {
  const index = i ;
  localStorage.setItem('todo', todo);
   this.dialog.open(UpdateComponent)
    .afterClosed()
    .subscribe(result => {
      this.inputtodos.splice(index, 1, result);
      localStorage.setItem('todos', JSON.stringify(this.inputtodos));
      const input = localStorage.getItem('todos');
      if (input) {
        this.inputtodos = JSON.parse(input);
      }
    });
}

drop(event: CdkDragDrop<string[]>) {
  moveItemInArray(this.inputtodos, event.previousIndex, event.currentIndex);
  }
}
