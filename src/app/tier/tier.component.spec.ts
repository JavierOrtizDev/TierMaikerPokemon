import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TierComponent } from './tier.component';

describe('TierComponent', () => {
  let component: TierComponent;
  let fixture: ComponentFixture<TierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TierComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
