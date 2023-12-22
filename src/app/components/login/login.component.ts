import { Component } from '@angular/core';
import { Subscription, catchError, of } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoginDto } from '../../models/auth';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private emailSubscription: Subscription;
  private passwordSubscription: Subscription;
  private buttonClickSubscription: Subscription;
  email!: string;
  password!: string;
  model!: LoginDto;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {
    this.emailSubscription = this.authService.email$.subscribe((email) => {
      this.email = email;
    });

    this.passwordSubscription = this.authService.password$.subscribe(
      (password) => {
        this.password = password;
      }
    );

    this.buttonClickSubscription = this.authService.buttonClick$.subscribe(
      () => {
        this.model = new LoginDto(this.email, this.password);

        this.authService
          .login(this.model)
          .pipe(
            catchError((err: HttpErrorResponse) => {
              this.errorMessage = err.error;
              this.authService.emitError(this.errorMessage);
              return of(undefined);
            })
          )
          .subscribe((loggedUser) => {
            if (loggedUser) {
              this.router.navigate(['/home']);
            }
          });
      }
    );
  }

  ngOnDestroy() {
    this.emailSubscription.unsubscribe();
    this.passwordSubscription.unsubscribe();
    this.buttonClickSubscription.unsubscribe();
  }
}
