import React from 'react';
import {
  LoginCredentialsInput,
  useLoginMutation,
} from '@cook-space/data-access';
import { Formik } from 'formik';
import { useCookies } from 'react-cookie';
const Login = () => {
  const [_, setCookie, removeCookie] = useCookies(['accessToken']);
  const [login] = useLoginMutation({
    onCompleted(data, clientOptions) {
      if (data.login.__typename !== 'JWT') {
        removeCookie('accessToken');
        return;
      }
      setCookie('accessToken', data.login.accessToken);
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
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />

            {errors.email && touched.email && errors.email}

            <input
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />

            {errors.password && touched.password && errors.password}

            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
