import { HttpParams, HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { ToastService } from './toast.service';
import { ReviewInfo } from '../models/reviewInfo.model';
import { environment } from './../../environments/environment.prod';

@Injectable()
export class ReviewService {
  reviewData;
  review;
  clientReview;

  constructor(private httpClient: HttpClient,
              private route: ActivatedRoute,
              private toast: ToastService,
              private activatedRoute: ActivatedRoute) {}

  public getReviewInfo() {
    let params = new HttpParams();
    const review = this.route.snapshot.queryParamMap.get('review');
    params = params.set('review', review);

    return this.httpClient.get(environment.getReview, { params });
}

onSubmit(reviewInfo: ReviewInfo) {
  const headers = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  this.httpClient.post(environment.submitReview, reviewInfo, headers)
  .subscribe(
    (res) => {
      this.reviewData = res;
    }, (error: HttpErrorResponse) => {
  }
  );
}

  public getReviewExternalInfo() {
    let params = new HttpParams();
    const client = this.route.snapshot.queryParamMap.get('client');
    params = params.set('client', client);

    return this.httpClient.get(environment.getReviewExternal, { params });
  }

  public getReviewExternalInfoTopFans() {
    let params = new HttpParams();
    const client = this.route.snapshot.queryParamMap.get('client');
    const customerName = this.route.snapshot.queryParamMap.get('customerName');
    params = params.set('client', client).set('customerName', customerName);

    return this.httpClient.get(environment.getReviewExternal, { params });
  }

}
