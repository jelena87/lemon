import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-webview',
  templateUrl: './webview.component.html',
  styleUrls: ['./webview.component.scss']
})
export class WebviewComponent implements OnInit {
  uiwebview;
  // userAgent;
  userAgent = window.navigator.userAgent.toLowerCase();
  safari = /safari/.test( this.userAgent );
  ios = /iphone|ipod|ipad/.test( this.userAgent );
  standalone;

  constructor() { }

  ngOnInit() {
    console.log(window.navigator);
    console.log(window.matchMedia('(display-mode: standalone)').matches);
    this.standalone = ('standalone' in window.navigator) && (window.navigator['standalone']);
    this.uiwebview = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent);
    this.userAgent = navigator.userAgent;
    if ( this.ios ) {
        if ( !this.standalone && this.safari ) {
            document.getElementById( 'where-am-i' ).textContent = 'browser';
        } else if ( this.standalone && !this.safari ) {
            document.getElementById( 'where-am-i' ).textContent = 'standalone';
        } else if ( !this.standalone && !this.safari ) {
            document.getElementById( 'where-am-i' ).textContent = 'uiwebview';
        }
    } else {
        document.getElementById( 'where-am-i' ).textContent = 'not iOS';
    }
  }

}
