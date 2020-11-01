import { EntradaSaida } from './../../models/entradas-saidas.model';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { AppStateWithMovs } from '../entrada-saida.reducer';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css'],
})
export class StatisticComponent implements OnInit {
  entradas: number = 0;
  saidas: number = 0;

  totalEntradas: number = 0;
  totalSaidas: number = 0;

  /** Configurações do gráfico */

  // Doughnut
  public doughnutChartLabels: Label[] = ['Saídas', 'Entradas'];
  public doughnutChartData: MultiDataSet = [];
  public doughnutChartType: ChartType = 'doughnut';

  constructor(private store: Store<AppStateWithMovs>) {}

  ngOnInit() {
    this.store.select('enSai').subscribe(({ items }) => {
      this.gerarEstatistica(items);
    });
  }

  gerarEstatistica(items: EntradaSaida[]) {
    this.totalEntradas = 0;
    this.totalSaidas = 0;
    this.entradas = 0;
    this.saidas = 0;

    for (const item of items) {
      if (item.tipo === 'ENTRADA') {
        this.totalEntradas += item.valor;
        this.entradas++;
      } else {
        this.totalSaidas += item.valor;
        this.saidas++;
      }
    }

    this.doughnutChartData = [[this.totalSaidas, this.totalEntradas]];
  }
}
