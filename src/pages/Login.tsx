import { useLoginForm } from '../hooks/auth/useloginForm';
import { useAuthLogin } from '../hooks/auth/useAuthLogin';

export function Login() {
  const { username, password, setUsername, setPassword, resetForm } = useLoginForm();
  const { handleLogin } = useAuthLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await handleLogin(username, password);
    if (!result.success) {
      resetForm();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}
