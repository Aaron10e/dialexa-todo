import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoStoreService } from 'src/store/todoStoreService';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { TodoItem } from 'src/models/todo-item';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { TodoUpdateComponent } from './todo-update.component';

class TodoStoreServiceMock {
  todos: TodoItem[] = [
    { id: 1, description: 'Test todo 1', isDone: false },
    { id: 2, description: 'Test todo 2', isDone: false }
  ];

  updateTodoItem(updatedTodo: TodoItem) {
    // Implement any mock functionality you want here
    const index = this.todos.findIndex(todo => todo.id === updatedTodo.id);

    if (index !== -1) {
      this.todos[index] = updatedTodo;
    }
  }

  deleteTodoItem(id: number) {
    // You can implement any mock functionality you want here
  }
}

describe('TodoUpdateComponent', () => {
  let component: TodoUpdateComponent;
  let fixture: ComponentFixture<TodoUpdateComponent>;
  const dialogRefMock = {
    close: jasmine.createSpy('close')
  };

  const matDialogDataMock: { todoItem: TodoItem } = {
    todoItem: { id: 1, description: 'Test todo', isDone: false }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoUpdateComponent, TodoFormComponent],
      imports: [
        BrowserAnimationsModule,
        MatDialogModule,
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDividerModule,
        MatCardModule,
        MatCheckboxModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: matDialogDataMock },
        { provide: TodoStoreService, useClass: TodoStoreServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TodoUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call dialogRef.close when onCancel is called', () => {
    component.onCancel();
    expect(dialogRefMock.close).toHaveBeenCalled();
  });

  it('should not update a todo item when onUpdate is called with an empty description', () => {
    const todoStoreService = TestBed.inject(TodoStoreService);
    spyOn(todoStoreService, 'updateTodoItem');

    // Set invalid form values
    component.childFormComp?.form.setValue({
      id: 1,
      description: '',
      isDone: false
    });

    fixture.detectChanges();
    component.onUpdate();
    expect(todoStoreService.updateTodoItem).not.toHaveBeenCalled();
  });

  it('should update a todo item when onUpdate is called with a valid description', () => {
    const todoStoreService = TestBed.inject(TodoStoreService);
    spyOn(todoStoreService, 'updateTodoItem');

    // Set valid form values
    component.childFormComp?.form.setValue({
      id: 1,
      description: 'Updated test todo',
      isDone: false
    });
    fixture.detectChanges();

    console.log('Form value:', component.childFormComp?.form.value); // Check the form values
    console.log('Form status:', component.childFormComp?.form.status); // Check the form status

    component.onUpdate();
    expect(todoStoreService.updateTodoItem).toHaveBeenCalled();
  });

  it('should delete a todo item when onDelete is called', () => {
    const todoStoreService = TestBed.inject(TodoStoreService);
    spyOn(todoStoreService, 'deleteTodoItem');
    component.onDelete();
    expect(todoStoreService.deleteTodoItem).toHaveBeenCalled();
  });
});
