import { Component, Input, OnInit } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexDataLabels,
  ApexStroke,
  NgApexchartsModule
} from 'ng-apexcharts';

@Component({
  selector: 'app-line-chart',
  imports: [NgApexchartsModule],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.css'
})
export class LineChartComponent implements OnInit{
  
  @Input() title: string = 'Chart';   // 🔹 Chart Title
  @Input() chartSeries!: ApexAxisChartSeries;  // 🔹 Data series
  @Input() categories: string[] = [];  // 🔹 X-Axis Labels

  chartOptions!: {
    chart: ApexChart;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis;
    dataLabels: ApexDataLabels;
    stroke: ApexStroke;
  };

  ngOnInit() {
    this.initializeChart();
  }

  initializeChart() {
    this.chartOptions = {
      chart: { 
        type: 'line', 
        height: 320
      },
      xaxis: { categories: this.categories },
      yaxis: { title: { text: this.title } },
      dataLabels: { enabled: false },
      stroke: { curve: 'smooth' }
    };
  }
}
