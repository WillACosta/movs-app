import { unSetItems } from './../erp/entrada-saida.action';
import { Store } from '@ngrx/store';
import { Usuario } from './../models/user.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { AppState } from '../app.reducer';

import * as authActions from '../auth/auth.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userSubscription: Subscription;
  private _user: Usuario;

  /**
   * Obter instância do usuário
   */
  get user(){
    // return {...this._user}
    return this._user;
  }

  constructor(
    private auth: AngularFireAuth,
    public firestore: AngularFirestore,
    private store: Store<AppState>
  ) {}

  /**
   * Captura informações do usuário
   * Inscrição deve estar sempre ativa, para verificar se existe o usuário ou não
   */
  initAuthListener() {
    this.auth.authState.subscribe((fUser) => {
      // console.log(fUser?.uid);
      if (fUser) {
        /**
         * Inscrição para logar o usuário e fazer logout
         * Obs.: Somente para o usuário ativo, destruir a inscrição logo após
         * o logout
         */
        this.userSubscription = this.firestore
          .doc(`${fUser.uid}/usuario`)
          .valueChanges()
          .subscribe((fireUser: any) => {
            const user = Usuario.fromFirebase(fireUser);
            this._user = user;
            this.store.dispatch(authActions.setUser({ user }));

          });
      } else {
        this._user = null;
        this.userSubscription.unsubscribe();
        this.store.dispatch(authActions.unSetUser());
        this.store.dispatch(unSetItems()); //Sempre que o usuário faz o logout os items do store será limpado
      }
    });
  }

  criarUsuario(nome: string, email: string, senha: string) {
    return (
      this.auth
        .createUserWithEmailAndPassword(email, senha)
        /**
         * Depois que o usuário for criado, então :
         * Usar a desestruturação do objeto diretamente
         */
        .then(({ user }) => {
          const newU = new Usuario(user.uid, nome, email);

          /**
           * Criar uma rota dentro do banco firestone, sempre que um usuário
           * se cadastrar teremos os registros separados dentro do diretório raiz
           */
          return this.firestore.doc(`${user.uid}/usuario`).set({ ...newU }); //Seta a desestruturação do objeto para o firebase aceita-lo
        })
    );
  }

  login(email: string, senha: string) {
    return this.auth.signInWithEmailAndPassword(email, senha);
  }

  /**
   * Retornar a promessa
   * .then (Quando ela for resolvida)
   */
  logout() {
    return this.auth.signOut();
  }

  /**
   * authState é um observable do firebase, então usamos o pipe
   * para capturar o retorno e depois com o map mudamos a informação
   * a ser retornada
   */
  isAuth() {
    return this.auth.authState.pipe(map((fUser) => fUser != null));
  }
  /**
   * Se firebase User diferente de null, retornará true. Do contrário falso
   */
}
