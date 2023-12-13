import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'disney-clone';
  isScrolled: boolean = false;

  @HostListener('window:scroll') //per mettersi in ascolto delle evento scroll di window
  onScroll() {
    this.isScrolled = window.scrollY > 0;
  }
}
