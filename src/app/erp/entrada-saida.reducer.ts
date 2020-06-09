import { EntradaSaida } from './../models/entradas-saidas.model';
import { createReducer, on } from '@ngrx/store';
import { setItems, unSetItems } from './entrada-saida.action';

export interface State {
  items: EntradaSaida[];
}

export const initialState: State = {
  items: [],
};

const _entradaSaidaReducer = createReducer(
  initialState,
  on(setItems, (state, { items }) => ({ ...state, items: [...items] })),
  on(unSetItems, (state) => ({ ...state, items: [] }))
);

export function entradaSaidaReducer(state, action) {
  return _entradaSaidaReducer(state, action);
}
