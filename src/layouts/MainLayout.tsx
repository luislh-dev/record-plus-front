import { menuItems } from '@/constants/menuItems';
import { Close } from '@/icons/Close';
import { Menu } from '@/icons/Menu';
import { useState } from 'react';
import { Outlet, Link as RouterLink, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/useAuthContext';
import { useAuthLogin } from '../hooks/auth/useAuthLogin';

export const MainLayout = () => {
  const { state } = useAuth();
  const location = useLocation();
  const { handleLogout } = useAuthLogin();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const hasAccess = (roles: string[]) => {
    return roles.some(role => state.authorities.includes(role));
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 overflow-x-hidden">
      <nav className="h-16 bg-slate-900 text-white px-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 hover:bg-slate-800 rounded-lg"
            type="button"
          >
            {isMenuOpen ? <Close size={24} /> : <Menu size={24} />}
          </button>
          <h1 className="text-xl font-bold">Record Plus</h1>
        </div>
        <div className="flex items-center gap-4">
          <span>{state.username}</span>
          <button
            onClick={handleLogout}
            className="bg-purple-500 hover:bg-purple-600 px-4 py-1.5 rounded-full text-sm"
            type="button"
          >
            Cerrar Sesión
          </button>
        </div>
      </nav>

      <div className="flex relative">
        {/* Overlay para cerrar el menú al hacer clic fuera */}
        {isMenuOpen && (
          <button
            className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-20"
            onClick={() => setIsMenuOpen(false)}
            type="button"
          />
        )}

        {/* Menú lateral */}
        <aside
          className={`
            fixed md:static w-[240px] bg-white shadow-[4px_0_24px_-6px_rgba(59,130,246,0.3)]
            min-h-[calc(100vh-64px)] z-30 transition-transform duration-300
            ${isMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          `}
        >
          <div className="p-4 flex flex-col gap-3">
            {menuItems.map(
              item =>
                hasAccess(item.roles) && (
                  <RouterLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`p-3 rounded-lg transition-colors ${
                      location.pathname === item.path
                        ? 'bg-purple-100 text-purple-700'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    {item.label}
                  </RouterLink>
                )
            )}
          </div>
        </aside>

        <main className="flex-1 p-4 md:p-8 w-full overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
