import { ErrorInterceptor } from './services/error.interceptor';
import { JwtInterceptor } from './services/http.interceptor';
import { ToastsContainer } from './services/toast-container.component';
import { EmailService } from './services/email.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpService } from './services/http.service';
import { UserService } from './services/user.service';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { NewEmailComponent } from './shared/dialogs/new-email/new-email.component';
import { OneCustomerEmailComponent } from './user/one-customer-email/one-customer-email.component';
import { SendListOfEmailsComponent } from './user/send-list-of-emails/send-list-of-emails.component';
import { UploadEmailsComponent } from './user/upload-emails/upload-emails.component';
import { SendEmailsComponent } from './user/send-emails/send-emails.component';
import { SuccessScreenComponent } from './user/success-screen/success-screen.component';
import { HeaderComponent } from './header/header.component';
import { SubmittedScreenComponent } from './user/submitted-screen/submitted-screen.component';
import { RatingScreenComponent } from './user/rating-screen/rating-screen.component';
import { PostToGoogleComponent } from './user/post-to-google/post-to-google.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReviewService } from './services/review.service';
import { SendMultipleEmailsComponent } from './user/send-multiple-emails/send-multiple-emails.component';
import { WelcomeComponent } from './shared/dialogs/welcome/welcome.component';
import { AccountSettingsComponent } from './user/account-settings/account-settings.component';
import { AlmostDoneComponent } from './shared/dialogs/almost-done/almost-done.component';
import { ChoosePlanComponent } from './user/choose-plan/choose-plan.component';
import { FreeTrialComponent } from './shared/dialogs/free-trial/free-trial.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { NgxStripeModule } from 'ngx-stripe';
import { EmailTemplateComponent } from './user/email-template/email-template.component';
import { GoogleReviewComponent } from './shared/dialogs/google-review/google-review.component';
import { WebviewComponent } from './user/webview/webview.component';
import { TopFansComponent } from './user/top-fans/top-fans.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    UserDashboardComponent,
    NewEmailComponent,
    OneCustomerEmailComponent,
    SendListOfEmailsComponent,
    UploadEmailsComponent,
    SendEmailsComponent,
    SuccessScreenComponent,
    HeaderComponent,
    SubmittedScreenComponent,
    RatingScreenComponent,
    PostToGoogleComponent,
    SendMultipleEmailsComponent,
    ToastsContainer,
    WelcomeComponent,
    AccountSettingsComponent,
    AlmostDoneComponent,
    ChoosePlanComponent,
    FreeTrialComponent,
    AdminDashboardComponent,
    EmailTemplateComponent,
    GoogleReviewComponent,
    WebviewComponent,
    TopFansComponent,
  ],
  imports: [
    BrowserModule,
    NgxStripeModule.forRoot('pk_live_QzPnltEfR3QsoAeOEn2FPYrN'),
    // NgxStripeModule.forRoot('pk_test_i61asn5PaECkmhFSUNVKkUXp'),
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    CodemirrorModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    HttpService,
    UserService,
    NgbActiveModal,
    EmailService,
    ReviewService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [
    AppComponent,
  ],
  entryComponents: [
    NewEmailComponent,
    WelcomeComponent,
    AlmostDoneComponent,
    FreeTrialComponent,
    GoogleReviewComponent
  ]
})
export class AppModule { }
