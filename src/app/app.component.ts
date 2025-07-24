import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BrowserPokemonComponent } from './browser-pokemon/browser-pokemon.component';
import { TierComponent } from './tier/tier.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, BrowserPokemonComponent, TierComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'PokeTier';
}
