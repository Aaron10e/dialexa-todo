import { TodoAddDialogComponent } from './todo/components/todo/todo-add-dialog/todo-add-dialog.component';
import { TodoUpdateComponent } from './todo/components/todo/todo-update/todo-update.component';
import { TodoStoreService } from 'src/store/todo-store-service';
import { Component, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TodoItem } from 'src/models/todo-item';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
@Injectable()
export class AppComponent {
  public readonly items$ = this._todoStore.todoItems$;
  public itemDescription = new FormControl('');
  public title = 'Todo';

  constructor(private _todoStore: TodoStoreService, public dialog: MatDialog) {}

  public onKeydown(event: any) {
    if (event.key === 'Enter') {
      this.createToDoItem();
    }
  }

  public createToDoItem() {
    if (!this.itemDescription?.value) return;
    this._todoStore.addTodoItem({ id: 0, description: this.itemDescription.value, isDone: false });
    this.clearItemDescription();
  }

  public onClearItems() {
    this._todoStore.clearItems();
    this.clearItemDescription();
  }

  private clearItemDescription() {
    this.itemDescription.setValue('');
  }

  public openAddTodoDialog(): void {
    this.dialog.open(TodoAddDialogComponent, {
      width: '400px'
    });
  }

  public editToDoItem(todoItem: TodoItem) {
    this.dialog.open(TodoUpdateComponent, {
      width: '400px',
      data: { todoItem }
    });
  }
}
