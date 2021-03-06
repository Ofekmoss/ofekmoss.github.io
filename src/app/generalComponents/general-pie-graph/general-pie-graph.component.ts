import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-general-pie-graph',
  templateUrl: './general-pie-graph.component.html',
  styleUrls: ['./general-pie-graph.component.css']
})
export class GeneralPieGraphComponent implements OnInit {
  @Input() chartLabels: string[];
  doughnutChartLabels: string[];
  doughnutChartData: ChartData<'doughnut'>;
  doughnutChartType: ChartType;
  public options: any = {
    plugins: {
      legend: { position: 'left' }
    }
  }
  constructor() { }

  ngOnInit(): void {
    this.doughnutChartLabels = this.chartLabels;
    this.doughnutChartData = {
      labels: this.doughnutChartLabels,
      datasets: [
        { 
          data: [ 350, 450, 100 ],
          // backgroundColor: ['green', 'yellow','red']
        },
      ],
    }
    this.doughnutChartType = 'doughnut';
  }


  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
}
