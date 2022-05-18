import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataService } from '../service/data.service';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    MatInputModule,
    BrowserModule,
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [DataService]
})
export class HomeModule {}
