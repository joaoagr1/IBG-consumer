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

  getEvolucaoNome(nome: string, sexo?: string): Observable<EvolucaoNome[]> {
    console.log("EvolucaoNome", nome, sexo);

    let url = `${this.baseUrl}/${nome}`;
    if (sexo) {
      url += `?sexo=${sexo}`;
    }

    return this.http.get<EvolucaoNome[]>(url);
  }

  getRankingLocalidade(localidade: string, sexo: string): Observable<RankingLocalidade[]> {
    return this.http.get<RankingLocalidade[]>(`${this.baseUrl}/ranking?localidade=${localidade}&sexo=${sexo}`);
  }
}
