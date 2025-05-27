import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { IbgeService } from '../../services/ibge.service';
import { RankingLocalidade } from '../../services/ibge.service';

@Component({
  selector: 'app-ranking-localidade',
  standalone: true,
  imports: [CommonModule, FormsModule, NgChartsModule],
  templateUrl: './ranking-localidade.component.html',
  styleUrls: ['./ranking-localidade.component.css']
})
export class RankingLocalidadeComponent implements OnInit {
  localidade: string = '';
  sexo: string = '';
  dadosRanking: any[] = [];

  constructor(private ibgeService: IbgeService) {}

  ngOnInit(): void {}

  buscarRanking(): void {
    if (!this.localidade) return;

    this.ibgeService.getRankingLocalidade(this.localidade, this.sexo).subscribe(
      (data: any[]) => {

        this.dadosRanking = data;
      },
      (error: Error) => {
        console.error('Erro ao buscar dados:', error);
      }
    );
  }
}
