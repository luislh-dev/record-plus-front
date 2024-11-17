import { ReactNode } from "react";
import { UserContext } from "./UserContext";
import { useUsers } from "@/hooks/user/useUsers";

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const userState = useUsers();

  return (
    <UserContext.Provider value={userState}>{children}</UserContext.Provider>
  );
};
