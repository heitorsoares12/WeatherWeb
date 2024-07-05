import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NavigationExtras, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {

  }

  toggleRegister() {
    this.showRegisterForm = !this.showRegisterForm;
  }

  submitLoginForm() {
    this.loginService.login(this.cpf).subscribe(
      (user: any) => {
        const navigationExtras: NavigationExtras = {
          state: { user }
        };
        this.router.navigate(['/weather'], navigationExtras);
      },
      (error) => {
        this.snackBar.open(`Erro ao buscar usuário`, 'Fechar', {
          duration: 3000,
        });
      }
    );
  }

  submitRegisterForm() {
    this.loginService.register(this.newCpf).subscribe(
      (response: any) => {
        this.snackBar.open(`Usuário cadastrado com sucesso!`, 'Fechar', {
          duration: 3000,
        });
      },
      (error) => {
        this.snackBar.open(`Erro ao cadastrar usuário: ${error.message}`, 'Fechar', {
          duration: 3000,
        });
      }
    );
  }
}
