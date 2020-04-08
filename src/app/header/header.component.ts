import { Router } from '@angular/router';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NewEmailComponent } from 'src/app/shared/dialogs/new-email/new-email.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  modalReference: NgbModalRef;
  logo = '';
  firstName = '';
  lastName = '';
  admin;
  currentUser;

  constructor(private modalService: NgbModal,
              private userService: UserService,
              private router: Router) {
                if (!localStorage.getItem('currentUser')) {
                  this.userService.currentUser.subscribe((x) => {
                    this.currentUser = x;
                  });
                } else {
                  this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
                }

                // this.userService.getUserInfo().subscribe(
                //   (res) => {
                //     this.firstName = res.user.firstName;
                //     this.lastName = res.user.lastName;
                //     this.logo = res.user.logo;
                //   },
                //   (error: any) => {
                //     console.log(error);
                //   }
                // );
              }

  ngOnInit() {
    this.admin = this.userService.isAdmin();
  }

  openNewEmailModal() {
    this.modalReference = this.modalService.open(NewEmailComponent, { backdrop: 'static', size: 'xl', keyboard: false, centered: true });
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
