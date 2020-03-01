import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { AuthService } from "../auth/auth.service";
import { IngresoEgreso } from "./ingreso-egreso.model";
import { Store } from "@ngrx/store";
import { AppState } from "../app.reducer";
import { filter, map } from "rxjs/operators";
import { SetItemsAction } from "./ingreso-egreso.actions";
import { Subscription } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class IngresoEgresoService {
  ingresoEgresoListenerSubscription: Subscription = new Subscription();
  ingresoEgresoItemsSubscription: Subscription = new Subscription();

  constructor(
    private afDb: AngularFirestore,
    public authService: AuthService,
    private store: Store<AppState>
  ) {}

  initIngresoEgresoListener() {
    this.ingresoEgresoListenerSubscription = this.store
      .select("auth")
      .pipe(filter(auth => auth.user !== null))
      .subscribe(auth => this.ingresoEgresoItems(auth.user.uid));
  }

  private ingresoEgresoItems(uid: string) {
    this.ingresoEgresoItemsSubscription = this.afDb
      .collection(`${uid}/ingresos-egresos/items`)
      .snapshotChanges()
      .pipe(
        map(items => {
          return items.map(item => {
            return {
              uid: item.payload.doc.id,
              ...(item.payload.doc.data() as Object)
            };
          });
        })
      )
      .subscribe((items: any[]) => {
        this.store.dispatch(new SetItemsAction(items));
      });
  }

  cancelarSubscription() {
    this.ingresoEgresoListenerSubscription.unsubscribe();
    this.ingresoEgresoItemsSubscription.unsubscribe();
  }

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    const user = this.authService.getUsuario();

    return this.afDb
      .doc(`${user.uid}/ingresos-egresos`)
      .collection("items")
      .add({ ...ingresoEgreso });
  }

  borrarItemIngresoEgreso(uid: string) {
    const user = this.authService.getUsuario();

    return this.afDb.doc(`${user.uid}/ingresos-egresos/items/${uid}`).delete();
  }
}
