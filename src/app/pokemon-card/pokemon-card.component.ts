import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.css',
})
export class PokemonCardComponent {
  @Input() pokemon!: { name: string; url: string };

  get imageUrl(): string {
    const id = this.pokemon.url.split('/').filter(Boolean).pop();
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  }
  getIdFromUrl(url: string): number {
    const parts = url.split('/');
    return +parts[parts.length - 2];
  }
}
