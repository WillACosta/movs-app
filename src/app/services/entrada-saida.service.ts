import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { EntradaSaida } from '../models/entradas-saidas.model';

@Injectable({
  providedIn: 'root',
})
export class EntradaSaidaService {
  constructor(
    private firestore: AngularFirestore,
    private authS: AuthService,
  ) {}

  criarRegistro(entradaSaida: EntradaSaida) {
    const uid = this.authS.user.uid;

    /**
     * Gravar o registro da movimentação em um doc do firebase
     * para o usuário específico
     */
    return this.firestore
      .doc(`${uid}/entrada-saida`)
      .collection('items')
      .add({ ...entradaSaida })
      .then((ref) => {
        console.log('Movimentação criada!', ref);
      })
      .catch((err) => console.warn(err));

    /**
     * Adiciona um novo elemento à coleção 'items'
     * Obs.: Deve ser um objeto puro e não uma instância
     * de classe
     *
     * {...obj} Desestrutura o objeto e envia apenas as propiedades puras
     */
  }

  initEntradaSaidaListener(uid: string) {
    this.firestore
      .collection(`${uid}/entrada-saida/items`)
      .valueChanges()
      .subscribe((value) => {
        console.log(value);
      });
  }
}
