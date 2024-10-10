"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { getAuthData } from '@/storage/auth';

interface AuthRouteProps {
  children: React.ReactNode;
  allowedUserType: 'AUTHENTICATED' | 'ANONYMOUS';
}

const AuthRoute = ({ children, allowedUserType }: AuthRouteProps) => {
  const router = useRouter();
  const auth = useSelector((state: RootState) => state.auth.auth);

  useEffect(() => {
    const checkAuth = async () => {
      const storedAuth = await getAuthData();
      const isAUTHENTICATED = auth || storedAuth;

      if (allowedUserType === 'AUTHENTICATED' && !isAUTHENTICATED) {
        router.replace('/auth/sign-in');
      } else if (allowedUserType === 'ANONYMOUS' && isAUTHENTICATED) {
        router.replace('/dashboard'); // Redirect to a protected page if AUTHENTICATED
      }
    };

    checkAuth();
  }, [auth, router, allowedUserType]);

  if ((allowedUserType === 'AUTHENTICATED' && !auth) || (allowedUserType === 'ANONYMOUS' && auth)) {
    return null; // Optionally, you can return a loading spinner here
  }

  return <>{children}</>;
};

export default AuthRoute;