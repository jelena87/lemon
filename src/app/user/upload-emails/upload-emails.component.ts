import { UserService } from './../../services/user.service';
import { EmailsData } from './../../models/email.model';
import { Router, NavigationExtras } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-emails',
  templateUrl: './upload-emails.component.html',
  styleUrls: ['./upload-emails.component.scss']
})

export class UploadEmailsComponent implements OnInit {
  emailsData: EmailsData;
  emailInfo;
  oldEmails;
  editor;
  message = 'It was wonderful working with you!';
  businessName = '';
  googleReviewLink = '';
  logo: '';
  currentUser;

  constructor(private router: Router,
              private userService: UserService) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as {emails: EmailsData};
    this.oldEmails = state;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.logo = this.currentUser.logo;
    this.businessName = this.currentUser.businessName;
    this.googleReviewLink = this.currentUser.googleReviewLink;
    if ((this.businessName === '' || this.businessName === null)
    || (this.googleReviewLink === '' || this.googleReviewLink === null)
    || (this.logo === null || this.logo.indexOf('default.png') > 0)) {
      this.router.navigateByUrl('/');
    }
  }

  ngOnInit() {
    // this.userService.getUserInfo().subscribe(
    //   (res) => {
    //     this.logo = res.user.logo;
    //     this.businessName = res.user.businessName;
    //     this.googleReviewLink = res.user.googleReviewLink;
    //     if ((this.businessName === '' || this.businessName === null)
    //     && (this.googleReviewLink === '' || this.googleReviewLink === null)) {
    //   this.router.navigateByUrl('/');
    // }
    //   },
    //   (error: any) => {
    //     console.log(error);
    //   }
    // );
  }

  onSubmit() {
    const textArea = document.getElementsByClassName('CodeMirror-code');
    for (var i = 0; i < textArea.length; i++) {
      this.emailInfo = (textArea[i] as HTMLElement).innerText.split(/[\r\n]+/);
    }

    if (this.emailsData === undefined) {
      this.emailsData = {emails: []};
    }

    this.emailsData.emails = this.emailInfo.filter(function(element, index, array) {
      return (index % 2 !== 0);
    });

    if (this.oldEmails) {
      this.emailsData.emails = this.oldEmails.emails.concat(this.emailsData.emails);
      this.emailsData.message = this.oldEmails.message;
    } else {
      this.emailsData.message = this.message;
    }
    const navigationExtras: NavigationExtras = {state: {emails: this.emailsData.emails, message: this.emailsData.message}};
    this.router.navigate(['/upload-emails'], navigationExtras);
  }


}
