import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Weather } from './model/weather';
import { MatCardModule } from '@angular/material/card';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [MatTableModule, MatCardModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss',
})
export class WeatherComponent implements OnInit {
  weathers: Weather[] = [
    {
      _id: '1',
      Location: 'Catanduva',
      Temp: 'string',
      FeelsLike: 'string',
      MaxTemp: 'string',
      MinTemp: 'string',
    },
  ];
  displayedColumns = ['Local', 'Temp', 'Max', 'Min'];

  

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {}
}
