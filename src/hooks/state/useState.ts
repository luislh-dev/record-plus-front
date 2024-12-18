import { ONE_WEEK_IN_MS } from "@/constants/times";
import { getStates } from "@/services/stateService";
import { useQuery } from "@tanstack/react-query";

export const useStates = () => {
  const {
    data: state,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["states"],
    queryFn: async () => getStates(),
    staleTime: ONE_WEEK_IN_MS,
    gcTime: ONE_WEEK_IN_MS,
  });

  return { state: state ?? [], isLoading, isError };
};
