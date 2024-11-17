import React from 'react';
import {
  LoginCredentialsInput,
  useLoginMutation,
} from '@cook-space/data-access';
import { Formik } from 'formik';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Stack,
  ITextFieldStyles,
  PrimaryButton,
  Text,
  Dialog,
} from '@fluentui/react';
const Login = () => {
  const navigate = useNavigate();
  const [_, setCookie, removeCookie] = useCookies([
    'accessToken',
    'refreshToken',
  ]);
  const [login] = useLoginMutation({
    onCompleted(data, clientOptions) {
      if (data.login.__typename !== 'JWT') {
        removeCookie('accessToken');
        return;
      }
      setCookie('accessToken', data.login.accessToken);
      setCookie('refreshToken', data.login.refreshToken);
      navigate('/login');
    },
  });

  const textFieldStyles: Partial<ITextFieldStyles> = {
    fieldGroup: { width: 300 },
  };

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
              hidden={false}
              dialogContentProps={{
                title: (
                  <Text variant="xLargePlus" style={{ fontWeight: 'bold' }}>
                    Login
                  </Text>
                ),
              }}
              styles={{
                main: {
                  width: 400,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              }}
            >
              <Stack tokens={{ childrenGap: 10, maxWidth: 300 }}>
                <TextField
                  name="email"
                  type="email"
                  label="Enter your email"
                  value={values.email}
                  onChange={handleChange}
                  styles={textFieldStyles}
                  errorMessage={(touched.email && errors.email) || ''}
                />
                <TextField
                  label="Enter your password"
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  styles={textFieldStyles}
                  canRevealPassword
                  revealPasswordAriaLabel="Show password"
                  errorMessage={(touched.password && errors.password) || ''}
                />
                <PrimaryButton
                  primary
                  type="submit"
                  disabled={isSubmitting}
                  style={{ width: 300 }}
                >
                  Login
                </PrimaryButton>
              </Stack>
            </Dialog>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
