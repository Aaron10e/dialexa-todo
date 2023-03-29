import { TodoFormComponent } from '../todo-form/todo-form.component';
import { TodoStoreService } from 'src/store/todoStoreService';
import { MatDialogRef } from '@angular/material/dialog';
import { Component, ViewChild } from '@angular/core';
import { TodoItem } from 'src/models/todo-item';

@Component({
  selector: 'app-todo-add-dialog',
  templateUrl: './todo-add-dialog.component.html',
  styleUrls: ['./todo-add-dialog.component.scss']
})
export class TodoAddDialogComponent {
  @ViewChild(TodoFormComponent)
  public childFormComp: TodoFormComponent | undefined;
  public todo: TodoItem = { id: 0, description: '', isDone: false };

  constructor(public dialogRef: MatDialogRef<TodoAddDialogComponent>, private _todoStore: TodoStoreService) {}

  onAdd() {
    console.log(this.childFormComp?.form?.controls['description'].value);
    if (!this.childFormComp?.form?.controls['description'].value) return;
    this._todoStore.addTodoItem(this.childFormComp.form.value);
    this.dialogRef.close();
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  isFormInValid(): boolean {
    if (!this.childFormComp?.form?.controls['description'].value) return true;
    return this.childFormComp.form.invalid;
  }
}
