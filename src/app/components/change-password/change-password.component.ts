import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent {
  hide = true;
  password!: string;
  errorMessage!: string;

  constructor(public authService: AuthService, private router: Router) {}

  changePassword() {
    this.authService
      .changePassword(this.password)
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
