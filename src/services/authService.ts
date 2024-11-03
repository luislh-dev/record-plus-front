import axios from 'axios';
import { UserAuth } from '../types/userAuth';

export const login = async (user: UserAuth) => {
  return await axios.post('http://localhost:8080/login', {
    name: user.username,
    password: user.password,
  });
};