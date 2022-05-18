import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [NavBarComponent],
  imports: [CommonModule, MatToolbarModule, MatIconModule],
  exports: [NavBarComponent]
})
export class NavbarModule {}
