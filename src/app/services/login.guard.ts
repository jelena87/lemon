import { UserService } from './user.service';
import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private router: Router,
              private userService: UserService) { }

  canActivate() {
    // return false;
    if (!this.userService.isAuth()) {
    this.userService.logout();
    this.router.navigateByUrl('/login');
    return false;
    }
    return true;
  }

}
