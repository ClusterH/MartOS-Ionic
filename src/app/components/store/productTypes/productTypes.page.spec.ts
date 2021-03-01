import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../../../explore-container/explore-container.module';
import { ProductTypesPage } from './productTypes.page';



describe('ProductTypesPage', () => {
  let component: ProductTypesPage;
  let fixture: ComponentFixture<ProductTypesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductTypesPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductTypesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
