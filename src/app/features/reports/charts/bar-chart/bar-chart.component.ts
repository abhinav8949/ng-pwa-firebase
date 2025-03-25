import { Component, Input, OnChanges } from '@angular/core';
import { ApexAxisChartSeries, NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-bar-chart',
  imports: [NgApexchartsModule],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css'
})
export class BarChartComponent implements OnChanges {

  @Input() categories: string[] = [];
  @Input() chartSeries: ApexAxisChartSeries = [];

  chartOptions: any = {};

  ngOnChanges() {
    this.loadChart();
  }

  loadChart() {
    this.chartOptions = {
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false, // Vertical bars
        }
      },
      dataLabels: {
        enabled: true
      },
      xaxis: {
        categories: this.categories
      },
      series: this.chartSeries
    };
  }
}
