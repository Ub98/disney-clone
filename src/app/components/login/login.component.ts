import { Component } from '@angular/core';
import { Subscription} from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoginDto } from '../../models/auth';

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

        this.authService.login(this.model).subscribe((loggedUser) => {
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
