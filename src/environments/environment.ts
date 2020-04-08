// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  emailService: 'https://trylemon.com/api/emails.send',
  getReviewList: 'https://trylemon.com/api/reviews.list',
  getReview: 'https://trylemon.com/api/reviews.info',
  submitReview: 'https://trylemon.com/api/reviews.submit',
  signup: 'https://trylemon.com/api/signup',
  login: 'https://trylemon.com/api/token',
  upload: 'https://trylemon.com/api/users.update',
  userInfo: 'https://trylemon.com/api/users.info',
  userLogo: 'https://trylemon.com/api/users.logo',
  signups: 'https://trylemon.com/api/admin/signups.list',
  customers: 'https://trylemon.com/api/admin/customers.list',
  loginAsUser: 'https://trylemon.com/api/admin/login',
  plans: 'https://trylemon.com/api/plans.list',
  subscribe: 'https://trylemon.com/api/subscribe.create',
  noCharge: 'https://trylemon.com/api/admin/nocharge.update'

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
