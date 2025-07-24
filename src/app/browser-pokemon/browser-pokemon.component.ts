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

  constructor(private pokemonService: PokemonService) {}

  async ngOnInit(): Promise<void> {
    this.pokemons = await this.pokemonService.getAllPokemons();
  }
}
