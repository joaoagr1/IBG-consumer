import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { IbgeService } from '../../services/ibge.service';
import { EvolucaoNome } from '../../services/ibge.service';

@Component({
  selector: 'app-comparacao-nomes',
  standalone: true,
  imports: [CommonModule, FormsModule, NgChartsModule],
  templateUrl: './comparacao-nomes.component.html',
  styleUrls: ['./comparacao-nomes.component.css']
})
export class ComparacaoNomesComponent implements OnInit {
  nome1: string = '';
  nome2: string = '';
  sexo: string = '';
  dadosComparacao: { [key: string]: EvolucaoNome[] } = {};

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
    // Inicializa os dados vazios para os nomes
    this.dadosComparacao = {
      [this.nome1]: [],
      [this.nome2]: []
    };
  }

  compararNomes(): void {

    if (!this.nome1 || !this.nome2) return;


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


    this.ibgeService.getEvolucaoNome(this.nome1).subscribe(
      (data1: any[]) => {
        this.dadosComparacao[this.nome1] = data1;
        this.ibgeService.getEvolucaoNome(this.nome2).subscribe(
          (data2: any[]) => {
            this.dadosComparacao[this.nome2] = data2;
            this.lineChartData = {
              labels: data1[0].res.map((item: any) => item.periodo),
              datasets: [
                {
                  data: data1[0].res.map((item: any) => item.frequencia),
                  label: this.nome1,
                  fill: true,
                  tension: 0.5,
                  borderColor: 'rgb(75, 192, 192)',
                  backgroundColor: 'rgba(75, 192, 192, 0.3)'
                },
                {
                  data: data2[0].res.map((item: any) => item.frequencia),
                  label: this.nome2,
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
