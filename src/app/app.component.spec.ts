import { MatDialog, MatDialogConfig, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TodoAddDialogComponent } from './todo/components/todo/todo-add-dialog/todo-add-dialog.component';
import { TodoUpdateComponent } from './todo/components/todo/todo-update/todo-update.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoStoreService } from 'src/store/todo-store-service';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TodoItem } from 'src/models/todo-item';
import { AppComponent } from './app.component';

// This test suite contains tests for the following scenarios:

// 1. Check if the AppComponent is created.
// 2. Check if the AppComponet had as title 'Todo'
// 3. Check if a todo item is not created when the description is empty.
// 4. Check if a todo item is created when the description is not empty.
// 5. Check if todo items are cleared.
// 6. Check if the add todo dialog is opened.
// 7. Check if the update todo dialog is opened.

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let todoStoreService: TodoStoreService;
  let dialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, TodoAddDialogComponent, TodoUpdateComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDividerModule,
        MatCardModule,
        MatIconModule
      ],
      providers: [TodoStoreService, { provide: MAT_DIALOG_DATA, useValue: {} }]
    }).compileComponents();
  });

  beforeEach(() => {
    todoStoreService = TestBed.inject(TodoStoreService);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Todo'`, () => {
    expect(component.title).toEqual('Todo');
  });

  it('should not create todo item when description is empty', () => {
    spyOn(todoStoreService, 'addTodoItem');
    component.itemDescription.setValue('');
    component.createToDoItem();
    expect(todoStoreService.addTodoItem).not.toHaveBeenCalled();
  });

  it('should create todo item when description is not empty', () => {
    spyOn(todoStoreService, 'addTodoItem');
    component.itemDescription.setValue('Test description');
    component.createToDoItem();
    expect(todoStoreService.addTodoItem).toHaveBeenCalled();
  });

  it('should clear todo items', () => {
    spyOn(todoStoreService, 'clearItems');
    component.onClearItems();
    expect(todoStoreService.clearItems).toHaveBeenCalled();
  });

  it('should open add todo dialog', () => {
    component.openAddTodoDialog();
    fixture.detectChanges();
    const test = document.getElementsByTagName('h2')[0] as HTMLHeadElement;
    expect(test.innerText).toEqual('Add new Todo');
  });

  it('should open update todo dialog', () => {
    const todoItem: TodoItem = {
      id: 1,
      description: 'Test description',
      isDone: false
    };
    component.editToDoItem(todoItem);
    fixture.detectChanges();
    const test = document.getElementsByTagName('h2')[0] as HTMLHeadElement;
    expect(test.innerText).toEqual('Update Todo');
  });
});
