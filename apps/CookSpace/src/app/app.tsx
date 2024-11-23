import { Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Recipes from './components/Recipes/RecipesList';
import { ProtectedRoute, UnprotectedRoute } from './utilts/auth';
import Register from './components/Register/Register';
import Layout from './components/Layout/Layout';

export function App() {
  const routes = [
    {
      path: '/login',
      element: <Login />,
      isPublic: true,
    },
    {
      path: '/register',
      element: <Register />,
      isPublic: true,
    },
    {
      path: '/',
      element: <Recipes />,
      isPublic: true,
    },
  ];
  return (
    <Layout>
      <Routes>
        {routes.map((route) => {
          const isPublic = route.isPublic;

          if (isPublic) {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={<UnprotectedRoute>{route.element}</UnprotectedRoute>}
              />
            );
          }

          return (
            <Route
              key={route.path}
              path={route.path}
              element={<ProtectedRoute>{route.element}</ProtectedRoute>}
            />
          );
        })}
      </Routes>
    </Layout>
  );
}

export default App;
