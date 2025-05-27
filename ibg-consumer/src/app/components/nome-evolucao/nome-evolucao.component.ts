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
  de: any;
  ate: any;

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Evolução',
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

        const newData = data[0].res.filter((item: any) => {
          const match = item.periodo.match(/\d{4}/g);

          if (match) {
            const periodoInicio = parseInt(match[0]);
            return periodoInicio >= this.de && periodoInicio <= this.ate;
          }
          return false;
        });

        this.lineChartData = {
          labels: newData.map((item: any) => item.periodo),
          datasets: [
            {
              data: newData.map((item: any) => item.frequencia),
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
