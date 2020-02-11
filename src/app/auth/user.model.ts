export class User {
  public nombre: string;
  public uid: string;
  public email: string;

  constructor(user: DataUserFB) {
    this.nombre = (user && user.nombre) || null;
    this.uid = (user && user.uid) || null;
    this.email = (user && user.email) || null;
  }
}

interface DataUserFB {
  nombre: string;
  uid: string;
  email: string;
}
