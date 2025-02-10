import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Record Plus</h1>
        <Outlet />
      </div>
    </div>
  );
};
