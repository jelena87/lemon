import { FreeTrialComponent } from './shared/dialogs/free-trial/free-trial.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { LoginGuard } from './services/login.guard';
import { ChoosePlanComponent } from './user/choose-plan/choose-plan.component';
import { AccountSettingsComponent } from './user/account-settings/account-settings.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { OneCustomerEmailComponent } from './user/one-customer-email/one-customer-email.component';
import { SendListOfEmailsComponent } from './user/send-list-of-emails/send-list-of-emails.component';
import { UploadEmailsComponent } from './user/upload-emails/upload-emails.component';
import { SendEmailsComponent } from './user/send-emails/send-emails.component';
import { RatingScreenComponent } from './user/rating-screen/rating-screen.component';
import { SubmittedScreenComponent } from './user/submitted-screen/submitted-screen.component';
import { SuccessScreenComponent } from './user/success-screen/success-screen.component';
import { PostToGoogleComponent } from './user/post-to-google/post-to-google.component';
import { SendMultipleEmailsComponent } from './user/send-multiple-emails/send-multiple-emails.component';
import { EmailTemplateComponent } from './user/email-template/email-template.component';
import { WebviewComponent } from './user/webview/webview.component';
import { TopFansComponent } from './user/top-fans/top-fans.component';

// const routes: Routes = [
//   {path: '', component: UserDashboardComponent, canActivate: [LoginGuard]},
//   {path: 'signup', component: SignupComponent},
//   {path: 'login', component: LoginComponent},
//   {path: 'account', component: AccountSettingsComponent, canActivate: [LoginGuard]},
//   {path: 'send-one-email', component: OneCustomerEmailComponent, canActivate: [LoginGuard]},
//   {path: 'upload-emails', component: SendListOfEmailsComponent, canActivate: [LoginGuard]},
//   {path: 'upload', component: UploadEmailsComponent, canActivate: [LoginGuard]},
//   {path: 'send-emails', component: SendEmailsComponent, canActivate: [LoginGuard]},
//   {path: 'send-multiple-emails', component: SendMultipleEmailsComponent, canActivate: [LoginGuard]},
//   {path: 'success', component: SuccessScreenComponent, canActivate: [LoginGuard]},
//   {path: 'submitted', component: SubmittedScreenComponent},
//   {path: 'rate', component: RatingScreenComponent},
//   {path: 'post-to-google', component: PostToGoogleComponent},
//   {path: 'choose-plan', component: ChoosePlanComponent, canActivate: [LoginGuard]},
//   {path: 'admin-dashboard', component: AdminDashboardComponent},
//   {path: 'external-review', component: EmailTemplateComponent},
//   {path: 'webview', component: WebviewComponent},
//   {path: 'external-review-top-fans', component: TopFansComponent}
// ];

const routes: Routes = [
  {path: '', component: UserDashboardComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'account', component: AccountSettingsComponent},
  {path: 'send-one-email', component: OneCustomerEmailComponent},
  {path: 'upload-emails', component: SendListOfEmailsComponent},
  {path: 'upload', component: UploadEmailsComponent},
  {path: 'send-emails', component: SendEmailsComponent},
  {path: 'send-multiple-emails', component: SendMultipleEmailsComponent},
  {path: 'success', component: SuccessScreenComponent},
  {path: 'submitted', component: SubmittedScreenComponent},
  {path: 'rate', component: RatingScreenComponent},
  {path: 'post-to-google', component: PostToGoogleComponent},
  {path: 'choose-plan', component: ChoosePlanComponent},
  {path: 'admin-dashboard', component: AdminDashboardComponent},
  {path: 'external-review', component: EmailTemplateComponent},
  {path: 'webview', component: WebviewComponent},
  {path: 'external-review-top-fans', component: TopFansComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [LoginGuard]
})
export class AppRoutingModule {
}
