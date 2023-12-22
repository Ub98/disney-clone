import { Component } from '@angular/core';
import { RegisterDto } from '../../models/auth';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  hide = true;
  errorMessage!: string;
  model= new RegisterDto

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  register() {
    this.authService
      .register(this.model)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.errorMessage = err.error;
          return of(undefined);
        })
      )
      .subscribe((loggedUser) => {
        if (loggedUser) {
          this.authService.setLoggedUser(loggedUser)
          this.router.navigate(['/home']);
        }
      });
  }
}
