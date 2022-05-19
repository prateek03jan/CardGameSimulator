import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarModule } from './navbar/navbar.module';
import { MaterialModule } from './material/material.module';
import { HomeModule } from './home/home.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NavbarModule,
    MaterialModule,
    BrowserAnimationsModule,
    BrowserAnimationsModule,
    HomeModule
  ],
  exports: [MaterialModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
