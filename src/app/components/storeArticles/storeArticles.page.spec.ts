import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StoreArticlesPage } from './storeArticles.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

describe('StoreArticlesPage', () => {
  let component: StoreArticlesPage;
  let fixture: ComponentFixture<StoreArticlesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StoreArticlesPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(StoreArticlesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
