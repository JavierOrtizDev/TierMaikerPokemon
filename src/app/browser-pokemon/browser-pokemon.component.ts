import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../Service/Service_PokeApi';
import { CommonModule } from '@angular/common';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';

@Component({
  selector: 'app-browser-pokemon',
  standalone: true,
  imports: [CommonModule, PokemonCardComponent],
  templateUrl: './browser-pokemon.component.html',
  styleUrl: './browser-pokemon.component.css',
})
export class BrowserPokemonComponent implements OnInit {
  pokemons: { name: string; url: string }[] = [];
  currentPage = 0;
  limit = 10;
  totalPokemons = 151;

  constructor(private pokemonService: PokemonService) {}

  async ngOnInit(): Promise<void> {
    await this.loadPage();
  }
  get totalPages(): number {
    return Math.ceil(this.totalPokemons / this.limit);
  }
  async loadPage(): Promise<void> {
    const offset = this.currentPage * this.limit;
    this.pokemons = await this.pokemonService.getPaginated151(
      this.limit,
      offset
    );
  }

  nextPage(): void {
    this.currentPage++;
    this.loadPage();
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadPage();
    }
  }
}
