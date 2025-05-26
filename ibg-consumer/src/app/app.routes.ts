import { Routes } from '@angular/router';
import { RankingLocalidadeComponent } from './components/ranking-localidade/ranking-localidade.component';
import { NomeEvolucaoComponent } from './components/nome-evolucao/nome-evolucao.component';
import { ComparacaoNomesComponent } from './components/comparacao-nomes/comparacao-nomes.component';

export const routes: Routes = [
  { path: 'ranking', component: RankingLocalidadeComponent },
  { path: 'evolucao', component: NomeEvolucaoComponent },
  { path: 'comparacao', component: ComparacaoNomesComponent },
  { path: '', redirectTo: '/ranking', pathMatch: 'full' }
];
