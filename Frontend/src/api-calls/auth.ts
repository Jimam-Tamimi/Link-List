import api from './api';

interface UserType {
  id: number;
  username: string;
  email: string;
}

export interface ProfileType {
  id: number;
  user: string;
  username: string; // Added username
  email: string; // Added email
  first_name?: string;
  last_name?: string;
  profile_image?: string;
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

export const fetchMyProfile = async (id: number): Promise<ProfileType> => {
  const response = await api.get(`/auth/profiles/${id}/`);
  return response.data ;
};


export const updateMyProfile = async (profileData: Partial<ProfileType>, id:number): Promise<ProfileType> => {
 

  const response = await api.patch(`/auth/profiles/${id}/`, profileData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
