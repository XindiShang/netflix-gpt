import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Browse from '../pages/Browse';
import GPT from '../pages/GPT';
import Home from '../pages/Home';
import Movie from '../pages/Movie';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const AppRoutes = () => {
  const location = useLocation();

  const noFooterRoutes = ['/movie'];

  const showFooter = !noFooterRoutes.some((route) =>
    location.pathname.includes(route)
  );

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Home />
            </PublicRoute>
          }
        />
        <Route
          path="/browse"
          element={
            <PrivateRoute>
              <Browse />
            </PrivateRoute>
          }
        />
        <Route
          path="/search"
          element={
            <PrivateRoute>
              <GPT />
            </PrivateRoute>
          }
        />
        <Route
          path="/movie/:id"
          element={
            <PrivateRoute>
              <Movie />
            </PrivateRoute>
          }
        />
      </Routes>
      {showFooter && <Footer />}
    </>
  );
};

const Router = () => (
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);

export default Router;
