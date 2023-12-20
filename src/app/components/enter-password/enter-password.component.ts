import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-enter-password',
  templateUrl: './enter-password.component.html',
  styleUrl: './enter-password.component.scss'
})
export class EnterPasswordComponent {
  hide = true;
  password!: string;

  constructor(public authService: AuthService) {}

  onButtonClick() {
    this.authService.emitPassword(this.password);
    this.authService.emitButtonClick();
  }
}
