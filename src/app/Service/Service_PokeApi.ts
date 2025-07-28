import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private allFirstGenPokemons: { name: string; url: string }[] = [];

  async fetchFirst151(): Promise<void> {
    if (this.allFirstGenPokemons.length > 0) return;

    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
    const data = await response.json();
    this.allFirstGenPokemons = data.results;
  }

  async getPaginated151(
    limit: number,
    offset: number
  ): Promise<{ name: string; url: string }[]> {
    await this.fetchFirst151();
    return this.allFirstGenPokemons.slice(offset, offset + limit);
  }

  getTotalCount(): number {
    return 151;
  }
}
