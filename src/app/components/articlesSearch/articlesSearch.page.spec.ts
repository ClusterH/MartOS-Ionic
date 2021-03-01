import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ArticlesSearchPage } from './articlesSearch.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

describe('ArticlesSearchPage', () => {
  let component: ArticlesSearchPage;
  let fixture: ComponentFixture<ArticlesSearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ArticlesSearchPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ArticlesSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
