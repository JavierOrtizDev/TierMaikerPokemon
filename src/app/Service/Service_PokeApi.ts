import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PokemonService {
  getPokemonsPaginated(
    limit: number = 10,
    offset: number = 0
  ): Promise<{ name: string; url: string }[]> {
    return fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    )
      .then((res) => res.json())
      .then((data) => data.results);
  }
}
