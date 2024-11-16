import { useState, useEffect } from "react";
import { getHospitals } from "@/services/hospitalService";
import { HospitalListDTO } from "@/types/DTO/HospitalListDTO";
import { PageResponse } from "@/types/Pagination";

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
  };
};
