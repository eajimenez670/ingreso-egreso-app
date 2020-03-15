import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DashboardComponent } from "./dashboard.component";
import { dashboardRoutes } from "./dashboard.routes";
// import { AuthGuard } from "../auth/auth.guard";

const ROUTES: Routes = [
  {
    path: "",
    component: DashboardComponent,
    children: dashboardRoutes
    // canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
