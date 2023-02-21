import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  idToken;
  // adminRoutes = ['https://trylemon.com/api/admin/signups.list', 'https://trylemon.com/api/admin/login',
  //  'https://trylemon.com/api/admin/customers.list'];
  adminRoutes = ['http://lemon.local/api/admin/signups.list', 'http://lemon.local/api/admin/login',
  'http://lemon.local/api/admin/customers.list'];

    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.adminRoutes.includes(req.url)) {
      this.idToken = localStorage.getItem("admin_token");
    } else {
      this.idToken = localStorage.getItem("access_token");
    }
    if (this.idToken) {
        const cloned = req.clone({
            headers: req.headers.set("Authorization",
                "Bearer " + this.idToken)
        });
        return next.handle(cloned);
    } else {
        return next.handle(req);
    }
    }

}
