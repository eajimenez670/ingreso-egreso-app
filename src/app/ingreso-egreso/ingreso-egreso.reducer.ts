import * as fromActions from "./ingreso-egreso.actions";
import { IngresoEgreso } from "./ingreso-egreso.model";

export interface IngresoEgresoState {
  items: IngresoEgreso[];
}

const initState: IngresoEgresoState = {
  items: []
};

export function ingresoEgresoReducer(
  state = initState,
  action: fromActions.Acciones
): IngresoEgresoState {
  switch (action.type) {
    case fromActions.SET_ITEMS:
      return {
        items: [
          ...action.items.map(item => {
            return {
              ...item
            };
          })
        ]
      };

    case fromActions.UNSET_ITEMS:
      return {
        items: []
      };

    default:
      return state;
  }
}
