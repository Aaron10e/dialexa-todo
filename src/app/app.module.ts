import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // Vendor
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule, // added
    
    // material
    MatButtonModule, // added
    MatInputModule,  // added
    MatCardModule,   // added
    MatDividerModule // added
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
