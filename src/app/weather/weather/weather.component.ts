import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Weather } from './model/weather';
import { WeatherService } from '../services/weather.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { FavoriteCity, UserFavoritesResponse } from './model/user-favorite';
import { catchError, forkJoin, map, of } from 'rxjs';
import { MatButtonModule, MatFabButton } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule,
    MatTableModule,
    MatCardModule,
    MatSelectModule,
    MatIconModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss',
})
export class WeatherComponent implements OnInit {
  dataSource = new MatTableDataSource<Weather>();
  displayedColumns = ['Local', 'Temp', 'FeelsLike', 'Condition', 'Favorite'];
  cities: string[] = ['Catanduva', 'São Paulo', 'Rio de Janeiro', 'Belo Horizonte'];
  selectedCity: string = this.cities[0];
  favorites: string[] = [];
  showFavoritesTable = false;

  constructor(private weatherService: WeatherService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getWeather(this.selectedCity);
  }

  getWeather(city: string): void {
    this.weatherService.getWeatherByCity(city).subscribe(
      weather => {
        this.dataSource.data = [weather];;
      },
      error => {
        console.error('Erro ao obter dados do clima:', error);
      }
    );

    this.loadUserFavorites();
  }

  onCityChange(city: string): void {
    this.getWeather(city);
    this.loadUserFavorites();
  }

  toggleFavorite(cityName: string): void {
    this.weatherService.favoriteCity(cityName).subscribe(
      response => {
        this.snackBar.open(`Cidade ${cityName} favoritada com sucesso!`, 'Fechar', {
          duration: 3000,
        });
        this.loadUserFavorites(); // Atualiza a lista de favoritos após favoritar uma cidade
      },
      error => {
        this.snackBar.open(`Erro ao favoritar cidade ${cityName} `, 'Fechar', {
          duration: 3000,
        });
      }
    );
  }

  loadUserFavorites(): void {
    this.weatherService.getUserFavorites().pipe(
      map((response: UserFavoritesResponse) => {
        if (response) {
          const favoriteCities: FavoriteCity[] = response.$values;
          return favoriteCities.map(city => city.cityName);
        } else {
          return [];
        }
      }),
      catchError((error) => {
        this.snackBar.open('Erro ao carregar cidades favoritas', 'Fechar', {
          duration: 3000,
        });
        return of([]);
      })
    ).subscribe((favorites: string[]) => {
      this.favorites = favorites;
    });
  }

  isFavorite(cityName: string): boolean {
    return this.favorites.includes(cityName);
  }

  toggleView(): void {
    this.showFavoritesTable = !this.showFavoritesTable;
    if (this.showFavoritesTable) {
      this.getWeatherForFavorites();
    } else {
      this.getWeather(this.selectedCity); // Carrega dados da cidade selecionada ao desativar showFavoritesTable
    }
  }

  getWeatherForFavorites(): void {
    const requests = this.favorites.map(city =>
      this.weatherService.getWeatherByCity(city)
    );

    forkJoin(requests).subscribe(
      (results: Weather[]) => {
        this.dataSource.data = results;
      },
      error => {
        console.error('Erro ao obter dados do clima para favoritos:', error);
        this.snackBar.open('Erro ao obter dados do clima para favoritos', 'Fechar', {
          duration: 3000,
        });
      }
    );
  }
}
