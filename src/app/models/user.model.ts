export class Usuario {
  /**
   * Metódo estático para instanciar o usuário
   */
  static fromFirebase({ email, uid, nome }) {
    return new Usuario(uid, nome, email);
  }

  constructor(public uid: string, public nome: string, public email: string) {}
}
