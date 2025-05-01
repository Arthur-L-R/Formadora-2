import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private baseUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) {}

  getPokemons(limit: number = 30) {
    return this.http.get(`${this.baseUrl}/pokemon?limit=${limit}`);
  }

  getPokemonDetails(urlOrId: string | number) {
    // Permite usar ID ou URL diretamente
    const url = typeof urlOrId === 'string' && urlOrId.startsWith('http')
      ? urlOrId
      : `${this.baseUrl}/pokemon/${urlOrId}`;
    
    return this.http.get(url);
  }
}
