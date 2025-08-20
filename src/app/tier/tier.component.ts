import { Component, EventEmitter, Output } from '@angular/core';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { Pokemon } from '../Interface/Pokemon.interface';
import { CommonModule } from '@angular/common';
type TierKey = 'S' | 'A' | 'B' | 'C' | 'D' | 'E';
@Component({
  selector: 'app-tier',
  standalone: true,
  imports: [CommonModule, PokemonCardComponent],
  templateUrl: './tier.component.html',
  styleUrl: './tier.component.css',
})
export class TierComponent {
  @Output() pokemonDropped = new EventEmitter<Pokemon>();

  tiers: Record<TierKey, Pokemon[]> = {
    S: [],
    A: [],
    B: [],
    C: [],
    D: [],
    E: [],
  };

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.dataTransfer && (event.dataTransfer.dropEffect = 'move');
  }

  onDrop(event: DragEvent, tier: string): void {
    event.preventDefault();
    const json = event.dataTransfer?.getData('application/json');
    if (!json) return;

    const pokemon: Pokemon = JSON.parse(json);
    this.tiers[tier as TierKey].push(pokemon);

    this.pokemonDropped.emit(pokemon);
  }
}
