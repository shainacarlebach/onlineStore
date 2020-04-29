import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { loginFormComponent } from './loginform.component';

describe('loginFormComponent', () => {
  let component: loginFormComponent;
  let fixture: ComponentFixture<loginFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ loginFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(loginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
