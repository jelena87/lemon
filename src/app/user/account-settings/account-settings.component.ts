import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';
import { HttpService } from './../../services/http.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {
  logoFile: File = null;
  logo: any;
  uploadForm: FormGroup;
  businessName = 'Enter your business name';
  googleReviewLink = 'ex. Google Reviews';
  saveText = 'Save & Continue';
  errorSettings;
  emailArrowImg = false;
  currentUser;

  constructor(private httpService: HttpService,
              private userService: UserService,
              private router: Router,
              private toast: ToastService) {
                this.userService.getUserInfo().subscribe(
                  (res) => {
                    this.businessName = res.user.businessName;
                    this.googleReviewLink = res.user.googleReviewLink;
                    this.logo = res.user.logo;
                  },
                  (error: any) => {
                  }
                );
               }

  ngOnInit() {
    this.uploadForm = new FormGroup({
      businessName: new FormControl(''),
      googleReviewLink: new FormControl('')
    });
  }

  onFileSelected(event) {
    this.logoFile = <File>event.target.files[0];
    if (event.target.files && this.logoFile) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
      this.logo = (<FileReader>event.target).result;
      }
    }
  }

  onUpload() {
    this.saveText = 'Saving...';
    this.errorSettings = '';
    const val = this.uploadForm.value;
    // Get the existing data
    let existingUser = localStorage.getItem('currentUser');

    // If no existing data, create an array
    // Otherwise, convert the localStorage string to an array
    existingUser = existingUser ? JSON.parse(existingUser) : {};

    // Add new data to localStorage Array
    existingUser['businessName'] = val.businessName;
    existingUser['googleReviewLink'] = val.googleReviewLink;
    existingUser['logo'] = this.logo;

    // Save back to localStorage
    localStorage.setItem('currentUser', JSON.stringify(existingUser));
    const fd = new FormData();
    if (this.logoFile) {
      fd.append('logo', this.logoFile, this.logoFile.name);
    }
    fd.append('businessName', val.businessName);
    fd.append('googleReviewLink', val.googleReviewLink);
    if (this.logoFile && val.businessName && val.googleReviewLink) {
      this.emailArrowImg = true;
    }
    this.httpService.postToUrlFormData(environment.upload, fd)
    .subscribe(
      (res) => {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.saveText = 'Saved!';
        if ((res.user.logo !== null && res.user.logo.indexOf('default.png') < 0)
        && res.user.businessName !== '' && res.user.googleReviewLink !== '') {
          this.emailArrowImg = true;
        } else {
          this.emailArrowImg = false;
        }
        // this.router.navigateByUrl('/');
      }, (error: any) => {
        this.errorSettings = error;
        this.saveText = 'Save & Continue!';
        this.emailArrowImg = false;
      });
  }

}
