import { EmailsData } from './../../../models/email.model';
import { Router, NavigationExtras } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-almost-done',
  templateUrl: './almost-done.component.html',
  styleUrls: ['./almost-done.component.scss']
})
export class AlmostDoneComponent implements OnInit {
  @Input() fromParent;
  @Input() fromOneEmailSend;

  constructor(public activeModal: NgbActiveModal,
              public router: Router) {
  }

  ngOnInit() {
  }

  onChoosePlan() {
    const navigationExtras: NavigationExtras =
    {state: {emails: this.fromParent.emails, message: this.fromParent.message, oneEmailSent: this.fromParent.oneEmailSent}};
    this.router.navigate(['/choose-plan'], navigationExtras);
  }

}
