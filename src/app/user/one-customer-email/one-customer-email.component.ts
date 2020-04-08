import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { EmailData } from './../../models/email.model';
import { AlmostDoneComponent } from 'src/app/shared/dialogs/almost-done/almost-done.component';

@Component({
  selector: 'app-one-customer-email',
  templateUrl: './one-customer-email.component.html',
  styleUrls: ['./one-customer-email.component.scss']
})
export class OneCustomerEmailComponent implements OnInit {
  emailData: EmailData;
  message = 'It was wonderful working with you!';
  modalReference: NgbModalRef;
  businessName = '';
  googleReviewLink = '';
  logo: '';
  customer = false;
  email;
  oldEmails;
  currentUser;

  constructor(private router: Router,
              private modalService: NgbModal) {
                const navigation = this.router.getCurrentNavigation();
                const state = navigation.extras.state as {emails: EmailData};
                this.oldEmails = state;
                this.emailData = {
                  email: ''
                }
                if (this.oldEmails) {
                  this.emailData = {
                    email: this.oldEmails.emails
                  };
                  this.message = this.oldEmails.message;
                }
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
    //     console.log(res);
    //     this.customer = res.user.noCharge;
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

  onSubmit(emailData: EmailData) {
      const navigationExtras: NavigationExtras = {state: {emailData: emailData, message: this.message}};
      this.router.navigate(['/send-emails'], navigationExtras);
  }

  OnInput(value) {
    this.email = value;
    }

  openAlmostDoneModal() {
    this.modalReference = this.modalService.open(AlmostDoneComponent, { backdrop: 'static', size: 'xl', keyboard: false, centered: true });
    const emailsModal = {
      emails: this.email.email,
      message: this.email.message
    }

    this.modalReference.componentInstance.fromParent = emailsModal;
    this.modalReference.result.then((result) => {
    });
  }

}
