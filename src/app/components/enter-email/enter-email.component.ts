import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-enter-email',
  templateUrl: './enter-email.component.html',
  styleUrl: './enter-email.component.scss'
})
export class EnterEmailComponent {
  email!: string;

  constructor(private authService: AuthService) {}

  onEmailChange() {
    this.authService.emailChange(this.email)
  }
}
