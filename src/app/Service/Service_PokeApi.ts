import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Pokemons } from '../Interface/Pokemos.interface';
import { Pokemon } from '../Interface/Pokemon.interface';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private readonly baseUrl = 'https://pokeapi.co/api/v2/pokemon';
  private allBasicPokemons: Pokemons[] = [];
  private allDetailedPokemons: Pokemon[] = [];

  constructor(private http: HttpClient) {}

  async fetchFirst151(): Promise<void> {
    if (this.allBasicPokemons.length > 0) return;

    const response = await firstValueFrom(
      this.http.get<{ results: Pokemons[] }>(`${this.baseUrl}?limit=151`)
    );
    this.allBasicPokemons = response.results;
  }

  private async getPokemonDetails(url: string): Promise<Pokemon> {
    return await firstValueFrom(this.http.get<Pokemon>(url));
  }

  async fetchAllDetailedPokemons(): Promise<void> {
    if (this.allDetailedPokemons.length > 0) return;

    if (this.allBasicPokemons.length === 0) {
      await this.fetchFirst151();
    }

    const requests = this.allBasicPokemons.map((pokemon) =>
      this.getPokemonDetails(pokemon.url)
    );

    this.allDetailedPokemons = await Promise.all(requests);
  }

  async getAllWithDetails(): Promise<Pokemon[]> {
    await this.fetchAllDetailedPokemons();

    return this.allDetailedPokemons;
  }

  async getPaginatedDetailed(
    limit: number,
    offset: number
  ): Promise<Pokemon[]> {
    await this.fetchAllDetailedPokemons();
    return this.allDetailedPokemons.slice(offset, offset + limit);
  }
  async getPokemonTypes(): Promise<string[]> {
    const response = await firstValueFrom(
      this.http.get<{ results: { name: string }[] }>(
        'https://pokeapi.co/api/v2/type'
      )
    );

    return response.results
      .map((type) => type.name)
      .filter((name) => name !== 'unknown' && name !== 'shadow');
  }
}
