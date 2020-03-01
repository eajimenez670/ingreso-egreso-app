import { Subscription } from "rxjs";
import { filter } from "rxjs/operators";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.reducer";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styles: []
})
export class NavbarComponent implements OnInit, OnDestroy {
  name: string;
  subscription = new Subscription();

  constructor(private store: Store<AppState>) {}

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
}
