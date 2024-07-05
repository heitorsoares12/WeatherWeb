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
  private userApiUrl = 'https://localhost:44341/api/User/';

  constructor(private http: HttpClient) { }

  getWeatherByCity(city: string): Observable<Weather> {
    return this.http.get<Weather>(`${this.apiUrl}/${city}`).pipe();
  }

  favoriteCity(user: string, cityName: string): Observable<any> {
    const params = new HttpParams().set('cityName', cityName);
    return this.http.post(this.userApiUrl + user + '/favorites', {},  { params });
  }

  getUserFavorites(user: string): Observable<UserFavoritesResponse> {
    try {
      const retorno =  this.http.get<UserFavoritesResponse>(`${this.userApiUrl + user + '/favorites'}`).pipe();;
      return retorno;
    }
    catch (error) {
      throw error;
    }
  }

  unfavoriteCity(user: string, cityName: string): Observable<any> {
    const params = new HttpParams().set('cityName', cityName);
    return this.http.delete(`${this.userApiUrl}${user}/favorites`, { params });
  }

}
