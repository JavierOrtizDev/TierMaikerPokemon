import { Component, EventEmitter, Output } from '@angular/core';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { Pokemon } from '../Interface/Pokemon.interface';
import { CommonModule } from '@angular/common';

type TierKey = 'S' | 'A' | 'B' | 'C' | 'D' | 'E';

export interface PokemonDropEvent {
  pokemon: Pokemon;
  fromBrowser: boolean;
  toBrowser?: boolean;
}

@Component({
  selector: 'app-tier',
  standalone: true,
  imports: [CommonModule, PokemonCardComponent],
  templateUrl: './tier.component.html',
  styleUrls: ['./tier.component.css'],
})
export class TierComponent {
  @Output() pokemonDropped = new EventEmitter<PokemonDropEvent>();

  tierKeys: TierKey[] = ['S', 'A', 'B', 'C', 'D', 'E'];

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

  onDragStart(
    event: DragEvent,
    pokemon: Pokemon,
    source: TierKey | 'browser'
  ): void {
    const data = JSON.stringify({ source, pokemon });
    event.dataTransfer?.setData('application/json', data);
  }

  onDrop(event: DragEvent, target: TierKey | 'browser'): void {
    event.preventDefault();

    const data = event.dataTransfer?.getData('application/json');
    if (!data) return;

    const { source, pokemon } = JSON.parse(data) as {
      source: TierKey | 'browser';
      pokemon: Pokemon;
    };

    // Si el destino es el Browser
    if (target === 'browser') {
      if (source !== 'browser') {
        // ⚡ eliminar del tier de origen
        this.tiers[source] = this.tiers[source].filter(
          (p) => p.id !== pokemon.id
        );
      }

      // Emitir al padre para que se agregue al Browser
      this.pokemonDropped.emit({
        pokemon,
        fromBrowser: false,
        toBrowser: true,
      });
      return;
    }

    // Mover entre tiers o browser→tier
    if (this.tiers[target].some((p) => p.id === pokemon.id)) return;

    if (source !== 'browser') {
      this.tiers[source] = this.tiers[source].filter(
        (p) => p.id !== pokemon.id
      );
    }

    this.tiers[target].push(pokemon);

    this.pokemonDropped.emit({
      pokemon,
      fromBrowser: source === 'browser',
      toBrowser: false,
    });
  }
}
