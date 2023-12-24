import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JwtExpiredComponent } from './jwt-expired.component';

describe('JwtExpiredComponent', () => {
  let component: JwtExpiredComponent;
  let fixture: ComponentFixture<JwtExpiredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JwtExpiredComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JwtExpiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
