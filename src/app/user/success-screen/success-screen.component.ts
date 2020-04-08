import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-success-screen',
  templateUrl: './success-screen.component.html',
  styleUrls: ['./success-screen.component.scss']
})
export class SuccessScreenComponent implements OnInit {

  constructor(private userService: UserService,
              private router: Router) {
            // if (!this.userService.isAuth()) {
            // this.router.navigateByUrl('/login');
            // }
  }

  ngOnInit() {
  }

}
