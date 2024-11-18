import { UserAuth } from "../types/userAuth";
import { api } from "./api/api";

export const login = async (user: UserAuth) => {
  console.log("API URL:", import.meta.env.VITE_API_URL);
  return await api.post("/login", {
    name: user.username,
    password: user.password,
  });
};
