export interface AuthState {
  token: string | null;
  username: string | null;
}

export interface AuthAction {
  type: 'LOGIN' | 'LOGOUT';
  payload?: { token: string; username: string };
}

export const initialState: AuthState = {
  token: null,
  username: null,
};

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return {
        token: action.payload?.token || null,
        username: action.payload?.username || null,
      };
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
};