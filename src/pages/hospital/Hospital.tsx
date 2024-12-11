import { ModalConfirmDelete } from "@/components/ModalConfirmDelete";
import { useHospital } from "@/pages/hospital/hooks/useHospital";
import { DropDownFilter } from "./components/DropDrownFilter";
import { DropDownSort } from "./components/DropDownSort";
import { SearchImput } from "./components/Search";
import { HospitalList } from "./components/HospitalList";
import { Header } from "./components/Header";

const Hospital = () => {
  // Obtener toda la funcionalidad del hook
  const {
    deleteState: { isDeleting },
    isOpen,
    closeDeleteModal,
    handleDelete,
  } = useHospital();

  // Definición de columnas para la tabla

  return (
    <>
      <div>
        {/* Encabezado */}
        <Header />

        {/* Barra de búsqueda y filtros */}
        <search className="px-2 pb-2 pt-4 flex gap-x-4">
          <SearchImput />
          <DropDownFilter />
          <DropDownSort />
        </search>
        {/* Tabla de hospitales */}
        <HospitalList />
      </div>

      {/* Modal de confirmación para eliminar */}
      <ModalConfirmDelete
        isOpen={isOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        title="Eliminar Hospital"
        message="¿Está seguro que desea eliminar este hospital? Esta acción no se puede deshacer."
      />
    </>
  );
};

export default Hospital;
