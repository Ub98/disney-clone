import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  LoggedUser,
  LoginDto,
  RegisterDto,
  UserChangePassword,
} from '../models/auth';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  email!: string;

  setEmail(email: string) {
    this.email = email;
  }

  get isEmail(): string {
    return this.email;
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

  changePassword(password: string): Observable<UserChangePassword> {
    const userId = this.getLoggedUser()!.user.id;

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.getLoggedUser()!.accessToken,
      }),
    };

    return this.http.put<UserChangePassword>(
      `${environment.JSON_SERVER_BASE_URL}/users/${userId}`,
      {
        email: this.getLoggedUser()!.user.email,
        password: password,
        name: this.getLoggedUser()!.user.name,
      },
      httpOptions
    );
  }
}
