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
  dadosRanking: RankingLocalidade[] = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Frequência',
        backgroundColor: 'rgba(75, 192, 192, 0.3)',
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 1
      }
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Frequência'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Nome'
        }
      }
    }
  };

  constructor(private ibgeService: IbgeService) {}

  ngOnInit(): void {}

  buscarRanking(): void {
    if (!this.localidade) return;

    this.ibgeService.getRankingLocalidade(this.localidade, this.sexo).subscribe(
      (data: RankingLocalidade[]) => {
        this.dadosRanking = data;
        this.barChartData = {
          labels: data.map(item => item.nome),
          datasets: [
            {
              data: data.map(item => item.frequencia),
              label: 'Frequência',
              backgroundColor: 'rgba(75, 192, 192, 0.3)',
              borderColor: 'rgb(75, 192, 192)',
              borderWidth: 1
            }
          ]
        };
      },
      (error: Error) => {
        console.error('Erro ao buscar dados:', error);
      }
    );
  }
} 