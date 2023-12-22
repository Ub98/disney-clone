import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription, catchError, of } from 'rxjs';
import { LoginDto } from '../../models/auth';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enter-password',
  templateUrl: './enter-password.component.html',
  styleUrl: './enter-password.component.scss',
})
export class EnterPasswordComponent {
  hide = true;
  password!: string;
  errorMessage!: string;
  model!: LoginDto;

  constructor(public authService: AuthService, private router: Router) {}

  onButtonClick() {
    this.model = new LoginDto(this.authService.isEmail, this.password);

    this.authService
      .login(this.model)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.errorMessage = err.error;
          return of(undefined);
        })
      )
      .subscribe((loggedUser) => {
        if (loggedUser) {
          this.router.navigate(['/home']);
        }
      });
  }
}
