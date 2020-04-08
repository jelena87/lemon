import { AlmostDoneComponent } from 'src/app/shared/dialogs/almost-done/almost-done.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from './../../services/user.service';
import { EmailsData } from './../../models/email.model';
import { Router, NavigationExtras } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-send-list-of-emails',
  templateUrl: './send-list-of-emails.component.html',
  styleUrls: ['./send-list-of-emails.component.scss']
})
export class SendListOfEmailsComponent implements OnInit {
  emailsData;
  message;
  text = 'It was wonderful working with you!';
  businessName = '';
  googleReviewLink = '';
  logo: '';
  emails = [];
  modalReference: NgbModalRef;
  customer = false;
  currentUser;
  disableButton = true;

  constructor(private router: Router,
              private modalService: NgbModal,
              private userService: UserService) {
              // this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
              // this.logo = this.currentUser.logo;
              // this.customer = this.currentUser.shouldCharge;
              // this.businessName = this.currentUser.businessName;
              // this.googleReviewLink = this.currentUser.googleReviewLink;
              // if ((this.businessName === '' || this.businessName === null)
              // || (this.googleReviewLink === '' || this.googleReviewLink === null)
              // || (this.logo === null || this.logo.indexOf('default.png') > 0)) {
              //   this.router.navigateByUrl('/');
              // }
              const navigation = this.router.getCurrentNavigation();
              const state = navigation.extras.state as {emailsData: EmailsData};
              this.emailsData = state;
              if (this.emailsData) {
                this.text = this.emailsData.message;
              }
   }

  ngOnInit() {
    if (this.emailsData) {
      for (let i=0; i< this.emailsData.emails.length; i++) {
        if (this.emailsData.emails[i].includes('@')) {
          this.emails.push(this.emailsData.emails[i]);
          this.disableButton = false;
        }
      }
    }
    this.userService.getUserInfo().subscribe(
      (res) => {
        this.customer = res.user.shouldCharge;
        this.logo = res.user.logo;
        this.businessName = res.user.businessName;
        this.googleReviewLink = res.user.googleReviewLink;
        if ((this.businessName === '' || this.businessName === null)
        && (this.googleReviewLink === '' || this.googleReviewLink === null)) {
      this.router.navigateByUrl('/');
    }
      },
      (error: any) => {

      }
    );
  }

  uploadMore() {
    if (this.emailsData !== undefined) {
      const navigationExtras: NavigationExtras = {state: {emails: this.emailsData.emails, message: this.text}};
      this.router.navigate(['/upload'], navigationExtras);
    } else {
      this.router.navigate(['/upload']);
    }
  }

  onSubmitWithMessage(message) {
    if (!this.customer) {
      this.text = message;
      const navigationExtras: NavigationExtras = {state: {emails: this.emailsData.emails, message: this.text}};
      this.router.navigate(['/send-multiple-emails'], navigationExtras);
    } else {
      this.openAlmostDoneModal();
    }
  }

  openAlmostDoneModal() {
    this.modalReference = this.modalService.open(AlmostDoneComponent, { backdrop: 'static', size: 'lg', keyboard: false, centered: true });
    const emailsModal = {
      emails: this.emailsData.emails,
      message: this.text,
    }

    this.modalReference.componentInstance.fromParent = emailsModal;
    this.modalReference.result.then((result) => {
    }, (reason) => {
    });
  }

}
