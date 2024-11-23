import React from 'react';
import {
  LoginCredentialsInput,
  useLoginMutation,
} from '@cook-space/data-access';
import { Formik } from 'formik';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { Link, Dialog, Button, Stack, TextField } from '@mui/material';
const Login = () => {
  const navigate = useNavigate();
  const [_, setCookie, removeCookie] = useCookies([
    'accessToken',
    'refreshToken',
  ]);
  const [login] = useLoginMutation({
    onCompleted(data, clientOptions) {
      console.log(data);
      if (data.login.__typename !== 'JWT') {
        removeCookie('accessToken');
        removeCookie('refreshToken');
        return;
      }
      setCookie('accessToken', data.login.accessToken, {
        path: '/',
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      });
      setCookie('refreshToken', data.login.refreshToken, {
        path: '/',
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      });
      navigate('/');
    },
  });

  return (
    <div>
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={(values: LoginCredentialsInput) => {
          const errors: Partial<LoginCredentialsInput> = {};

          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          login({
            variables: {
              input: {
                credentials: values,
              },
            },
          });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          isSubmitting,
        }) => (
          <form
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onSubmit={handleSubmit}
          >
            <Dialog
              open={true}
              title="Login"
              style={{
                width: 300,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Stack style={{ width: 300, gap: 16 }}>
                <TextField
                  name="email"
                  type="email"
                  label="Enter your email"
                  value={values.email}
                  onChange={handleChange}
                  style={{ width: 300 }}
                />
                <TextField
                  label="Enter your password"
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                />
                <Button
                  type="submit"
                  onClick={() => handleSubmit()}
                  disabled={isSubmitting}
                  style={{ width: 300 }}
                >
                  Login
                </Button>
                <Link href="/register">Don't have an account ?</Link>
              </Stack>
            </Dialog>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
