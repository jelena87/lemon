import { UserService } from './../../services/user.service';
import { EmailsData } from './../../models/email.model';
import { Router } from '@angular/router';
import { EmailService } from 'src/app/services/email.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-send-multiple-emails',
  templateUrl: './send-multiple-emails.component.html',
  styleUrls: ['./send-multiple-emails.component.scss']
})
export class SendMultipleEmailsComponent implements OnInit {
  emailsData;
  logo;
  emails = [];
  currentUser;
  disableButton = false;

  constructor(private emailService: EmailService,
              private router: Router,
              private userService: UserService) {
  const navigation = this.router.getCurrentNavigation();
  const state = navigation.extras.state as {emailsData: EmailsData};
  this.emailsData = state;
  this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  this.logo = this.currentUser.logo;
  }

  ngOnInit() {
    if (this.emailsData) {
      for (let i=0; i< this.emailsData.emails.length; i++) {
        if (this.emailsData.emails[i].includes('@')) {
          this.emails.push(this.emailsData.emails[i]);
        }
      }
    }
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
    .sendEmails(this.emailsData.emails, this.emailsData.message);
    this.disableButton = true;
  }

}
