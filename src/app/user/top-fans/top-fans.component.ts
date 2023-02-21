import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { HttpService } from 'src/app/services/http.service';
import { ReviewService } from 'src/app/services/review.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-top-fans',
  templateUrl: './top-fans.component.html',
  styleUrls: ['./top-fans.component.scss']
})
export class TopFansComponent implements OnInit {
  client;
  clientId;
  customerName;
  surveyUrl;

  constructor(private httpClient: HttpService,
              private route: ActivatedRoute,
              private reviewService: ReviewService) {}

  ngOnInit() {
    this.reviewService.getReviewExternalInfoTopFans()
    .subscribe(
      (res) => {
        this.client = res;
      }, (error: HttpErrorResponse) => {
    });
    this.clientId = this.route.snapshot.queryParamMap.get('client');
    this.customerName = this.route.snapshot.queryParamMap.get('customerName');
  }

  onPost() {
    this.httpClient.postToUrl(environment.reviewsLemonClick, this.clientId)
      .subscribe(
        (res) => {
          window.location.href = this.client.googleReviewLink;
        }, (error: HttpErrorResponse) => {
          window.location.href = this.client.googleReviewLink;
      }
      );
    }

}
