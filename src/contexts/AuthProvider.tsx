import React, { createContext, ReactNode, useEffect, useReducer, useState } from 'react';
import { AuthAction, authReducer, AuthState, initialState } from '../reducers/authReducer';
import { decodeToken, getStoredToken } from '../utils/tokenUtils';

const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}>({
  state: initialState,
  dispatch: () => null
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = getStoredToken();

      if (token) {
        try {
          const decoded = decodeToken(token);
          dispatch({
            type: 'LOGIN',
            payload: {
              token,
              username: decoded.sub,
              authorities: decoded.authorities
            }
          });
        } catch {
          throw new Error('Error al decodificar el token');
          localStorage.removeItem('token');
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  if (isLoading) {
    return null; // or a loading spinner
  }

  return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>;
};

export { AuthContext };
