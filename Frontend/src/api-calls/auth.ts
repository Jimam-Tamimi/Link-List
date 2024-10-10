import api from './api';

interface UserType {
  id: number;
  username: string;
  email: string;
}

interface ProfileType {
  id: number;
  user: string;
  username: string; // Added username
  email: string; // Added email
  firstName?: string;
  lastName?: string;
  profileImage?: string;
  bio?: string;
}

export type AuthType = {
  access: string | null;
  refresh: string | null;
  profile: ProfileType | null; // Added profile to AuthType
};
export type SignInFormDataType = {
   emailOrUsername: string;
   password: string 
};


export type SignUpFormDataType = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}



export const signIn = async (data: SignInFormDataType) => {
  const response = await api.post('/auth/token/', data);
  return response.data as AuthType;
};

export const signUp = async (data: SignUpFormDataType) => {
  const response = await api.post('/auth/users/', data);
  return response.data;
};

export const fetchProfileById = async (id: string) => {
  const response = await api.get(`/auth/profiles/${id}/`);
  return response.data as ProfileType;
};