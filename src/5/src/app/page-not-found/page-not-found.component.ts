import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-page-not-found',
  template: `
    <p>
      This page doesn't exist. Go back to
      <a routerLink="/home">home</a>
      .
    </p>
  `,
})
export class PageNotFoundComponent implements OnInit {
  constructor(private location: Location) { }

  ngOnInit() {}

  // <button (click)="goBack()">Go Back</button>
  goBack(): void {
    this.location.back();
  }
}
