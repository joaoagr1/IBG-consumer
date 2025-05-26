import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EvolucaoNome {
  periodo: string;
  frequencia: number;
}

@Injectable({
  providedIn: 'root'
})
export class IbgeService {
  private apiUrl = 'https://servicodados.ibge.gov.br/api/v2/censos/nomes';

  constructor(private http: HttpClient) {}

  getEvolucaoNome(nome: string, sexo?: string): Observable<EvolucaoNome[]> {
    let url = `${this.apiUrl}/${nome}`;
    if (sexo) {
      url += `?sexo=${sexo}`;
    }
    return this.http.get<EvolucaoNome[]>(url);
  }

  getRankingLocalidade(localidade: string, sexo?: string): Observable<any> {
    let url = `${this.apiUrl}/ranking?localidade=${localidade}`;
    if (sexo) {
      url += `&sexo=${sexo}`;
    }
    return this.http.get(url);
  }
} 