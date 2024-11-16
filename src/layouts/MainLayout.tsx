import { Outlet } from "react-router-dom";
import { useAuth } from "../contexts/useAuthContext";
import { useAuthLogin } from "../hooks/auth/useAuthLogin";
import { Link } from "@nextui-org/react";
import { menuItems } from "@/constants/menuItems";

export const MainLayout = () => {
  const { state } = useAuth();

  const { handleLogout } = useAuthLogin();

  const hasAccess = (roles: string[]) => {
    return roles.some((role) => state.authorities.includes(role));
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="grid grid-cols-[250px_1fr_1fr] grid-rows-[80px_1fr] min-h-screen">
        <aside className="bg-white shadow-lg row-span-2">
          <div className="p-4 flex flex-col gap-2">
            <h1 className="text-xl font-bold mb-4">Record Plus</h1>
            {menuItems.map(
              (item) =>
                hasAccess(item.roles) && (
                  <Link
                    key={item.path}
                    isBlock
                    href={item.path}
                    color="foreground"
                    className={`p-2 rounded ${
                      location.pathname === item.path
                        ? "bg-primary-50 text-primary-500"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {item.label}
                  </Link>
                )
            )}
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
