import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Weather } from '../weather/model/weather';
import { UserFavoritesResponse } from '../weather/model/user-favorite';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiUrl = 'https://localhost:44341/api/weather';
  private userApiUrl = 'https://localhost:44341/api/User/1/favorites';

  constructor(private http: HttpClient) { }

  getWeatherByCity(city: string): Observable<Weather> {
    return this.http.get<Weather>(`${this.apiUrl}/${city}`).pipe();
  }

  favoriteCity(cityName: string): Observable<any> {
    const params = new HttpParams().set('cityName', cityName);
    return this.http.post(this.userApiUrl, {}, { params });
  }

  getUserFavorites(): Observable<UserFavoritesResponse> {
    try {
      const retorno =  this.http.get<UserFavoritesResponse>(`${this.userApiUrl}`).pipe();;
      return retorno;

    }
    catch (error) {
      console.error('Erro ao obter Favoritos do Usuario.', error);
      throw error;
    }
  }
}
