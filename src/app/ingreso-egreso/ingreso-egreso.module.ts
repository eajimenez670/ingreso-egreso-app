import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

// Componentes
import { DashboardComponent } from "../dashboard/dashboard.component";
import { IngresoEgresoComponent } from "./ingreso-egreso.component";
import { DetalleComponent } from "./detalle/detalle.component";
import { EstadisticaComponent } from "./estadistica/estadistica.component";

// Pipes
import { OrdenIngresoEgresoPipe } from "./orden-ingreso-egreso.pipe";

// Gráficas
import { ChartsModule } from "ng2-charts";

// Módulos
import { SharedModule } from "../shared/shared.module";
import { DashboardRoutingModule } from "../dashboard/dashboard-routing.module";
import { StoreModule } from "@ngrx/store";
import { ingresoEgresoReducer } from "./ingreso-egreso.reducer";

@NgModule({
  declarations: [
    DashboardComponent,
    IngresoEgresoComponent,
    DetalleComponent,
    EstadisticaComponent,
    OrdenIngresoEgresoPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChartsModule,
    SharedModule,
    DashboardRoutingModule,
    StoreModule.forFeature("ingresoEgreso", ingresoEgresoReducer)
  ]
})
export class IngresoEgresoModule {}
