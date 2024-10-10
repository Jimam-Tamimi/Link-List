"use client";

import { AuthType, fetchProfileById, signIn, signUp } from '@/api-calls/auth';
import { getAuthData, removeAuthData, storeAuthData } from '@/storage/auth';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'; 
import { refreshAuth } from '@/api-calls/api';
import { setError, setLoading, signInSuccess, signOut } from '@/redux/slices/authSlice';
import { useAppDispatch } from '@/redux/store';
import { jwtDecode } from 'jwt-decode'; 
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
export const useSignIn = () => {
  const dispatch = useAppDispatch();

  return useMutation( {
    mutationFn:signIn,
    onMutate: () => {
      dispatch(setLoading(true));
    },
    onSuccess: async (data: AuthType) => {
      dispatch(signInSuccess(data)); // Dispatch sign-in success
      // await storeAuthData(data); // Store JWT on success
    },
    onError: (error: AxiosError) => {
      dispatch(setError(error.message)); // Dispatch error
    },
    onSettled: () => {
      dispatch(setLoading(false));
    },
  });
};

export const useSignUp = () => {
  const dispatch = useAppDispatch();
  return useMutation( {
    mutationFn:signUp,
    onMutate: () => {
      dispatch(setLoading(true));
    },
    onSuccess: async (data: AuthType) => {
      dispatch(signInSuccess(data)); // Dispatch sign-in success
      // await storeAuthData(data); // Store JWT on success
    },
    onError: (error: AxiosError) => {
      dispatch(setError(error.message)); // Dispatch error
    },
    onSettled: () => {
      dispatch(setLoading(false));
    },
  });
};

const checkTokenValidity = (token: string): boolean => {
  try {
    const decoded: any = jwtDecode(token);
    const expirationTime = decoded.exp * 1000; // Convert to milliseconds
    return expirationTime > Date.now();
  } catch {
    return false;
  }
};

export const useSignOut = () => {
  const dispatch = useAppDispatch();
  
  const signOutFn = async () => {
    dispatch(signOut()); // Dispatch sign-in success
    await removeAuthData();
    window.location.href = '/auth/sign-in'; // Redirect to sign-in page after logout
  };

  return signOutFn;
};

export const useAuthRedirect = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const checkToken = async () => {
  //     try {
  //       const auth = await getAuthData();
  //       if (!auth?.access || !checkTokenValidity(auth?.access)) {
  //         const newAuth = await refreshAuth();
  //         if (!newAuth?.access || !checkTokenValidity(newAuth?.access)) {
  //           await removeAuthData();
  //           router.replace('/auth/sign-in'); // Redirect to sign-in page
  //           return;
  //         }
  //       }
  //     } catch (error) {
  //       await removeAuthData();
  //       router.replace('/auth/sign-in');
  //     } finally { 
  //       setIsLoading(false); // Set loading to false after handling redirect
  //     }
  //   };

  //   checkToken();
  // }, [router]);
  return isLoading;
};

export const useProfile = (id: string) => {
  return useQuery({ queryKey: ['profile', id], queryFn: () => fetchProfileById(id) });
};