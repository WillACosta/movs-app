import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/ui.reducer';
import * as auth from './auth/auth.reducer';
import * as entSai from './erp/entrada-saida.reducer';

export interface AppState {
  ui: ui.State;
  auth: auth.State;
  // enSai: entSai.State;
}

/**
 * Fazer referência aos redutores que poderão
 * ser utilizados
 */
export const appReducers: ActionReducerMap<AppState> = {
  ui: ui.uiReducer,
  auth: auth.authReducer,
  // enSai: entSai.entradaSaidaReducer,
};
