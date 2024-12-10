import { PageRequest } from "@/types/page/PageRequest";

export interface UserSearchParams extends PageRequest {
  username?: string;
  dni?: string;
  hospital?: string;
  id?: string;
  role?: string;
}
