import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';

@NgModule({
  declarations: [],
  imports: [MatToolbarModule, MatIconModule, MatSliderModule],
  exports: [MatToolbarModule, MatIconModule, MatSliderModule],
})
export class MaterialModule {}
