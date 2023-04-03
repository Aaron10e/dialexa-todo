import { TodoStoreService } from './todo-store-service';
import { TestBed } from '@angular/core/testing';
import { TodoItem } from 'src/models/todo-item';

describe('TodoStoreService', () => {
  let service: TodoStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get initial todo list', () => {
    const todoList = service.getTodoList();
    expect(todoList.length).toBe(3);
  });

  it('should add a new todo item', () => {
    const newItem: TodoItem = {
      id: 0, // This value will be updated by the service
      description: 'Test new item',
      isDone: false
    };
    service.addTodoItem(newItem);
    const todoList = service.getTodoList();
    expect(todoList.length).toBe(4);
    expect(todoList[3].description).toEqual('Test new item');
  });

  it('should update a todo item', () => {
    const updatedItem: TodoItem = {
      id: 1,
      description: 'Buy groceries (updated)',
      isDone: true
    };
    service.updateTodoItem(updatedItem);
    const todoList = service.getTodoList();
    const item = todoList.find(i => i.id === 1);
    expect(item).toBeTruthy();
    expect(item.description).toEqual('Buy groceries (updated)');
    expect(item.isDone).toBe(true);
  });

  it('should delete a todo item', () => {
    service.deleteTodoItem(1);
    const todoList = service.getTodoList();
    expect(todoList.length).toBe(2);
    const item = todoList.find(i => i.id === 1);
    expect(item).toBeFalsy();
  });

  it('should clear all items', () => {
    service.clearItems();
    const todoList = service.getTodoList();
    expect(todoList.length).toBe(0);
  });
});
