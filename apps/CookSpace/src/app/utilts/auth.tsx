import { useCookies } from 'react-cookie';
import { Navigate } from 'react-router-dom';
import { useProfileQuery } from '../../../../../libs/data-access/src';
import { useEffect } from 'react';
import { Spinner } from '@fluentui/react';
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
  } = useProfileQuery({
    onCompleted(data) {
      if (data.profile.__typename === 'InternalServerError') {
        removeCookie('accessToken');
        removeCookie('refreshToken');
      }
    },
    onError() {
      removeCookie('accessToken');
      removeCookie('refreshToken');
    },
  });

  if (loading) {
    return <Spinner />;
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
