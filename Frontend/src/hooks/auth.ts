"use client";

import {
  AuthType,
  fetchMyProfile,
  fetchProfileByUsername,
  ProfileType,
  signIn,
  signUp,
  updateMyProfile,
} from "@/api-calls/auth";
import { getAuthData, removeAuthData, storeAuthData } from "@/storage/auth";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { refreshAuth } from "@/api-calls/api";
import {
  setError,
  setLoading,
  signInSuccess,
  signOut,
} from "@/redux/slices/authSlice";
import { RootState, useAppDispatch } from "@/redux/store";
import { jwtDecode } from "jwt-decode";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useSelector } from "react-redux";
export const useSignIn = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: signIn,
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
  return useMutation({
    mutationFn: signUp,
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
    window.location.href = "/auth/sign-in"; // Redirect to sign-in page after logout
  };

  return signOutFn;
};

export const useCheckAuth = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const auth = useSelector((state: RootState) => state.auth.data);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const checkToken = async () => {
      try {
        if (!auth?.access || !checkTokenValidity(auth?.access)) {
          const newAuth = await refreshAuth();
          if (!newAuth?.access || !checkTokenValidity(newAuth?.access)) {
            dispatch(signOut());
          }
        }
      } catch (error) {
        dispatch(signOut());
      } finally {
        setIsLoading(false); // Set loading to false after handling redirect
      }
    };

    checkToken();
  }, [router]);
  return isLoading;
};

export const useProfileByUsername = (userName: string) => {
  return useQuery({
    queryKey: ["profile", userName],
    queryFn: () => fetchProfileByUsername(userName),
    enabled: !!userName,
    staleTime: 1000 * 60 * 10,
  });
};
export const useMyProfile = () => {
  const profileId = useSelector(
    (state: RootState) => state.auth.data?.profile?.id
  );
  return useQuery({
    queryKey: ["profile", profileId],
    queryFn: () => fetchMyProfile(profileId as number),
    enabled: !!profileId,
    staleTime: 1000 * 60 * 10,
    initialDataUpdatedAt: 1,

    initialData: {
      id: 1,
      user: 1,
      username: "user_name",
      email: "email@gmail.com",
      first_name: "Your",
      last_name: "Name",
      profile_image: "/images/unknown.webp",
      bio: "This is your bio",
    },
  });
};

export const useUpdateProfile = () => {
  const profileId = useSelector(
    (state: RootState) => state.auth.data?.profile?.id
  );

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => updateMyProfile(data, profileId as number),

    onSuccess: (data: ProfileType) => {
      queryClient.setQueryData(
        ["profile", profileId],
        (oldData: AuthType | undefined) => {
          if (!oldData) return;
          return { ...oldData, ...data };
        }
      );
    },
  });
};
