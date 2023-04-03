import { TodoFormComponent } from '../todo-form/todo-form.component';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { TodoStoreService } from 'src/store/todo-store-service';
import { MatDialogRef } from '@angular/material/dialog';
import { TodoItem } from 'src/models/todo-item';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-todo-add-dialog',
  templateUrl: './todo-add-dialog.component.html',
  styleUrls: ['./todo-add-dialog.component.scss']
})
export class TodoAddDialogComponent implements AfterViewInit {
  @ViewChild(TodoFormComponent)
  public childFormComp: TodoFormComponent | undefined;
  public todo: TodoItem = { id: 0, description: '', isDone: false };
  public formInvalid$ = new BehaviorSubject<boolean>(true);

  constructor(public dialogRef: MatDialogRef<TodoAddDialogComponent>, private _todoStore: TodoStoreService) {}

  ngAfterViewInit(): void {
    this.childFormComp?.form.statusChanges.subscribe(status => {
      this.formInvalid$.next(status !== 'VALID');
    });
  }

  onAdd() {
    console.log(this.childFormComp?.form?.controls['description'].value);
    if (!this.childFormComp?.form?.controls['description'].value) return;
    this._todoStore.addTodoItem(this.childFormComp.form.value);
    this.dialogRef.close();
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
