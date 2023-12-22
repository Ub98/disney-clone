import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-enter-password',
  templateUrl: './enter-password.component.html',
  styleUrl: './enter-password.component.scss',
})
export class EnterPasswordComponent {
  private errorMessageSubscription: Subscription;
  hide = true;
  password!: string;
  errorMessage!: string;

  constructor(public authService: AuthService) {
    this.errorMessageSubscription = this.authService.errorMessage$.subscribe(
      (error) => {
        this.errorMessage = error;
      }
    );
  }

  onButtonClick() {
    this.authService.emitPassword(this.password);
    this.authService.emitButtonClick();
  }

  ngOnDestroy() {
    this.errorMessageSubscription.unsubscribe();
  }
}
