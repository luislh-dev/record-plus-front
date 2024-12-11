import { ModalConfirmDelete } from "@/components/ModalConfirmDelete";
import { useHospital } from "@/pages/hospital/hooks/useHospital";
import { Add } from "@/icons/Add";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { DropDownFilter } from "./components/DropDrownFilter";
import { DropDownSort } from "./components/DropDownSort";
import { SearchImput } from "./components/Search";
import { HospitalList } from "./components/HospitalList";

const Hospital = () => {
  const navigate = useNavigate();

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
        <Header onAddHospital={() => navigate("/hospitals/add")} />

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

// Componentes auxiliares para mejorar la legibilidad

interface HeaderProps {
  onAddHospital: () => void;
}

function Header({ onAddHospital }: HeaderProps) {
  return (
    <div className="flex max-w-full justify-between px-3">
      <h1 className="text-2xl font-bold">Lista de Hospitales</h1>
      <Button
        color="primary"
        onClick={onAddHospital}
        endContent={<Add size={18} />}
      >
        Agregar Hospital
      </Button>
    </div>
  );
}

export default Hospital;
