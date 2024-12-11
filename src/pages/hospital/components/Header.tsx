import { Add } from "@/icons/Add";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();
  return (
    <div className="flex max-w-full justify-between px-3">
      <h1 className="text-2xl font-bold">Lista de Hospitales</h1>
      <Button
        color="primary"
        onClick={() => navigate("/hospitals/add")}
        endContent={<Add size={18} />}
      >
        Agregar Hospital
      </Button>
    </div>
  );
}
