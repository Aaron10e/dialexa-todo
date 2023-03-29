import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TodoModule } from './todo/components/todo/todo.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    // Vendor
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule, // added

    // material
    MatButtonModule, // added
    MatInputModule, // added
    MatCardModule, // added
    MatDividerModule, // added
    MatCheckboxModule,
    MatFormFieldModule,
    MatDialogModule,

    // todo component files
    TodoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
