import { Button, Input } from '@heroui/react';
import { useAuthLogin } from '../hooks/auth/useAuthLogin';
import { useLoginForm } from '../hooks/auth/useloginForm';

export function Login() {
  const { username, password, setUsername, setPassword, resetForm } = useLoginForm();

  const isEnable = username.length > 0 && password.length > 0;

  const { handleLogin, isLoding, error } = useAuthLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await handleLogin(username, password);
    if (!result.success) {
      resetForm();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
      <Input
        labelPlacement="outside"
        label="usuario"
        variant="bordered"
        isRequired
        placeholder="Ingrese su usuario"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <Input
        labelPlacement="outside"
        placeholder="Ingrese su contraseña"
        variant="bordered"
        label="Contraseña"
        isRequired
        value={password}
        onChange={e => setPassword(e.target.value)}
        type="password"
      />
      <Button color="primary" isDisabled={!isEnable} isLoading={isLoding} type="submit">
        Login
      </Button>
      {error && <p className="text-red-600 text-center">{error.message}</p>}
    </form>
  );
}
