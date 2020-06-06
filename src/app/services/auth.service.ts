import { Usuario } from './../models/user.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: AngularFireAuth,
    public firestore: AngularFirestore
  ) {}

  /**
   * Captura informações do usuário
   */
  initAuthListener() {
    this.auth.authState.subscribe((fUser) => {
      console.log(fUser);
      console.log(fUser?.uid);
      console.log(fUser?.email);
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
