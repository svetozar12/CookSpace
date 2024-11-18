import { useCookies } from 'react-cookie';
import { Navigate } from 'react-router-dom';
import {
  InternalServerError,
  ProfileDocument,
  User,
} from '../../../../../libs/data-access/src';
import { client } from '../../main';
import { useEffect } from 'react';

export const ProtectedRoute = ({
  children,
}: {
  children: React.JSX.Element;
}) => {
  const [cookie, _, removeCookie] = useCookies(['accessToken']);

  useEffect(() => {
    client
      .query<{ profile: User | InternalServerError }>({
        query: ProfileDocument,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.profile.__typename === 'InternalServerError') {
          removeCookie('accessToken');
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        removeCookie('accessToken');
      });
  }, []);

  if (!cookie.accessToken) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
