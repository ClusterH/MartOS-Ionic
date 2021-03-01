import { Component, OnInit, Input } from '@angular/core';
import { AppService } from 'src/app/services/AppService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
})
export class MainHeaderComponent implements OnInit {
  constructor(private _appService: AppService, private router: Router) { }

  ngOnInit() { }

  search() { 
    this.router.navigateByUrl('/tabs/home/search');
  }

  toggleSideBar() { 
    this._appService.toggleSideBar();
  }
}
