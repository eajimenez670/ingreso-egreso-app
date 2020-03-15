import { Component, OnInit, OnDestroy } from "@angular/core";
import { AppState } from "src/app/app.reducer";
import { Store } from "@ngrx/store";
import { IngresoEgreso } from "../ingreso-egreso.model";
import { Subscription } from "rxjs";
import { IngresoEgresoService } from "../ingreso-egreso.service";
import Swal from "sweetalert2";
import { AppStateWithIngresoEgreso } from "../ingreso-egreso.reducer";

@Component({
  selector: "app-detalle",
  templateUrl: "./detalle.component.html",
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {
  items: IngresoEgreso[] = [];
  subscription: Subscription = new Subscription();

  constructor(
    private store: Store<AppStateWithIngresoEgreso>,
    public ingresoEgresoService: IngresoEgresoService
  ) {}

  ngOnInit() {
    this.subscription = this.store
      .select("ingresoEgreso")
      .subscribe(ingresoEgreso => {
        console.log(ingresoEgreso.items);
        this.items = ingresoEgreso.items;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  borrarItem(item: IngresoEgreso) {
    this.ingresoEgresoService.borrarItemIngresoEgreso(item.uid).then(() => {
      Swal.fire("Eliminado", item.descripcion, "success");
    });
  }
}
