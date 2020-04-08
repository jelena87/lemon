import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from './../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', {validators: [Validators.required, Validators.email]}),
      password: new FormControl('', {validators: [Validators.required, Validators.minLength(4)]})
    });
  }

  login() {
    const val = this.loginForm.value;

    if (val.username && val.password) {
        this.userService.login(val.username, val.password)
            .subscribe(
                (res) => {
                    this.router.navigateByUrl('/');
                }, (error: HttpErrorResponse) => {
                  this.errorMessage = error.error.message;
              });
    }
}

}
