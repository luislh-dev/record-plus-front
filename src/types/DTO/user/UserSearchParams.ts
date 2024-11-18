import { PageRequest } from "@/types/Pagination";

export interface UserSearchParams extends PageRequest {
  username?: string;
  dni?: string;
  hospital?: string;
  id?: string;
  role?: string;
}
