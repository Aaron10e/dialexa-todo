import { TodoAddDialogComponent } from './todo-add-dialog/todo-add-dialog.component';
import { TodoUpdateComponent } from './todo-update/todo-update.component';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [TodoAddDialogComponent, TodoUpdateComponent, TodoFormComponent],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,

    // material
    MatButtonModule, // added
    MatInputModule, // added
    MatCardModule, // added
    MatDividerModule, // added
    MatCheckboxModule,
    MatFormFieldModule,
    MatDialogModule
  ]
})
export class TodoModule {}
