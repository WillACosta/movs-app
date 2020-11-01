import { EntradaSaida } from './../models/entradas-saidas.model';
import { createAction, props } from '@ngrx/store';

export const unSetItems = createAction('[EntradaSaida] Unset tItems');

/**
 * A ação recebe um array de items do tipo EntradaSaida model
 */
export const setItems = createAction(
  '[EntradaSaida] Set Items',
  props<{ items: EntradaSaida[] }>()
);
