import { HttpService } from './../../services/http.service';
import { environment } from './../../../environments/environment.prod';
import { HttpErrorResponse } from '@angular/common/http';
import { ReviewInfo } from './../../models/reviewInfo.model';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { ReviewService } from './../../services/review.service';
import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-rating-screen',
  templateUrl: './rating-screen.component.html',
  styleUrls: ['./rating-screen.component.scss']
})
export class RatingScreenComponent implements OnInit {
reviewInfo: ReviewInfo;
clientReview;
errorMessage;


  constructor(private reviewService: ReviewService,
              private route: ActivatedRoute,
              private router: Router,
              private toast: ToastService,
              private httpClient: HttpService) { }

  ngOnInit() {
    this.reviewService.getReviewInfo()
    .subscribe(
      (res) => {
        console.log(res);
        this.clientReview = res;
      }, (error: HttpErrorResponse) => {
    });
    this.reviewInfo = {
      review: this.route.snapshot.queryParamMap.get('review'),
      clientLogo: '',
      text: '',
      rating: 0
    };
  }

  onPost() {
    this.reviewInfo.rating = 5;
    this.httpClient.postToUrl(environment.submitReview, this.reviewInfo)
      .subscribe(
        (res) => {
          window.location.href = this.clientReview.googleReviewLink;
        }, (error: HttpErrorResponse) => {
          window.location.href = this.clientReview.googleReviewLink;
      }
      );
    }

  onSubmit(value) {
    this.reviewInfo.rating = value.rating;
    this.reviewInfo.text = value.text;
    this.httpClient.postToUrl(environment.submitReview, this.reviewInfo)
      .subscribe(
        (res) => {
          this.router.navigate(['/submitted']);
        }, (error: HttpErrorResponse) => {
          this.errorMessage = 'Already submitted review!';
      }
      );
    // if (this.reviewInfo.rating == 5)  {
    //   const navigationExtras: NavigationExtras = {state: {reviewInfo: this.reviewInfo}};
    // this.router.navigate(['/post-to-google'], navigationExtras);
    // } else {
    //   this.router.navigate(['/submitted']);
    // }
  }

}
