import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EvolucaoNome {
  periodo: string;
  frequencia: number;
}

export interface RankingLocalidade {
  nome: string;
  frequencia: number;
}

@Injectable({
  providedIn: 'root'
})
export class IbgeService {
  private baseUrl = 'https://servicodados.ibge.gov.br/api/v2/censos/nomes';

  constructor(private http: HttpClient) {}

  getEvolucaoNome(nome: string, sexo: string): Observable<EvolucaoNome[]> {
    console.log(`${this.baseUrl}/${nome}?sexo=${sexo}`);
    return this.http.get<EvolucaoNome[]>(`${this.baseUrl}/${nome}?sexo=${sexo}`);
  }

  getRankingLocalidade(localidade: string, sexo: string): Observable<RankingLocalidade[]> {
    return this.http.get<RankingLocalidade[]>(`${this.baseUrl}/ranking?localidade=${localidade}&sexo=${sexo}`);
  }
} 