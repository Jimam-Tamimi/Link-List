import { AuthType } from '@/api-calls/auth';
import Cookies from 'js-cookie';

// Store token object securely
export const storeAuthData = async (auth: AuthType) => {
  Cookies.set('auth', JSON.stringify(auth), { secure: true, sameSite: 'strict' });
};

// Retrieve the stored token object
export const getAuthData = async (): Promise<AuthType | null> => {
  const auth = Cookies.get('auth');
  return auth ? JSON.parse(auth) : null;
};

// Remove the stored token object
export const removeAuthData = async () => {
  Cookies.remove('auth');
};