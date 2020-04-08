import { map } from 'rxjs/operators';
import { ReviewService } from './../../services/review.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { ReviewInfo } from 'src/app/models/reviewInfo.model';

@Component({
  selector: 'app-post-to-google',
  templateUrl: './post-to-google.component.html',
  styleUrls: ['./post-to-google.component.scss']
})
export class PostToGoogleComponent implements OnInit {
  @ViewChild('reviewText', {static: false}) reviewText: ElementRef;
  review;
  reviewInfo;
  reviewId;

  constructor(private reviewService: ReviewService,
              private router: Router) {
                const navigation = this.router.getCurrentNavigation();
                const state = navigation.extras.state as {reviewInfo: ReviewInfo};
                this.reviewInfo = state;
               }

  ngOnInit() {
  }


  onPost() {
    window.location.href = this.review.googleReviewLink;
    // window.location.href = 'http://bit.ly/35LRGtV';
  }

  copyToClipboard() {
    if (this.reviewText) {
      // Select textarea text
      this.reviewText.nativeElement.select();

      // Copy to the clipboard
      document.execCommand('copy');

      // Deselect selected textarea
      this.reviewText.nativeElement.setSelectionRange(0, 0);
  }
}
}
