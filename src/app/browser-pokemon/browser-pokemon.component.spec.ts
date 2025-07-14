import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserPokemonComponent } from './browser-pokemon.component';

describe('BrowserPokemonComponent', () => {
  let component: BrowserPokemonComponent;
  let fixture: ComponentFixture<BrowserPokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserPokemonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BrowserPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
