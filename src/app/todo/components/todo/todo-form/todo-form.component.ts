import { FormGroup, ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, Validators } from '@angular/forms';
import { Component, Input, forwardRef, ChangeDetectorRef, OnInit } from '@angular/core';
import { TodoItem } from 'src/models/todo-item';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TodoFormComponent),
      multi: true
    }
  ]
})
export class TodoFormComponent implements ControlValueAccessor, OnInit {
  @Input() public todoItem?: TodoItem;
  public form!: FormGroup;
  public onChange: any = () => {};
  public onTouch: any = () => {};

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.form = new FormGroup({
      id: new FormControl(this.todoItem?.id ?? 0),
      description: new FormControl(this.todoItem?.description, Validators.required),
      isDone: new FormControl(this.todoItem?.isDone ?? false)
    });

    this.cdr.detectChanges();
  }

  writeValue(value: any) {
    if (value) {
      this.form.setValue(value, { emitEvent: false });
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }
}
