import { useCookies } from 'react-cookie';
import { Navigate } from 'react-router-dom';
import { useProfileQuery } from '../../../../../libs/data-access/src';
import { useEffect } from 'react';
import { CircularProgress } from '@mui/material';
// Protect routes
export const ProtectedRoute = ({
  children,
}: {
  children: React.JSX.Element;
}) => {
  const [cookie, _, removeCookie] = useCookies(['accessToken', 'refreshToken']);
  const {
    data: profile,
    loading,
    error,
    refetch,
  } = useProfileQuery({
    onCompleted(data) {
      console.log(data);
      if (data.profile.__typename === 'InternalServerError') {
        removeCookie('accessToken');
        removeCookie('refreshToken');
      }
    },
    onError(err) {
      console.log(err);
      removeCookie('accessToken');
      removeCookie('refreshToken');
    },
  });

  useEffect(() => {
    refetch();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (!cookie.accessToken || error || !profile) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Unprotect routes
export const UnprotectedRoute = ({
  children,
}: {
  children: React.JSX.Element;
}) => {
  const [cookie] = useCookies(['accessToken']);
  useEffect(() => {
    if (cookie.accessToken) {
      window.location.href = '/';
    }
  }, []);
  return children;
};
