import { Subscription } from "rxjs";
import { Tipos, IngresoEgreso } from "./ingreso-egreso.model";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { IngresoEgresoService } from "./ingreso-egreso.service";
import Swal from "sweetalert2";
import { Store } from "@ngrx/store";
import { AppState } from "../app.reducer";
import {
  ActivarLoadingAction,
  DesactivarLoadingAction
} from "../shared/ui.actions";

@Component({
  selector: "app-ingreso-egreso",
  templateUrl: "./ingreso-egreso.component.html",
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  formIngresoEgreso: FormGroup;
  tipo: Tipos = "ingreso";

  loadingSubs: Subscription = new Subscription();
  isLoading: boolean;

  constructor(
    public ingresoService: IngresoEgresoService,
    private store: Store<AppState>
  ) {
    this.formIngresoEgreso = new FormGroup({
      descripcion: new FormControl("", Validators.required),
      monto: new FormControl(0, Validators.min(1))
    });
  }

  ngOnInit() {
    this.loadingSubs = this.store.select("ui").subscribe(state => {
      this.isLoading = state.isLoading;
    });
  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe();
  }

  saveIngresoEgreso() {
    this.store.dispatch(new ActivarLoadingAction());

    const ingresoEgreso = new IngresoEgreso({
      ...this.formIngresoEgreso.value,
      tipo: this.tipo
    });

    this.ingresoService
      .crearIngresoEgreso(ingresoEgreso)
      .then(() => {
        this.store.dispatch(new DesactivarLoadingAction());
        Swal.fire("Descripción", ingresoEgreso.descripcion, "success");
        this.formIngresoEgreso.reset({ monto: 0 });
      })
      .catch(err => {
        this.store.dispatch(new DesactivarLoadingAction());
        Swal.fire("Error al guardar", err, "error");
      });
  }
}
