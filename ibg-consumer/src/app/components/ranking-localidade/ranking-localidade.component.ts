import { Component, OnInit } from '@angular/core';
import { IbgeService } from '../../services/ibge.service';
import { BaseChartComponent, FormField } from '../common/base-chart/base-chart.component';

@Component({
  selector: 'app-ranking-localidade',
  standalone: true,
  imports: [BaseChartComponent],
  templateUrl: './ranking-localidade.component.html',
  styleUrls: ['./ranking-localidade.component.css']
})
export class RankingLocalidadeComponent implements OnInit {
  title = 'Ranking por Localidade';
  submitButtonText = 'Buscar';
  tableHeaders = ['Nome', 'Frequência'];
  tableData: any[][] = [];

  formData = {
    localidade: '',
    sexo: ''
  };

  formFields: FormField[] = [
    {
      id: 'localidade',
      label: 'Localidade',
      type: 'select',
      required: true,
      options: [
        { value: '1100205', label: 'RO - Rondônia' },
        { value: '1200401', label: 'AC - Acre' },
        { value: '1302603', label: 'AM - Amazonas' },
        { value: '1400100', label: 'RR - Roraima' },
        { value: '1501402', label: 'PA - Pará' },
        { value: '1600303', label: 'AP - Amapá' },
        { value: '1702109', label: 'TO - Tocantins' },
        { value: '2105302', label: 'MA - Maranhão' },
        { value: '2207702', label: 'PI - Piauí' },
        { value: '2304400', label: 'CE - Ceará' },
        { value: '2408102', label: 'RN - Rio Grande do Norte' },
        { value: '2507507', label: 'PB - Paraíba' },
        { value: '2609600', label: 'PE - Pernambuco' },
        { value: '2704302', label: 'AL - Alagoas' },
        { value: '2800308', label: 'SE - Sergipe' },
        { value: '2903201', label: 'BA - Bahia' },
        { value: '3106200', label: 'MG - Minas Gerais' },
        { value: '3205309', label: 'ES - Espírito Santo' },
        { value: '3304557', label: 'RJ - Rio de Janeiro' },
        { value: '3509502', label: 'SP - São Paulo' },
        { value: '4106902', label: 'PR - Paraná' },
        { value: '4205407', label: 'SC - Santa Catarina' },
        { value: '4305108', label: 'RS - Rio Grande do Sul' },
        { value: '5002704', label: 'MS - Mato Grosso do Sul' },
        { value: '5103403', label: 'MT - Mato Grosso' },
        { value: '5208707', label: 'GO - Goiás' },
        { value: '5300108', label: 'DF - Distrito Federal' }
      ]
    },
    {
      id: 'sexo',
      label: 'Sexo',
      type: 'select',
      options: [
        { value: 'M', label: 'Masculino' },
        { value: 'F', label: 'Feminino' }
      ]
    }
  ];

  constructor(private ibgeService: IbgeService) {}

  ngOnInit(): void {}

  buscarRanking(formData: any): void {
    if (!formData.localidade) return;

    this.ibgeService.getRankingLocalidade(formData.localidade, formData.sexo).subscribe(
      (data: any[]) => {
        this.tableData = data[0]?.res.slice(0, 3).map((item: any) => [
          item.nome,
          item.frequencia
        ]) || [];
      },
      (error: Error) => {
        console.error('Erro ao buscar dados:', error);
      }
    );
  }
}
