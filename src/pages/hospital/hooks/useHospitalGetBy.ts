import { useDebounce } from "@/hooks/useDebounce";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { getHospital, getHospitalsByName } from "../service/hospitalService";
import { HospitalCreateRequest } from "../types/HospitalCreateRequest";
import { HospitalFindByNameParams } from "../types/HospitalRequestParams";

export function useHospitalGetBy() {
  const [getByIdState, setGetByIdState] = useState({
    isLoading: false,
    error: null as string | null,
    data: null as HospitalCreateRequest | null,
  });

  // Obtener por id
  const getById = useCallback(async (id: number) => {
    setGetByIdState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const hospital = await getHospital(id);
      setGetByIdState((prev) => ({
        ...prev,
        data: hospital,
        isLoading: false,
      }));
      return hospital;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error al obtener el hospital";
      setGetByIdState((prev) => ({
        ...prev,
        error: message,
        isLoading: false,
      }));
      throw error;
    }
  }, []);

  return { getByIdState, getById };
}

export function useHospitalGetByName() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const fetchHospitals = async ({ pageParam = 0 }) => {
    const params: HospitalFindByNameParams = {
      name: debouncedSearchTerm,
      size: 10,
      page: pageParam,
    };
    return getHospitalsByName(params);
  };

  const { data, isError, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["hospitalsName", debouncedSearchTerm],
    queryFn: fetchHospitals,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => (lastPage.last ? undefined : allPages.length),
  });

  const hospitals = data?.pages.flatMap((page) => page.content) ?? [];

  return {
    isLoading,
    hasNextPage,
    fetchNextPage,
    isError,
    hospitals,
    searchTerm,
    setSearchTerm,
  };
}
