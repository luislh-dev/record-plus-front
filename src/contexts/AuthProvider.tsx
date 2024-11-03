import React, { createContext, useReducer, ReactNode } from 'react';
import { authReducer, initialState, AuthState, AuthAction } from '../reducers/authReducer';

const AuthContext = createContext<{ state: AuthState; dispatch: React.Dispatch<AuthAction> }>({
  state: initialState,
  dispatch: () => null,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };