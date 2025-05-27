import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';

export interface FormField {
  id: string;
  label: string;
  type: 'text' | 'select' | 'number';
  required?: boolean;
  placeholder?: string;
  options?: { value: any; label: string }[];
}

@Component({
  selector: 'app-base-chart',
  standalone: true,
  imports: [CommonModule, FormsModule, NgChartsModule],
  templateUrl: './base-chart.component.html',
  styleUrls: ['./base-chart.component.css']
})
export class BaseChartComponent {
  @Input() title: string = '';
  @Input() formFields: FormField[] = [];
  @Input() submitButtonText: string = 'Buscar';
  @Input() showChart: boolean = false;
  @Input() showTable: boolean = false;
  @Input() tableHeaders: string[] = [];
  @Input() tableData: any[][] = [];
  @Input() formData: { [key: string]: any } = {};

  @Input() chartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: []
  };

  @Input() chartOptions: ChartConfiguration<'line'>['options'] = {
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

  @Output() formSubmit = new EventEmitter<{ [key: string]: any }>();

  onSubmit() {
    this.formSubmit.emit(this.formData);
  }
}
