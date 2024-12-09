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
    staleTime: 1000 * 60 * 60 * 24, // 24 horas
  });

  return { state: state ?? [], isLoading, isError };
};
