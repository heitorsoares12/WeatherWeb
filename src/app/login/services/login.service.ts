import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'https://localhost:44341/api/User';

  constructor(private http: HttpClient) {}

  login(cpf: string): Observable<any> {
    const url = `${this.apiUrl}/user?cpf=${cpf}`;
    return this.http.get<any>(url);
  }

  register(cpf: string): Observable<any> {
    const url = `${this.apiUrl}/user?cpf=${cpf}`;
    return this.http.post<any>(url, {});
  }
}
