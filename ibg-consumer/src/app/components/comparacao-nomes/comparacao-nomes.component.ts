import { Component } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { IbgeService } from '../../services/ibge.service';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-comparacao-nomes',
  standalone: true,
  imports: [NgChartsModule, FormsModule],
  templateUrl: './comparacao-nomes.component.html',
  styleUrls: ['./comparacao-nomes.component.css']
})
export class ComparacaoNomesComponent {
  nome1: string = '';
  nome2: string = '';
  sexo: string = '';

  lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Nome 1',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
        tension: 0.4
      },
      {
        data: [],
        label: 'Nome 2',
        backgroundColor: 'rgba(77,83,96,0.2)',
        borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)',
        fill: 'origin',
        tension: 0.4
      }
    ]
  };

  lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      line: {
        tension: 0.4
      }
    },
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
          text: 'Década'
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

  compararNomes() {
    if (!this.nome1 || !this.nome2) {
      alert('Por favor, preencha os dois nomes');
      return;
    }

    this.ibgeService.getEvolucaoNome(this.nome1, this.sexo).subscribe(
      evolucao1 => {
        this.ibgeService.getEvolucaoNome(this.nome2, this.sexo).subscribe(
          evolucao2 => {
            const labels = evolucao1.map(item => item.periodo);
            const dados1 = evolucao1.map(item => item.frequencia);
            const dados2 = evolucao2.map(item => item.frequencia);

            this.lineChartData = {
              labels: labels,
              datasets: [
                {
                  data: dados1,
                  label: this.nome1,
                  backgroundColor: 'rgba(148,159,177,0.2)',
                  borderColor: 'rgba(148,159,177,1)',
                  pointBackgroundColor: 'rgba(148,159,177,1)',
                  pointBorderColor: '#fff',
                  pointHoverBackgroundColor: '#fff',
                  pointHoverBorderColor: 'rgba(148,159,177,0.8)',
                  fill: 'origin',
                  tension: 0.4
                },
                {
                  data: dados2,
                  label: this.nome2,
                  backgroundColor: 'rgba(77,83,96,0.2)',
                  borderColor: 'rgba(77,83,96,1)',
                  pointBackgroundColor: 'rgba(77,83,96,1)',
                  pointBorderColor: '#fff',
                  pointHoverBackgroundColor: '#fff',
                  pointHoverBorderColor: 'rgba(77,83,96,1)',
                  fill: 'origin',
                  tension: 0.4
                }
              ]
            };
          }
        );
      }
    );
  }
} 