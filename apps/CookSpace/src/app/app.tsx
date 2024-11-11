import { Route, Routes, Link } from 'react-router-dom';
import Login from './components/Login';
import Recipes from './components/Recipes';
import { ProtectedRoute } from './utilts/auth';

export function App() {
  const routes = [
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <Recipes />
        </ProtectedRoute>
      ),
    },
  ];
  return (
    <div>
      <Routes>
        {routes.map((route) => {
          return (
            <Route key={route.path} path={route.path} element={route.element} />
          );
        })}
      </Routes>
    </div>
  );
}

export default App;
