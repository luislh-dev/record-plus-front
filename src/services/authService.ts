import { UserAuth } from "../types/userAuth";
import { api } from "./api";

export const login = async (user: UserAuth) => {
  return await api.post("/login", {
    name: user.username,
    password: user.password,
  });
};
