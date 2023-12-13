import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnCategoryHomeComponent } from './btn-category-home.component';

describe('BtnCategoryHomeComponent', () => {
  let component: BtnCategoryHomeComponent;
  let fixture: ComponentFixture<BtnCategoryHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BtnCategoryHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BtnCategoryHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
