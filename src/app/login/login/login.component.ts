import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  cpf: string = '';
  newCpf: string = '';
  showRegisterForm: boolean = false;

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    
  }

  toggleRegister() {
    this.showRegisterForm = !this.showRegisterForm;
  }

  submitLoginForm() {
    this.loginService.login(this.cpf).subscribe(
      (user: any) => {
        console.log('Usuário encontrado:', user);
      },
      (error) => {
        console.error('Erro ao buscar usuário:', error);
      }
    );
  }

  submitRegisterForm() {
    this.loginService.register(this.newCpf).subscribe(
      (response: any) => {
        console.log('Usuário cadastrado com sucesso:', response);
      },
      (error) => {
        console.error('Erro ao cadastrar usuário:', error);
      }
    );
  }
}
