import { Formik } from 'formik';
import React from 'react';
import {
  RegisterInput,
  useRegisterMutation,
} from '../../../../../../libs/data-access/src';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import {
  Dialog,
  ITextFieldStyles,
  Link,
  PrimaryButton,
  Stack,
  Text,
  TextField,
} from '@fluentui/react';

const Register = () => {
  const navigate = useNavigate();
  const [_, setCookie, removeCookie] = useCookies([
    'accessToken',
    'refreshToken',
  ]);
  const [login] = useRegisterMutation({
    onCompleted(data, clientOptions) {
      if (data.register.__typename !== 'JWT') {
        removeCookie('accessToken');
        return;
      }
      setCookie('accessToken', data.register.accessToken);
      setCookie('refreshToken', data.register.refreshToken);
      navigate('/');
    },
  });

  const textFieldStyles: Partial<ITextFieldStyles> = {
    fieldGroup: { width: 300 },
  };

  return (
    <div>
      <Formik
        initialValues={{ email: '', password: '', name: '' }}
        validate={(values: RegisterInput) => {
          const errors: Partial<RegisterInput> = {};

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
              input: values,
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
                    Register
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
                  label="Email"
                  value={values.email}
                  onChange={handleChange}
                  styles={textFieldStyles}
                  errorMessage={(touched.email && errors.email) || ''}
                  placeholder="Enter your email"
                />
                <TextField
                  label="Name"
                  name="name"
                  styles={textFieldStyles}
                  value={values.name}
                  onChange={handleChange}
                  errorMessage={(touched.name && errors.name) || ''}
                  placeholder="Enter your name"
                ></TextField>
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  styles={textFieldStyles}
                  canRevealPassword
                  revealPasswordAriaLabel="Show password"
                  errorMessage={(touched.password && errors.password) || ''}
                  placeholder="Enter your password"
                />

                <PrimaryButton
                  primary
                  type="submit"
                  onClick={() => handleSubmit()}
                  disabled={isSubmitting}
                  style={{ width: 300 }}
                >
                  Register
                </PrimaryButton>
                <Link href="/login">Already have an account</Link>
              </Stack>
            </Dialog>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
