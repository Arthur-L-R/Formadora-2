import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-lista-pokemon',
  templateUrl: './lista-pokemon.page.html',
  styleUrls: ['./lista-pokemon.page.scss'],
  standalone: false,
})
export class ListaPokemonPage implements OnInit {

  public pokemons: any[] = [];
  public selectedPokemonId: number | null = null;
  public abilitiesMap: { [key: number]: string[] } = {};

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons() {
    this.httpService.getPokemons().subscribe((data: any) => {
      this.pokemons = data.results.map((pokemon: any, index: number) => {
        const id = index + 1;
        return {
          name: pokemon.name,
          id: id,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
        };
      });
    });
  }

  showPokemon(id: number) {
    if (this.selectedPokemonId === id) {
      this.selectedPokemonId = null; // toggle off
      return;
    }

    this.selectedPokemonId = id;

    // Evita múltiplas chamadas se já buscou uma vez
    if (this.abilitiesMap[id]) return;

    this.httpService.getPokemonDetails(`https://pokeapi.co/api/v2/pokemon/${id}`).subscribe((data: any) => {
      this.abilitiesMap[id] = data.abilities.map((a: any) => a.ability.name);
    });
  }
}
