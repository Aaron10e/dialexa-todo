import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { TodoItem } from 'src/models/todo-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

@Injectable()
export class AppComponent implements OnInit {
  readonly items$ = new BehaviorSubject<TodoItem[]>([]);
  itemDescription = new FormControl('');
  title = 'Todo';

  constructor() {}  

  ngOnInit(): void {}

  onKeydown(event: any) {
    if (event.key === "Enter") {
      this.createToDoItem();
    }
  }

  createToDoItem() {
    if (!this.itemDescription?.value) return;
    const items = this.items$.value;
    let lastId = items.length ? items.reduce((item, curr) => {
      return item.id < curr.id ? curr : item;
    }).id : 1;
    items.push({id: lastId > 1 ? (lastId++) : 1, description: this.itemDescription?.value, done:false})
    this.items$.next(items);
    this.itemDescription.setValue('');
  }

  onClearItems(){
    this.items$.next([]);
    this.itemDescription.setValue('');
  }
}
