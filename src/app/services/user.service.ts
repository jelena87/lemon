import { User } from './../models/user.model';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment.prod';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable()
export class UserService {
  authChange = new Subject<boolean>();
  admin;
  userData;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

constructor(private httpService: HttpService,
            private router: Router) {
              this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
              this.currentUser = this.currentUserSubject.asObservable();
}

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  register(email: string, password: string, firstName: string, lastName: string) {
      const body = `email=${email}&password=${password}&firstName=${firstName}&lastName=${lastName}`;
      const headers = {
        headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', Authorization: `Bearer token` })
    };
      return this.httpService.postToUrl(environment.signup, body, headers).pipe(tap(
        (res) =>{
        localStorage.setItem('access_token', res.access_token);
        },
        (err) => console.log(err)));
  }

  login(username: string, password: string ) {
    const headers = {
          headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', Authorization: `Bearer token` })
      };
    const body = `username=${username}&password=${password}`;
    return this.httpService.postToUrl(environment.login, body, headers)
    .pipe(tap(
    (res) => {
      localStorage.setItem('access_token', res.access_token);

      this.getUserInfo().subscribe(
          (data) => {
            localStorage.setItem('currentUser', JSON.stringify(data.user));
            this.currentUserSubject.next(data.user);
            if ('admin' in data.user && data.user.admin) {
              localStorage.setItem('admin_token', res.access_token);
              localStorage.removeItem('currentUser');
              this.router.navigateByUrl('/admin-dashboard');
            } else {
              // localStorage.removeItem('access_token');
              this.router.navigateByUrl('/');
            }
            return this.userData;
          }
        );
    }, (err) => console.log(err)));
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('admin_token');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigateByUrl('/login');
  }

  public isAuth(): boolean {
    return null !== localStorage.getItem('access_token');
  }

  public isAdmin(): boolean {
    return null !== localStorage.getItem('admin_token');
  }

  getUserInfo() {
    return this.httpService.getFromUrl(environment.userInfo);
  }

  getSignups() {
    return this.httpService.getFromUrl(environment.signups);
  }

  getCustomers() {
    return this.httpService.getFromUrl(environment.customers);
  }

}
