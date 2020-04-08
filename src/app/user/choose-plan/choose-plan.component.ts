import { UserService } from './../../services/user.service';
import { environment } from './../../../environments/environment';
import { HttpService } from './../../services/http.service';
import { EmailsData } from './../../models/email.model';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { FreeTrialComponent } from './../../shared/dialogs/free-trial/free-trial.component';

@Component({
  selector: 'app-choose-plan',
  templateUrl: './choose-plan.component.html',
  styleUrls: ['./choose-plan.component.scss']
})
export class ChoosePlanComponent implements OnInit {
  modalReference: NgbModalRef;
  emailsData;
  plans;
  display = false;
  currentUser;
  admin;

  constructor(private modalService: NgbModal,
              private router: Router,
              private httpService: HttpService,
              private userService: UserService) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as {emailsData: EmailsData};
    this.emailsData = state;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.httpService.getFromUrl(environment.plans).subscribe(
      (res) => {
        this.plans = res.plans;
        this.display = true;
      }, (err) => {}
    );
  }

  openFreeTrialModal(id, amount) {
    this.modalReference = this.modalService.open(FreeTrialComponent, { backdrop: 'static', size: 'lg', keyboard: false, centered: true });
    const emailsModal = {
      emails: this.emailsData.emails,
      message: this.emailsData.message,
      oneEmailSent: this.emailsData.oneEmailSent,
      planId: id,
      amount: amount
    }

    this.modalReference.componentInstance.fromParent = emailsModal;
    this.modalReference.result.then((result) => {
      console.log(result);
    }, (reason) => {
    });
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
