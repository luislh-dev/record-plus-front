import { Outlet } from "react-router-dom";
import { useAuth } from "../contexts/useAuthContext";
import { useAuthLogin } from "../hooks/auth/useAuthLogin";

export const MainLayout = () => {
  const { state } = useAuth();

  const { handleLogout } = useAuthLogin();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="grid grid-cols-[250px_1fr_1fr] grid-rows-[80px_1fr] min-h-screen">
        <aside className="bg-white shadow-lg row-span-2">
          <div className="p-4">
            <h1 className="text-xl font-bold">Record Plus</h1>
          </div>
        </aside>

        <nav className="bg-white shadow-sm col-span-2 flex items-center px-6">
          <div className="flex justify-between w-full">
            <h2>Dashboard</h2>
            <div className="flex items-center gap-4">
              <span>Bienvenido, {state.username}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </nav>

        <main className="col-span-2 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
