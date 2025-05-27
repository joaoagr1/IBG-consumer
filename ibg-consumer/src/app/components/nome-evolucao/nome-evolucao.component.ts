import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { IbgeService } from '../../services/ibge.service';
import { BaseChartComponent, FormField } from '../common/base-chart/base-chart.component';

@Component({
  selector: 'app-nome-evolucao',
  standalone: true,
  imports: [BaseChartComponent],
  templateUrl: './nome-evolucao.component.html',
  styleUrls: ['./nome-evolucao.component.css']
})
export class NomeEvolucaoComponent implements OnInit {
  title = 'Evolução do Ranking de Nome';
  submitButtonText = 'Buscar';

  formData = {
    nome: '',
    sexo: '',
    de: null,
    ate: null
  };

  formFields: FormField[] = [
    {
      id: 'nome',
      label: 'Nome',
      type: 'text',
      required: true,
      placeholder: 'Digite um nome'
    },
    {
      id: 'sexo',
      label: 'Sexo',
      type: 'select',
      options: [
        { value: 'M', label: 'Masculino' },
        { value: 'F', label: 'Feminino' }
      ]
    },
    {
      id: 'de',
      label: 'De',
      type: 'number',
      required: true,
      placeholder: 'Digite uma década'
    },
    {
      id: 'ate',
      label: 'Até',
      type: 'number',
      required: true,
      placeholder: 'Digite uma década'
    }
  ];

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

  buscarEvolucao(formData: any): void {
    if (!formData.nome) return;

    this.ibgeService.getEvolucaoNome(formData.nome, formData.sexo).subscribe(
      (data: any) => {
        const newData = data[0].res.filter((item: any) => {
          const match = item.periodo.match(/\d{4}/g);

          if (match) {
            const periodoInicio = parseInt(match[0]);
            return periodoInicio >= formData.de && periodoInicio <= formData.ate;
          }
          return false;
        });

        this.lineChartData = {
          labels: newData.map((item: any) => item.periodo),
          datasets: [
            {
              data: newData.map((item: any) => item.frequencia),
              label: `Frequência do nome ${formData.nome}`,
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
