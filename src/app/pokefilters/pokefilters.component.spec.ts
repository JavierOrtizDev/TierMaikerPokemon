import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokefiltersComponent } from './pokefilters.component';

describe('PokefiltersComponent', () => {
  let component: PokefiltersComponent;
  let fixture: ComponentFixture<PokefiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokefiltersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PokefiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
