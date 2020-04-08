import { ToastService } from './toast.service';
import { EmailData, EmailsData } from './../models/email.model';
import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Injectable()
export class EmailService {
  emailData: EmailData[];
  emailsData: EmailsData[];

  constructor(private httpService: HttpService,
              private router: Router,
              private toast: ToastService) {}

  public sendEmail(email: string, firstName?: string, lastName?: string, phoneNumber?: number, message?: string) {
    const emailData: EmailData = {email: email, firstName: firstName, lastName: lastName, phoneNumber: phoneNumber, message: message};
    return this.httpService.postToUrl(environment.emailService, emailData)
    .subscribe(
      (data: any) => {
        this.router.navigate(['/success']);
      },
      (err: any) => {
        this.toast.show(err.message, { classname: 'bg-danger text-light', delay: 10000 });
      }
    );
  }

  public sendEmails(emails: [], message?: string) {
    const emailsData: EmailsData = {emails: emails, message: message};
    this.httpService.postToUrl(environment.emailService, emailsData)
    .subscribe(
      (data: any) => {
        this.router.navigate(['/success']);
      },
      (err: any) => {
        this.toast.show(err.message, { classname: 'bg-danger text-light', delay: 10000 });
      }
    );
  }

}
