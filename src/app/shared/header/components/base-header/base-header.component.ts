import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-base-header',
  templateUrl: './base-header.component.html',
  styleUrls: ['./base-header.component.scss'],
})
export class BaseHeaderComponent implements OnInit {
  previousUrl;
  constructor(private location: Location, private router: Router) { }

  backClicked() {
    this.location.back();

  }

  ngOnInit() { }

}
