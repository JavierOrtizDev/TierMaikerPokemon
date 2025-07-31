import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatorControlerComponent } from './paginator-controler.component';

describe('PaginatorControlerComponent', () => {
  let component: PaginatorControlerComponent;
  let fixture: ComponentFixture<PaginatorControlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginatorControlerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaginatorControlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
