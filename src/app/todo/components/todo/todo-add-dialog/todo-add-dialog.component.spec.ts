import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { TodoAddDialogComponent } from './todo-add-dialog.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TodoStoreService } from 'src/store/todoStoreService';
import { MatDividerModule } from '@angular/material/divider';
import { By } from '@angular/platform-browser';

describe('TodoAddDialogComponent', () => {
  let component: TodoAddDialogComponent;
  let fixture: ComponentFixture<TodoAddDialogComponent>;
  const dialogRefMock = {
    close: jasmine.createSpy('close')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        MatDividerModule
      ],
      declarations: [TodoAddDialogComponent, TodoFormComponent],
      providers: [{ provide: MatDialogRef, useValue: dialogRefMock }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoAddDialogComponent);
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

  it('should not add a todo item when onAdd is called with an empty description', () => {
    const todoStoreService = TestBed.inject(TodoStoreService);
    spyOn(todoStoreService, 'addTodoItem');
    component.onAdd();
    expect(todoStoreService.addTodoItem).not.toHaveBeenCalled();
  });

  it('should add a todo item when onAdd is called with a valid description', () => {
    const todoStoreService = TestBed.inject(TodoStoreService);
    spyOn(todoStoreService, 'addTodoItem');

    const descriptionInput = fixture.debugElement.query(By.css('input[formControlName="description"]')).nativeElement;
    descriptionInput.value = 'Test todo';
    descriptionInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    component.onAdd();
    expect(todoStoreService.addTodoItem).toHaveBeenCalled();
  });
});
