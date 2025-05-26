import { Component } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { IbgeService } from '../../services/ibge.service';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-ranking-localidade',
  standalone: true,
  imports: [NgChartsModule, FormsModule],
  templateUrl: './ranking-localidade.component.html',
  styleUrls: ['./ranking-localidade.component.css']
})
export class RankingLocalidadeComponent {
  localidade: string = '';
  sexo: string = '';

  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Frequência',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)'
      }
    ]
  };

  barChartOptions: ChartConfiguration<'bar'>['options'] = {
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
    },
    plugins: {
      legend: { display: true },
      tooltip: {
        mode: 'index',
        intersect: false
      }
    }
  };

  constructor(private ibgeService: IbgeService) {}

  buscarRanking() {
    if (!this.localidade) {
      alert('Por favor, preencha a localidade');
      return;
    }

    this.ibgeService.getRankingLocalidade(this.localidade, this.sexo).subscribe(
      ranking => {
        const nomes = ranking.map((item: any) => item.nome);
        const frequencias = ranking.map((item: any) => item.frequencia);

        this.barChartData = {
          labels: nomes,
          datasets: [
            {
              data: frequencias,
              label: 'Frequência',
              backgroundColor: 'rgba(148,159,177,0.2)',
              borderColor: 'rgba(148,159,177,1)'
            }
          ]
        };
      }
    );
  }
} 