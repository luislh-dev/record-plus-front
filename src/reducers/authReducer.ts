export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  username: string | null;
  authorities: string[];
}

export const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  username: null,
  authorities: [],
};

export type AuthAction =
  | { type: 'LOGIN'; payload: { token: string; username: string; authorities: string[] } }
  | { type: 'LOGOUT' };

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        username: action.payload.username,
        authorities: action.payload.authorities,
      };
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
};
