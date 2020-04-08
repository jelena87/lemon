import { Component, OnInit } from '@angular/core';
import { UserService } from './../../services/user.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      email: new FormControl('', {validators: [Validators.required, Validators.email]}),
      password: new FormControl('', {validators: [Validators.required, Validators.minLength(4)]}),
      firstName: new FormControl('', {validators: [Validators.required]}),
      lastName: new FormControl('', {validators: [Validators.required]})
    });
  }

  onSubmit() {
    const val = this.signupForm.value;

    if (val.email && val.password) {
        this.userService.register(val.email, val.password, val.firstName, val.lastName)
            .subscribe(
                (res) => {
                    this.router.navigateByUrl('/');
                }, (error:HttpErrorResponse) => {
                  let errorPayload = JSON.parse(error.message);
              });
    }
  }
}
