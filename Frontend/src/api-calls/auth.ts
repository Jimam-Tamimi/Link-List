import api from './api';
import NProgress from 'nprogress';

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
  NProgress.start();
  try {
    const response = await api.post('/auth/token/', data);
    return response.data as AuthType;
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  } finally {
    NProgress.done();
  }
};

export const signUp = async (data: SignUpFormDataType) => {
  NProgress.start();
  try {
    const response = await api.post('/auth/users/', data);
    return response.data;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  } finally {
    NProgress.done();
  }
};

export const fetchMyProfile = async (id: number): Promise<ProfileType> => {
  NProgress.start();
  try {
    const response = await api.get(`/auth/profiles/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching my profile:", error);
    throw error;
  } finally {
    NProgress.done();
  }
};

export const fetchProfileByUsername = async (username: string): Promise<ProfileType> => {
  NProgress.start();
  try {
    const response = await api.post(`/auth/profiles/get-profile-by-username/`, { username });
    return response.data;
  } catch (error) {
    console.error("Error fetching profile by username:", error);
    throw error;
  } finally {
    NProgress.done();
  }
};

export const updateMyProfile = async (profileData: Partial<ProfileType>, id: number): Promise<ProfileType> => {
  NProgress.start();
  try {
    const response = await api.patch(`/auth/profiles/${id}/`, profileData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating my profile:", error);
    throw error;
  } finally {
    NProgress.done();
  }
};
 
