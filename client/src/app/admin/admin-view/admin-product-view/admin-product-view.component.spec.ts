import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductViewComponent } from './admin-product-view.component';

describe('AdminProductViewComponent', () => {
  let component: AdminProductViewComponent;
  let fixture: ComponentFixture<AdminProductViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminProductViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
