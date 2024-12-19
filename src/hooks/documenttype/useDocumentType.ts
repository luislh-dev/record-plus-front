import { ONE_WEEK_IN_MS } from "@/constants/times";
import { getDocumentTypes } from "@/services/DocumentTypeService";
import { useQuery } from "@tanstack/react-query";

export const useDocumentType = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["documentType"],
    queryFn: async () => getDocumentTypes(),
    staleTime: ONE_WEEK_IN_MS,
    gcTime: ONE_WEEK_IN_MS,
  });

  return { documentType: data ?? [], isLoading, isError };
};
