import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../Service/Service_PokeApi';
import { CommonModule } from '@angular/common';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { PaginatorControlerComponent } from '../paginator-controler/paginator-controler.component';
import { PokefiltersComponent } from '../pokefilters/pokefilters.component';
import { Pokemon } from '../Interface/Pokemon.interface';
import { Pokemons } from '../Interface/Pokemos.interface';
import { TierComponent } from '../tier/tier.component';

@Component({
  selector: 'app-browser-pokemon',
  standalone: true,
  imports: [
    CommonModule,
    PokemonCardComponent,
    PaginatorControlerComponent,
    PokefiltersComponent,
    TierComponent,
  ],
  templateUrl: './browser-pokemon.component.html',
  styleUrl: './browser-pokemon.component.css',
})
export class BrowserPokemonComponent implements OnInit {
  basicPokemons: Pokemons[] = [];
  detalledPokemon: Pokemon[] = [];
  paginatedPokemons: Pokemon[] = [];
  currentPage = 0;
  limit = 10;
  totalPokemons = 151;
  selectedType: string = '';
  searchText: string = '';
  allPokemons: Pokemon[] = [];
  filteredPokemons: Pokemon[] = [];
  pokemons: any;
  isFiltering: boolean = false;

  constructor(private pokemonService: PokemonService) {}

  async ngOnInit(): Promise<void> {
    this.allPokemons = await this.pokemonService.getAllWithDetails();
    console.log('[ngOnInit] Pokémons cargados:', this.allPokemons.length);
    this.applyFilters();
  }

  get totalPages(): number {
    const source = this.isFiltering ? this.filteredPokemons : this.allPokemons;
    return Math.ceil(source.length / this.limit);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.applyFilters();
  }

  onFiltersChanged(filters: { type: string; search: string }): void {
    this.selectedType = filters.type;
    this.searchText = filters.search;
    this.isFiltering =
      this.selectedType !== '' || this.searchText.trim() !== '';

    this.filteredPokemons = this.allPokemons.filter((p) => {
      const matchType = this.selectedType
        ? p.types.some((t) => t.type.name === this.selectedType)
        : true;
      const matchSearch = this.searchText
        ? p.name.toLowerCase().includes(this.searchText) ||
          p.id.toString() === this.searchText
        : true;
      return matchType && matchSearch;
    });
    this.totalPokemons = this.filteredPokemons.length;
    this.currentPage = 0;
    this.applyFilters();
  }
  applyFilters(): void {
    const source = this.isFiltering ? this.filteredPokemons : this.allPokemons;
    const offset = this.currentPage * this.limit;
    this.pokemons = source.slice(offset, offset + this.limit);
    console.log('🧪 applyFilters:', {
      isFiltering: this.isFiltering,
      filtered: this.filteredPokemons.length,
      all: this.allPokemons.length,
      showing: this.pokemons.length,
    });
  }

  draggedPokemon: Pokemon | null = null;

  onDragStart(event: DragEvent, pokemon: Pokemon): void {
    event.dataTransfer?.setData('application/json', JSON.stringify(pokemon));
  }

  tiers: { [key: string]: Pokemon[] } = {
    S: [],
    A: [],
    B: [],
    C: [],
    D: [],
    E: [],
  };

  onDrop(event: DragEvent, tier: string): void {
    event.preventDefault();
    if (this.draggedPokemon) {
      // quitar de la lista principal
      this.pokemons = this.pokemons.filter(
        (p: { id: number }) => p.id !== this.draggedPokemon!.id
      );

      // añadir al tier
      this.tiers[tier].push(this.draggedPokemon);

      // limpiar
      this.draggedPokemon = null;
    }
  }

  onPokemonDropped(pokemon: Pokemon): void {
    const rm = (arr: Pokemon[]) => {
      const idx = arr.findIndex((x) => x.id === pokemon.id);
      if (idx > -1) arr.splice(idx, 1);
    };

    rm(this.allPokemons);
    rm(this.filteredPokemons);
    rm(this.pokemons);

    this.totalPokemons = (
      this.isFiltering ? this.filteredPokemons : this.allPokemons
    ).length;
    this.applyFilters();
  }
}
