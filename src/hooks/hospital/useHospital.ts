import { useState, useEffect } from "react";
import { createHospital, getHospitals } from "@/services/hospitalService";
import { HospitalListDTO } from "@/types/DTO/hospital/HospitalListDTO";
import { PageResponse } from "@/types/Pagination";
import { HospitalCreateRequest } from "@/types/DTO/hospital/HospitalCreateRequest";

export const useHospitals = () => {
  const [hospitals, setHospitals] = useState<HospitalListDTO[]>([]);
  const [pagination, setPagination] = useState<Omit<
    PageResponse<HospitalListDTO>,
    "content"
  > | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [searchQuery, setSearchQuery] = useState("");

  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        setLoading(true);
        console.log("Fetching with query:", searchQuery); // Debug log
        const data = await getHospitals({
          pageNumber: page,
          pageSize,
          name: searchQuery || undefined, // Only send if not empty
          ruc: searchQuery || undefined,
        });

        setHospitals(data.content);
        const { ...paginationData } = data;
        setPagination(paginationData);
      } catch (err) {
        setError("Error al cargar hospitales");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    // Reset to first page when search changes
    if (page !== 0 && searchQuery) {
      setPage(0);
      return;
    }

    const debounceTimer = setTimeout(() => {
      fetchHospitals();
    }, 300); // Reduced debounce time

    return () => clearTimeout(debounceTimer);
  }, [page, pageSize, searchQuery]);

  const handleCreateHospital = async (hospitalData: HospitalCreateRequest) => {
    try {
      setIsCreating(true);
      setCreateError(null);

      const newHospital = await createHospital(hospitalData);

      // Refresh the hospitals list
      const updatedData = await getHospitals({
        pageNumber: 0, // Go to first page
        pageSize,
        name: searchQuery || undefined,
        ruc: searchQuery || undefined,
      });

      setHospitals(updatedData.content);
      const { ...paginationData } = updatedData;
      setPagination(paginationData);
      setPage(0); // Reset to first page

      return newHospital;
    } catch (error) {
      setCreateError("Error al crear el hospital");
      throw error;
    } finally {
      setIsCreating(false);
    }
  };

  return {
    hospitals,
    loading,
    error,
    pagination,
    setPage,
    setPageSize,
    currentPage: page,
    totalPages: pagination?.totalPages ?? 0,
    setSearchQuery,
    createHospital: handleCreateHospital,
    isCreating,
    createError,
  };
};
