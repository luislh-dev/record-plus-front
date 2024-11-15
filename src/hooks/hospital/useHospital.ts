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

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const data = await getHospitals({ pageNumber: page, pageSize });
        setHospitals(data.content);
        // Removemos la desestructuración de content ya que no lo usamos
        const { ...paginationData } = data;
        setPagination(paginationData);
      } catch (err) {
        setError("Error al cargar hospitales");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, [page, pageSize]);

  return {
    hospitals,
    loading,
    error,
    pagination,
    setPage,
    setPageSize,
    currentPage: page,
    totalPages: pagination?.totalPages ?? 0,
  };
};
