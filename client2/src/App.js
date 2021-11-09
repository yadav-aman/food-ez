import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import ProjectsPage from './pages/admin/projects';
import CalendarPage from './pages/admin/calendar';
import PrivateRoute from './routes/privateRoute';
import PublicRoute from './routes/publicRoute';
import Loader from './components/loader';

const Login = lazy(() => import('./components/Login'));
const Register = lazy(() => import('./components/Register'));
const DashboardLayout = lazy(() => import('./dashboard/layout'));
const DashboardProvider = lazy(() => import('./dashboard/provider/context'));
const Dashboard = lazy(() => import('./components/dashboard'));
const ProductsPage = lazy(() => import('./pages/admin/products'));
const ProductPage = lazy(() => import('./pages/admin/product'));

function App() {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Switch>
          <PublicRoute path="/login" exact={true}>
            <Login />
          </PublicRoute>
          <PublicRoute path="/register" exact={true}>
            <Register />
          </PublicRoute>
          <DashboardProvider>
            <DashboardLayout>
              <PrivateRoute path="/admin/dashboard" exact={true}>
                <Dashboard />
              </PrivateRoute>
              <PrivateRoute path="/admin/users" exact={true}>
                <CalendarPage />
              </PrivateRoute>
              <PrivateRoute path="/product/:id">
                <ProductPage />
              </PrivateRoute>
              <PrivateRoute path="/products" exact={true}>
                <ProductsPage />
              </PrivateRoute>
              <PrivateRoute path="/admin/orders" exact={true}>
                <ProjectsPage />
              </PrivateRoute>
              <Redirect from="*" to="/admin/dashboard" />
            </DashboardLayout>
          </DashboardProvider>
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
