import { UserService } from './../../../services/user.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../../environments/environment.prod';
import { HttpService } from './../../../services/http.service';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StripeService, Elements, Element as StripeElement, ElementsOptions } from 'ngx-stripe';

@Component({
  selector: 'app-free-trial',
  templateUrl: './free-trial.component.html',
  styleUrls: ['./free-trial.component.scss']
})
export class FreeTrialComponent implements OnInit {
  elements: Elements;
  card: StripeElement;
  cardExpiry: StripeElement;
  cardCvc: StripeElement;
  paymentToken;
  @Input() fromParent;
  paymentMethod;
  errorMessage;
  disabledButton = false;

  // optional parameters
  elementsOptions: ElementsOptions = {
    locale: 'en',
    fonts: [
      {
        cssSrc: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap',
      }
    ]
  };

  stripeSubmit: FormGroup;

  constructor(public activeModal: NgbActiveModal,
              private fb: FormBuilder,
              private stripeService: StripeService,
              private router: Router,
              private httpService: HttpService) {
              }

  ngOnInit() {
    this.stripeSubmit = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      zipCode: ['', [Validators.required]]
    });

    this.stripeService.elements(this.elementsOptions)
      .subscribe(elements => {
        this.elements = elements;
        // Only mount the element the first time
        if (!this.card) {
          this.card = this.elements.create('cardNumber', {
            style: {
              base: {
                iconColor: '#666EE8',
                color: '#18191B',
                lineHeight: '54px',
                fontWeight: 400,
                fontFamily: 'Roboto, sans-serif',
                fontSize: '16px',
                '::placeholder': {
                  color: '#828997',
                  fontWeight: 100,
                }
              }
            }
          });
          this.card.mount('#card-number');
        }
        if (!this.cardExpiry) {
          this.cardExpiry = this.elements.create('cardExpiry', {
            style: {
              base: {
                iconColor: '#666EE8',
                color: '#18191B',
                lineHeight: '54px',
                fontWeight: 400,
                fontFamily: 'Roboto, sans-serif',
                fontSize: '16px',
                '::placeholder': {
                  color: '#828997',
                  fontWeight: 100,
                }
              }
            }
          });
          this.cardExpiry.mount('#card-expiry');
        }
        if (!this.cardCvc) {
          this.cardCvc = this.elements.create('cardCvc', {
            style: {
              base: {
                iconColor: '#666EE8',
                color: '#18191B',
                lineHeight: '54px',
                fontWeight: 400,
                fontFamily: 'Roboto, sans-serif',
                fontSize: '16px',
                '::placeholder': {
                  color: '#828997',
                  fontWeight: 100,
                }
              }
            }
          });
          this.cardCvc.mount('#card-cvc');
        }
      });
  }

  buy() {
    const name = this.stripeSubmit.get('firstName').value;
    this.stripeService.createPaymentMethod('card', this.card, name,
    ).subscribe((result) => {
      if (result.error) {
        this.errorMessage = result.error.message;
      }
      let paymentMethod = result.paymentMethod.id;
      let plan = this.fromParent.planId;
      if (paymentMethod) {
        this.disabledButton = true;
        this.stripePaymentMethodHandler(paymentMethod, plan);
        let existingUser = localStorage.getItem('currentUser');
        existingUser = existingUser ? JSON.parse(existingUser) : {};
        existingUser['shouldCharge'] = false;
        localStorage.setItem('currentUser', JSON.stringify(existingUser));
      }
    }, (error: HttpErrorResponse) => {
      this.errorMessage = error.message;
  });
  }

  stripePaymentMethodHandler(paymentMethod, plan) {
    const body = `paymentMethod=${paymentMethod}&plan=${plan}`;
    const headers = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', Authorization: `Bearer token` })
    };
    return this.httpService.postToUrl(environment.subscribe, body, headers).subscribe(
      (res) => {
        this.activeModal.dismiss();
        const navigationExtras: NavigationExtras =
        { state: { emails: this.fromParent.emails, message: this.fromParent.message }};
        this.router.navigate(['/upload-emails'], navigationExtras);
      }, (error: HttpErrorResponse) => {
        // this.router.navigate(['/']);
        this.errorMessage = 'Error occured. Please try again later.';
    }
    );
  }

}
