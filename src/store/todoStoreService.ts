import { TodoItem } from 'src/models/todo-item';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoStoreService {
  private readonly items$ = new BehaviorSubject<TodoItem[]>([
    { id: 1, description: 'Buy groceries', isDone: false },
    { id: 2, description: 'Clean the house', isDone: true },
    { id: 3, description: 'Go to the gym', isDone: false }
  ]);

  public todoItems$ = this.items$.asObservable();

  private todoList: TodoItem[] = [];

  constructor() {}

  public getTodoList(): TodoItem[] {
    return this.items$.value;
  }

  public addTodoItem(newItem: TodoItem): void {
    const items = this.items$.value;
    let lastId = items.length
      ? items.reduce((item, curr) => {
          return item.id < curr.id ? curr : item;
        }).id
      : 0;
    newItem.id = lastId++;
    const newItems = [...items, newItem];
    this.items$.next(newItems);
  }

  updateTodoItem(item: TodoItem): void {
    const items = this.items$.value;
    const index = items.findIndex(i => i.id === item.id);
    if (index !== -1) {
      items[index] = item;
    }
    this.items$.next(items);
  }

  deleteTodoItem(id: number): void {
    const items = this.items$.value;
    const index = items.findIndex(i => i.id === id);
    if (index !== -1) {
      items.splice(index, 1);
    }
    this.items$.next(items);
  }

  clearItems(): void {
    this.items$.next([]);
  }
}
