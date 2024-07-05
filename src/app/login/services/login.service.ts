import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../login/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'https://localhost:44341/api/User';

  constructor(private http: HttpClient) {}

  login(cpf: string): Observable<User> {
    const url = `${this.apiUrl}/user?cpf=${cpf}`;
    return this.http.get<User>(url);
  }

  register(cpf: string): Observable<User> {
    const url = `${this.apiUrl}/user?cpf=${cpf}`;
    return this.http.post<User>(url, {});
  }
}
