import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MapViewPage } from './mapView.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

describe('MapViewPage', () => {
  let component: MapViewPage;
  let fixture: ComponentFixture<MapViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MapViewPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(MapViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
