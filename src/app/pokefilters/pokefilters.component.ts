import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { PokemonService } from '../Service/Service_PokeApi';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pokefilters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pokefilters.component.html',
  styleUrl: './pokefilters.component.css',
})
export class PokefiltersComponent implements OnInit {
  types: string[] = [];
  selectedType: string = '';
  searchText: string = '';

  @Output() filtersChanged = new EventEmitter<{
    type: string;
    search: string;
  }>();

  constructor(private pokemonService: PokemonService) {}

  async ngOnInit(): Promise<void> {
    this.types = await this.pokemonService.getPokemonTypes();
  }

  onFiltersChange() {
    this.filtersChanged.emit({
      type: this.selectedType,
      search: this.searchText.toLowerCase(),
    });
  }
}
