import { FormGroup, ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, Validators } from '@angular/forms';
import { Component, Input, forwardRef } from '@angular/core';
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
export class TodoFormComponent implements ControlValueAccessor {
  @Input() public todoItem?: TodoItem;
  public form!: FormGroup;
  public onChange: any = () => {};
  public onTouch: any = () => {};

  constructor() {}

  ngOnInit() {
    this.form = new FormGroup({
      id: new FormControl(this.todoItem?.id ?? 0),
      description: new FormControl(this.todoItem?.description, Validators.required),
      isDone: new FormControl(this.todoItem?.isDone)
    });

    this.form.valueChanges.subscribe(value => {
      this.onChange(value);
      this.onTouch();
    });
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

  setDisabledState(isDisabled: boolean) {
    isDisabled ? this.form.disable() : this.form.enable();
  }
}
