import React, { createContext, useReducer, ReactNode, useEffect } from 'react';
import { authReducer, initialState, AuthState, AuthAction } from '../reducers/authReducer';
import { getStoredToken, decodeToken } from '../utils/tokenUtils';

const AuthContext = createContext<{ state: AuthState; dispatch: React.Dispatch<AuthAction> }>({
  state: initialState,
  dispatch: () => null,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const token = getStoredToken();
    if (token) {
      const decoded = decodeToken(token);
      dispatch({
        type: 'LOGIN',
        payload: {
          token,
          username: decoded.sub,
          authorities: decoded.authorities
        }
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };