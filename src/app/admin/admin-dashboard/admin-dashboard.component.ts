import { environment } from 'src/environments/environment.prod';
import { HttpService } from './../../services/http.service';
import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import * as moment from 'moment';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  public isCollapsed: boolean[] = [];
  pageOfItems: Array<any>;
  signups;
  emailActivities;
  customers;
  firstName = 'Brent';
  lastName = 'Gilmore';
  currentPage = 1;
  currentCustomerPage;
  itemsPerPage = 5;
  pageSize: number;
  isShowSignups = true;
  isShowCustomers = false;
  errorMessage;
  noCharge;

  constructor(private userService: UserService,
              private router: Router,
              private config: NgbPaginationConfig,
              private httpService: HttpService) {
                config.size = 'sm';
                config.boundaryLinks = true;
               }

  ngOnInit() {
    this.userService.getSignups().subscribe(
      (res) => {
        this.signups = res.signUps;
        for(let i=0; i<this.signups.length; i++) {
          this.noCharge = this.signups[i].user.noCharge;
        }
      }
    );
    this.userService.getCustomers().subscribe(
      (res) => {
        this.customers = res.customerList;
      }
    );
  }

  loginAs(user: string) {
    const headers = {
          headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', Authorization: `Bearer token` })
    };
    const body = `user=${user}`;
    this.httpService.postToUrl(environment.loginAsUser, body, headers).subscribe(
      (res) => {
        localStorage.setItem('access_token', res.access_token);
        this.userService.getUserInfo().subscribe(
          (data) => {
            localStorage.setItem('currentUser', JSON.stringify(data.user));
            this.router.navigateByUrl('/');
          });
        // this.router.navigateByUrl('/');
      }, (error:HttpErrorResponse) => {
        let errorPayload = JSON.parse(error.message);
      }
    );
  }

  public onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage * (pageNum - 1);
  }

  onLogout() {
    this.userService.logout();
    this.router.navigateByUrl('/login');
  }

  toggleDisplaySignups() {
    this.isShowSignups = true;
    this.isShowCustomers = false;
  }

  toggleDisplayCustomers() {
    this.isShowCustomers = true;
    this.isShowSignups = false;
  }

  onShouldCharge(id, noCharge) {
    const body = `user=${id}&noCharge=${noCharge}`;
    let token = localStorage.getItem('admin_token');
    const headers = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', Authorization: token})
    };
    return this.httpService.postToUrl(environment.noCharge, body, headers).subscribe(
      (res) => {
      }, (error: HttpErrorResponse) => {
        this.errorMessage = error.error.message;
    }
    );
  }

}
