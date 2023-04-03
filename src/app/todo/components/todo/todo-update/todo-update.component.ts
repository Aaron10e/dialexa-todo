import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { TodoStoreService } from 'src/store/todo-store-service';
import { TodoItem } from 'src/models/todo-item';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-todo-update',
  templateUrl: './todo-update.component.html',
  styleUrls: ['./todo-update.component.scss']
})
export class TodoUpdateComponent implements OnInit, AfterViewInit {
  @ViewChild(TodoFormComponent)
  public childFormComp: TodoFormComponent | undefined;
  public todoItem: TodoItem | undefined;
  public formInvalid$ = new BehaviorSubject<boolean>(true);

  constructor(
    private _todoStore: TodoStoreService,
    private cdr: ChangeDetectorRef,
    public dialogRef: MatDialogRef<TodoUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { todoItem: TodoItem }
  ) {
    if (data.todoItem) this.todoItem = data.todoItem;
  }

  ngOnInit() {
    this.formInvalid$.next(this.todoItem?.description && this.todoItem.description != '' ? false : true);
  }

  ngAfterViewInit(): void {
    this.childFormComp?.form.statusChanges.subscribe(status => {
      this.formInvalid$.next(status !== 'VALID');
    });
  }

  onUpdate() {
    const descriptionValue: string | undefined = this.childFormComp?.form?.controls['description'].value;
    console.log(descriptionValue); // this is left in for testing
    if (this.childFormComp && descriptionValue && descriptionValue != '') {
      this._todoStore.updateTodoItem(this.childFormComp.form.value);
      this.cdr.detectChanges();
      this.dialogRef.close();
    }
  }

  onDelete() {
    if (!this.todoItem?.id) return;
    this._todoStore.deleteTodoItem(this.todoItem.id);
    this.dialogRef.close();
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
