import { Component, OnInit, ViewChild } from '@angular/core';
import { PokemonService } from '../Service/Service_PokeApi';
import { CommonModule } from '@angular/common';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { PaginatorControlerComponent } from '../paginator-controler/paginator-controler.component';
import { PokefiltersComponent } from '../pokefilters/pokefilters.component';
import { Pokemon } from '../Interface/Pokemon.interface';
import {
  TierComponent,
  PokemonDropEvent,
  TierKey,
} from '../tier/tier.component';

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
  @ViewChild(TierComponent) tierCmp!: TierComponent;
  allPokemons: Pokemon[] = [];
  filteredPokemons: Pokemon[] = [];
  pokemons: Pokemon[] = [];
  currentPage = 0;
  limit = 10;
  totalPokemons = 151;
  selectedType = '';
  searchText = '';
  isFiltering = false;

  constructor(private pokemonService: PokemonService) {}

  async ngOnInit(): Promise<void> {
    this.allPokemons = await this.pokemonService.getAllWithDetails();
    this.applyFilters();
  }

  applyFilters(): void {
    const source = this.isFiltering ? this.filteredPokemons : this.allPokemons;
    const offset = this.currentPage * this.limit;
    this.pokemons = source.slice(offset, offset + this.limit);
    this.totalPokemons = source.length;
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

    this.currentPage = 0;
    this.applyFilters();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.applyFilters();
  }

  onDragStart(event: DragEvent, pokemon: Pokemon, source: 'browser'): void {
    const data = JSON.stringify({ source, pokemon });
    event.dataTransfer?.setData('application/json', data);
  }

  onDropToBrowser(event: DragEvent): void {
    event.preventDefault();
    const raw = event.dataTransfer?.getData('application/json');
    if (!raw) return;

    const { source, pokemon } = JSON.parse(raw) as {
      source: TierKey | 'browser';
      pokemon: Pokemon;
    };

    console.log('[DROP→BROWSER]', { source, id: pokemon.id });

    if (source !== 'browser') {
      this.tierCmp.removePokemonFromAnyTier(pokemon.id);

      if (!this.allPokemons.some((p) => p.id === pokemon.id)) {
        this.allPokemons.push(pokemon);
        this.allPokemons.sort((a, b) => a.id - b.id);
      }

      this.applyFilters();
    }
  }

  onPokemonDropped(event: PokemonDropEvent): void {
    const { pokemon, toBrowser } = event;

    if (toBrowser) {
      if (!this.allPokemons.some((p) => p.id === pokemon.id)) {
        this.allPokemons.push(pokemon);
        this.allPokemons.sort((a, b) => a.id - b.id);
        this.applyFilters();
      }
      return;
    }

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

  onPokemonReturned(pokemon: Pokemon): void {
    this.allPokemons.push(pokemon);
    this.applyFilters();
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.dataTransfer && (event.dataTransfer.dropEffect = 'move');
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();

    const data = event.dataTransfer?.getData('application/json');
    if (data) {
      const { source, pokemon } = JSON.parse(data) as {
        source: string;
        pokemon: Pokemon;
      };

      if (source !== 'browser') {
        if (!this.pokemons.some((p) => p.id === pokemon.id)) {
          this.pokemons.push(pokemon);

          this.pokemons.sort((a, b) => a.id - b.id);
        }
      }
    }
  }
}
