import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { EvolucaoNome, IbgeService } from '../../services/ibge.service';
import { BaseChartComponent, FormField } from '../common/base-chart/base-chart.component';

@Component({
  selector: 'app-comparacao-nomes',
  standalone: true,
  imports: [BaseChartComponent],
  templateUrl: './comparacao-nomes.component.html',
  styleUrls: ['./comparacao-nomes.component.css']
})
export class ComparacaoNomesComponent implements OnInit {
  title = 'Comparação de Nomes';
  submitButtonText = 'Comparar';

  formData = {
    nome1: '',
    nome2: '',
  };

  dadosComparacao: { [key: string]: EvolucaoNome[] } = {};

  formFields: FormField[] = [
    {
      id: 'nome1',
      label: 'Primeiro Nome',
      type: 'text',
      required: true
    },
    {
      id: 'nome2',
      label: 'Segundo Nome',
      type: 'text',
      required: true
    }
  ];

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: '',
        fill: true,
        tension: 0.5,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.3)'
      },
      {
        data: [],
        label: '',
        fill: true,
        tension: 0.5,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.3)'
      }
    ]
  };

  public lineChartOptions: ChartConfiguration<'line'>['options'] = {
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
          text: 'Período'
        }
      }
    }
  };

  constructor(private ibgeService: IbgeService) {}

  ngOnInit(): void {
    this.dadosComparacao = {
      [this.formData.nome1]: [],
      [this.formData.nome2]: []
    };
  }

  compararNomes(formData: any): void {
    if (!formData.nome1 || !formData.nome2) return;

    this.dadosComparacao = {};
    this.lineChartData = {
      labels: [],
      datasets: [
        {
          data: [],
          label: '',
          fill: true,
          tension: 0.5,
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.3)'
        },
        {
          data: [],
          label: '',
          fill: true,
          tension: 0.5,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.3)'
        }
      ]
    };

    this.ibgeService.getEvolucaoNome(formData.nome1).subscribe(
      (data1: any[]) => {
        this.dadosComparacao[formData.nome1] = data1;
        this.ibgeService.getEvolucaoNome(formData.nome2).subscribe(
          (data2: any[]) => {
            this.dadosComparacao[formData.nome2] = data2;
            this.lineChartData = {
              labels: data1[0].res.map((item: any) => item.periodo),
              datasets: [
                {
                  data: data1[0].res.map((item: any) => item.frequencia),
                  label: formData.nome1,
                  fill: true,
                  tension: 0.5,
                  borderColor: 'rgb(75, 192, 192)',
                  backgroundColor: 'rgba(75, 192, 192, 0.3)'
                },
                {
                  data: data2[0].res.map((item: any) => item.frequencia),
                  label: formData.nome2,
                  fill: true,
                  tension: 0.5,
                  borderColor: 'rgb(255, 99, 132)',
                  backgroundColor: 'rgba(255, 99, 132, 0.3)'
                }
              ]
            };
          },
          (error: Error) => {
            console.error('Erro ao buscar dados do segundo nome:', error);
          }
        );
      },
      (error: Error) => {
        console.error('Erro ao buscar dados do primeiro nome:', error);
      }
    );
  }
}
