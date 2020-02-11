import { User } from "./user.model";
import * as fromActions from "./auth.actions";

export interface AuthState {
  user: User;
}

export const initialState: AuthState = {
  user: null
};

export function authReducer(
  state = initialState,
  action: fromActions.acciones
): AuthState {
  switch (action.type) {
    case fromActions.SET_USER:
      return {
        user: {
          ...action.user
        }
      };

    default:
      return state;
  }
}
