import { EntradaSaida } from './../models/entradas-saidas.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderMovs',
})
export class OrderMovsPipe implements PipeTransform {
  transform(items: EntradaSaida[]): EntradaSaida[] {
    items.sort((a, b) => {
      if (a.tipo === 'ENTRADA') {
        return -1;
      } else {
        return 1;
      }
    });
    return;
  }
}
