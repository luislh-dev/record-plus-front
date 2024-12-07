import { UserSearch } from "@/components/UserSearch";
import { UserTable } from "@/components/UserTable";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

const User = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-row items-center justify-between mx-3">
        <h1 className="text-3xl font-bold">Usuarios</h1>
        <Button color="primary" onClick={() => navigate("/hospital/add")}>
          Agregar Usuarios
        </Button>
      </div>
      <div className="mx-4 pb-4 pt-3">
        <UserSearch />
      </div>

      <UserTable />
    </>
  );
}

export default User;