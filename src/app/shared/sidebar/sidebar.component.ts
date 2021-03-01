import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AppService } from 'src/app/services/AppService';
import { CategoriesClient } from '../../clients/CategoriesClient';
import { GetCategoriesRequest } from '../../requests/GetCategoriesRequest';
import { UserCoordinates } from '../../models/UserCoordinates';
import { CategoryValues } from '../../models/CategoryValues';
import { CategoriesService } from '../../services/CategoriesService';
import { AuthLogin } from 'src/app/core/auth.login';
import { LiveLocationService } from '../../services/LiveLocationService';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {

  public categories: Array<CategoryValues> = [];

  request: GetCategoriesRequest;

  private readonly categoriesService: CategoriesService;
  private categoriesClient: CategoriesClient;
  constructor(
    private menu: MenuController,
    private _appService: AppService,
    categoriesService: CategoriesService,
    categoriesClient: CategoriesClient,
    private router: Router,
    private authLogin: AuthLogin,
    private liveLocationService: LiveLocationService) {
    this.categoriesClient = categoriesClient;
    this.categoriesService = categoriesService;
  }

  async ngOnInit() {
    await this.loadCategories()
  }

  async loadCategories() {
    return new Promise(async (resolve) => {
      let location = await this.liveLocationService.getLocation();
      resolve(location);

        let userCoordinates = <UserCoordinates>
          {
            longitude: location.lng,
            latitude: location.lat,
            country: 'France'
          }
        this.request = <GetCategoriesRequest>
          {
            userCoordinates: userCoordinates,
            country: 'France'
          };

        (await this.categoriesClient.GetBarCategory(this.request)).subscribe((categories) => {
          resolve(categories);
          this.categories = categories
        });
  });
  }

  selectCategory(name: string) {
    this.closeMenu();
    this.categoriesService.changeCategory(name);
    setTimeout(() => {
      this.router.navigateByUrl('/category');
    }, 20)
  }

  closeMenu() {

    // this.menu.enable(true, 'first');
    this._appService.toggleSideBar();
  }

  userNavigate() {
    this.closeMenu();
    setTimeout(() => {
      this.router.navigateByUrl('/user');
    }, 20)
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }
  logout() {
    this.closeMenu();
    this.authLogin.logout().then(() => {
      this.router.navigate(['/auth']);
    });
  }
}
