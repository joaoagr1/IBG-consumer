import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { IbgeService } from '../../services/ibge.service';
import { EvolucaoNome } from '../../services/ibge.service';

@Component({
  selector: 'app-nome-evolucao',
  standalone: true,
  imports: [CommonModule, FormsModule, NgChartsModule],
  templateUrl: './nome-evolucao.component.html',
  styleUrls: ['./nome-evolucao.component.css']
})
export class NomeEvolucaoComponent implements OnInit {
  nome: string = '';
  sexo: string = '';
  dadosEvolucao: EvolucaoNome[] = [];

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Frequência',
        fill: true,
        tension: 0.5,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.3)'
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

  ngOnInit(): void {}

  buscarEvolucao(): void {
    if (!this.nome) return;

    this.ibgeService.getEvolucaoNome(this.nome, this.sexo).subscribe(
      (data: any) => {
        this.dadosEvolucao = data;
        console.log(data)
        this.lineChartData = {
          labels: data[0].res.map((item: any) => item.periodo),
          datasets: [
            {
              data: data[0].res.map((item: any) => item.frequencia),
              label: `Frequência do nome ${this.nome}`,
              fill: true,
              tension: 0.5,
              borderColor: 'rgb(75, 192, 192)',
              backgroundColor: 'rgba(75, 192, 192, 0.3)'
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
