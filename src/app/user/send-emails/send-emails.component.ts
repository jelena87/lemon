import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { EmailData } from './../../models/email.model';
import { EmailService } from './../../services/email.service';

@Component({
  selector: 'app-send-emails',
  templateUrl: './send-emails.component.html',
  styleUrls: ['./send-emails.component.scss']
})
export class SendEmailsComponent implements OnInit {
  emailData;
  emails;
  logo;
  currentUser;
  dissableButton = false;

  constructor(private emailService: EmailService,
              private router: Router,
              private userService: UserService) {
  const navigation = this.router.getCurrentNavigation();
  const state = navigation.extras.state as {emailData: EmailData};
  this.emailData = state.emailData;
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.logo = this.currentUser.logo;
    // this.userService.getUserInfo().subscribe(
    //   (res) => {
    //     this.logo = res.user.logo;
    //   },
    //   (error: any) => {
    //     console.log(error);
    //   }
    // );
  }


  onSend() {
    this.emailService
    .sendEmail(this.emailData.email, this.emailData.firstName, this.emailData.lastName, this.emailData.phoneNumber, this.emailData.message);
    this.dissableButton = true;
  }

}
