import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { environment } from 'src/environments/environment.prod';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from 'src/app/services/review.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-email-template',
  templateUrl: './email-template.component.html',
  styleUrls: ['./email-template.component.scss']
})
export class EmailTemplateComponent implements OnInit {
  client;
  clientId;
  surveyUrl;

  constructor(private httpClient: HttpService,
              private route: ActivatedRoute,
              private reviewService: ReviewService) {}

  ngOnInit() {
    this.reviewService.getReviewExternalInfo()
    .subscribe(
      (res) => {
        this.client = res;
      }, (error: HttpErrorResponse) => {
    });
    this.route.fragment.subscribe(
      value => {
        this.surveyUrl = value;
      }
    );
    // this.route.fragment
    //   .pipe(
    //     map(fragment => new URLSearchParams(fragment)),
    //     map(params => ({
    //       clientId: params.get('client'),
    //       survey: params.get('survey')
    //     }))
    //   )
    //   .subscribe(res => {
    //     this.surveyUrl = res.survey;
    //     this.clientId = res.clientId;
    //     console.log('', res);
    //   });
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
