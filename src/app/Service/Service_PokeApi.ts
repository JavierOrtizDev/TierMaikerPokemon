import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=151';

  async getAllPokemons(): Promise<{ name: string; url: string }[]> {
    const response = await fetch(this.apiUrl);
    const data = await response.json();
    return data.results;
  }
}
