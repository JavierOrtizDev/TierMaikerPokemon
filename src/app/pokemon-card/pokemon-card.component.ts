import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pokemon } from '../Interface/Pokemon.interface';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.css',
})
export class PokemonCardComponent {
  @Input() pokemon!: Pokemon;
  @Output() dragStart = new EventEmitter<Pokemon>();

  get imageUrl(): string {
    return (
      this.pokemon.sprites.other?.['official-artwork']?.front_default || ''
    );
  }
  getIdFromUrl(url: string): number {
    const parts = url.split('/');
    return +parts[parts.length - 2];
  }

  handleDragStart(event: DragEvent): void {
    event.dataTransfer?.setData(
      'application/json',
      JSON.stringify(this.pokemon)
    );
    event.dataTransfer?.setData('text/plain', String(this.pokemon.id));
    event.dataTransfer && (event.dataTransfer.effectAllowed = 'move');

    this.dragStart.emit(this.pokemon);
  }
}
