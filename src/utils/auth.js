import { jwtDecode } from 'jwt-decode';

const TOKEN_KEY = 'ticketing_token';

export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const decodeToken = () => {
  const token = getToken();
  if (!token) return null;
  
  try {
    const decoded = jwtDecode(token);
    if (decoded.exp * 1000 < Date.now()) {
      removeToken();
      return null;
    }
    return decoded;
  } catch (error) {
    console.error("Failed to decode token:", error);
    removeToken();
    return null;
  }
};

export const isAuthenticated = () => {
  return !!decodeToken();
};

export const getUserRole = () => {
  const decoded = decodeToken();
  return decoded?.role || null;
};

export const isAdmin = () => {
  return getUserRole() === 'admin';
};

export const isUser = () => {
  return getUserRole() === 'user';
};

export const getUserId = () => {
  const decoded = decodeToken();
  return decoded?.id || null;
};