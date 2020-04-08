import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { WelcomeComponent } from './../../shared/dialogs/welcome/welcome.component';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { NewEmailComponent } from 'src/app/shared/dialogs/new-email/new-email.component';
import { environment } from 'src/environments/environment.prod';
import { HttpService } from './../../services/http.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
reviews = [];
noReviews = false;
modalReference: NgbModalRef;
public currentUser;
logo = '';
firstName = '';
lastName = '';
businessName;
googleReviewLink;
admin;

  constructor(private httpService: HttpService,
              private modalService: NgbModal,
              private userService: UserService,
              private router: Router) {
                  this.httpService.getFromUrl(environment.getReviewList)
                  .subscribe(
                    (data) => {
                      this.reviews = data.reviews;
                      if (this.reviews.length !== 0) {
                        this.noReviews = false;
                      } else {
                        this.noReviews = true;
                      }
                    },
                    (err: any) => {});
                  this.userService.getUserInfo().subscribe(
                    (res) => {
                      this.firstName = res.user.firstName;
                      this.lastName = res.user.lastName;
                      this.logo = res.user.logo;
                      this.businessName = res.user.businessName;
                      this.googleReviewLink = res.user.googleReviewLink;
                      if ((this.businessName === '' || this.businessName === null)
                      || (this.googleReviewLink === '' || this.googleReviewLink === null)
                      || (this.logo === null || this.logo.indexOf('default.png') > 0)) {
                      this.openWelcomeModal();
                      }
                            },
                            (error: any) => {
                            }
                          );
              }

  ngOnInit() {
    this.admin = this.userService.isAdmin();
    this.getReviews();
  }

  public getReviews() {
    this.httpService.getFromUrl(environment.getReviewList)
                  .subscribe(
                    (data) => {
                      this.reviews = data.reviews;
                    },
                    (err: any) => {});
  }

  openNewEmailModal() {
    this.modalReference = this.modalService.open(NewEmailComponent, { backdrop: 'static', size: 'xl', keyboard: false, centered: true });
  }

  openWelcomeModal() {
      this.modalReference = this.modalService.open(WelcomeComponent, { backdrop: 'static', size: 'sm', keyboard: false, centered: true });
  }

  onLogout() {
    this.userService.logout();
    this.router.navigateByUrl('/login');
  }

  onSettings() {
    this.router.navigateByUrl('/account');
  }

  onReturnToAdmin() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('currentUser');
    this.router.navigateByUrl('/admin-dashboard');
  }

}
