import { Subscription } from "rxjs";
import { filter } from "rxjs/operators";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.reducer";
import { IngresoEgresoService } from "src/app/ingreso-egreso/ingreso-egreso.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {
  name: string;
  subscription: Subscription = new Subscription();

  constructor(
    public authService: AuthService,
    public ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.subscription = this.store
      .select("auth")
      .pipe(filter(auth => auth.user !== null))
      .subscribe(auth => {
        this.name = auth.user.nombre;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logOut() {
    this.authService.logOut();
    this.ingresoEgresoService.cancelarSubscription();
  }
}
