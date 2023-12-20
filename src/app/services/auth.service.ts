import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoggedUser, LoginDto, RegisterDto } from '../models/auth';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private emailSource = new Subject<string>();
  private passwordSource = new Subject<string>();
  private buttonClickSource = new Subject<void>();
  email!: string;
  password!: string;

  email$ = this.emailSource.asObservable();
  password$ = this.passwordSource.asObservable();
  buttonClick$ = this.buttonClickSource.asObservable();

  emitEmail(email: string) {
    this.emailSource.next(email);
    this.email = email;
  }

  emitPassword(password: string) {
    this.passwordSource.next(password);
    this.password = password;
  }

  emitButtonClick() {
    this.buttonClickSource.next();
  }

  constructor(private http: HttpClient) {}

  login(model: LoginDto): Observable<LoggedUser> {
    return this.http
      .post<LoggedUser>(`${environment.JSON_SERVER_BASE_URL}/login`, model)
      .pipe(tap((user) => this.setLoggedUser(user)));
  }

  register(model: RegisterDto): Observable<LoggedUser> {
    return this.http.post<LoggedUser>(
      `${environment.JSON_SERVER_BASE_URL}/register`,
      model
    );
  }

  setLoggedUser(user: LoggedUser) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getLoggedUser(): LoggedUser | null {
    let userStorage = localStorage.getItem('user');
    if (userStorage != null) {
      let u: LoggedUser = JSON.parse(userStorage);
      return u;
    }
    return null;
  }

  get isUserLogged(): boolean {
    return this.getLoggedUser() != null;
  }

  logOut() {
    localStorage.removeItem('user');
  }
}
