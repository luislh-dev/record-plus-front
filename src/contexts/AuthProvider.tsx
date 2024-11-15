import React, { createContext, useReducer, ReactNode, useEffect } from "react";
import {
  authReducer,
  initialState,
  AuthState,
  AuthAction,
} from "../reducers/authReducer";
import { getStoredToken, decodeToken } from "../utils/tokenUtils";
import { useState } from "react";

const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}>({
  state: initialState,
  dispatch: () => null,
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
            type: "LOGIN",
            payload: {
              token,
              username: decoded.sub,
              authorities: decoded.authorities,
            },
          });
        } catch (error) {
          console.error("[AuthProvider] Token initialization failed:", error);
          localStorage.removeItem("token");
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  if (isLoading) {
    return null; // or a loading spinner
  }

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
