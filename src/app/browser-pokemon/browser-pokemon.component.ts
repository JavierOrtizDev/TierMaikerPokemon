import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../Service/Service_PokeApi';
import { CommonModule } from '@angular/common';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { PaginatorControlerComponent } from '../paginator-controler/paginator-controler.component';
import { PokefiltersComponent } from '../pokefilters/pokefilters.component';
import { Pokemon } from '../Interface/Pokemon.interface';
import { Pokemons } from '../Interface/Pokemos.interface';
import { TierComponent } from '../tier/tier.component';
import { PokemonDropEvent } from '../tier/tier.component';

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
    const data = event.dataTransfer?.getData('application/json');
    if (!data) return;

    const { source, pokemon } = JSON.parse(data) as {
      source: string;
      pokemon: Pokemon;
    };

    // Solo si viene de un tier
    if (source !== 'browser') {
      // Eliminar duplicado
      if (!this.allPokemons.some((p) => p.id === pokemon.id)) {
        this.allPokemons.push(pokemon);
      }

      // Ordenar por ID para mantener la posición original
      this.allPokemons.sort((a, b) => a.id - b.id);

      // Aplicar filtros y paginación
      this.applyFilters();
    }
  }

  // Cuando un Pokémon se deja en un tier
  onPokemonDropped(event: PokemonDropEvent): void {
    const { pokemon, toBrowser } = event;

    if (toBrowser) {
      // Si viene del tier y va al browser
      if (!this.allPokemons.some((p) => p.id === pokemon.id)) {
        this.allPokemons.push(pokemon);
        this.allPokemons.sort((a, b) => a.id - b.id);
        this.applyFilters();
      }
      return;
    }

    // Si viene del browser y fue a un tier, eliminarlo del browser
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

  // Cuando un Pokémon se arrastra desde un tier de vuelta al browser
  onPokemonReturned(pokemon: Pokemon): void {
    // agregar al browser
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

      // ⚡ Solo si viene de un Tier
      if (source !== 'browser') {
        // Evitamos duplicados
        if (!this.pokemons.some((p) => p.id === pokemon.id)) {
          this.pokemons.push(pokemon);

          // 🔹 Reordenamos por ID para colocarlo en su posición original
          this.pokemons.sort((a, b) => a.id - b.id);
        }
      }
    }
  }
}
