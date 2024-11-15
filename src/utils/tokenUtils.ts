import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '../types/decodedToken';

export const decodeToken = (token: string): DecodedToken => {
  return jwtDecode<DecodedToken>(token);
};

export const hasRole = (authorities: string[], role: string): boolean => {
  return authorities.includes(role);
};

export const getStoredToken = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  
  try {
    const decoded = decodeToken(token);
    const currentTime = Date.now() / 1000;
    
    if (decoded.exp < currentTime) {
      localStorage.removeItem('token');
      return null;
    }
    
    return token;
  } catch {
    //console.error('Error decoding token', error);
    localStorage.removeItem('token');
    return null;
  }
};