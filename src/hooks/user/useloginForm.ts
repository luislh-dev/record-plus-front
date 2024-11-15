import { useState } from 'react';

export const useLoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const resetForm = () => {
    setUsername('');
    setPassword('');
  };

  return {
    username,
    password,
    setUsername,
    setPassword,
    resetForm
  };
};