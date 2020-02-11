import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import * as firebase from "firebase";
import { map } from "rxjs/operators";
import { AngularFirestore } from "@angular/fire/firestore";
import { User } from "./user.model";
import { Store } from "@ngrx/store";
import { AppState } from "../app.reducer";
import {
  ActivarLoadingAction,
  DesactivarLoadingAction
} from "../shared/ui.actions";
import { SetUserAction } from "./auth.actions";
import { Subscription } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  userSubscription: Subscription = new Subscription();

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private afDB: AngularFirestore,
    private store: Store<AppState>
  ) {}

  initAuthListener() {
    this.afAuth.authState.subscribe((fbUser: firebase.User) => {
      if (fbUser) {
        this.userSubscription = this.afDB
          .doc(`${fbUser.uid}/usuario`)
          .valueChanges()
          .subscribe((user: any) => {
            const newUser: User = new User(user);
            this.store.dispatch(new SetUserAction(newUser));
            console.log(newUser);
          });
      } else {
        this.userSubscription.unsubscribe();
      }
    });
  }

  crearUsuario(nombre: string, email: string, password: string) {
    this.store.dispatch(new ActivarLoadingAction());
    this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(resp => {
        const user: User = {
          nombre: nombre,
          email: resp.user.email,
          uid: resp.user.uid
        };

        this.afDB
          .doc(`${user.uid}/usuario`)
          .set(user)
          .then(() => {
            this.router.navigate(["/"]);
            this.store.dispatch(new DesactivarLoadingAction());
          })
          .catch(err => {
            console.error(err);
            this.store.dispatch(new DesactivarLoadingAction());
            Swal.fire(
              "Error en el guardado de los datos",
              err.message,
              "error"
            );
          });
      })
      .catch(err => {
        console.error(err);
        this.store.dispatch(new DesactivarLoadingAction());
        Swal.fire("Error en el registro", err.message, "error");
      });
  }

  logIn(email: string, password: string) {
    this.store.dispatch(new ActivarLoadingAction());
    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(resp => {
        this.router.navigate(["/"]);
        this.store.dispatch(new DesactivarLoadingAction());
      })
      .catch(err => {
        console.error(err);
        this.store.dispatch(new DesactivarLoadingAction());
        Swal.fire("Error en el LogIn", err.message, "error");
      });
  }

  logOut() {
    this.afAuth.auth.signOut();
    this.router.navigate(["/login"]);
  }

  isAuth() {
    return this.afAuth.authState.pipe(
      map(fbUser => {
        if (fbUser === null) this.router.navigate(["/login"]);
        return fbUser !== null;
      })
    );
  }
}
