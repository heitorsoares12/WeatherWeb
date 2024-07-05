import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    MatSelectModule,
    MatFormFieldModule,
    MatTableModule,
    MatCardModule,
  ],
})
export class WeatherModule { }
