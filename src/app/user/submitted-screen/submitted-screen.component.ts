import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-submitted-screen',
  templateUrl: './submitted-screen.component.html',
  styleUrls: ['./submitted-screen.component.scss']
})
export class SubmittedScreenComponent implements OnInit {

  constructor(private userService: UserService,
              private router: Router) {
    // if (!this.userService.isAuth()) {
    //   this.router.navigateByUrl('/login');
    // }
  }

  ngOnInit() {
  }

}
