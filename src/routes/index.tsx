import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from '@/components/Header';
import Articles from '../pages/Articles';
import Browse from '../pages/Browse';
import Home from '../pages/Home';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const Router = () => (
  <BrowserRouter>
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
        path="/articles"
        element={
          <PrivateRoute>
            <Articles />
          </PrivateRoute>
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
    </Routes>
  </BrowserRouter>
);

export default Router;
