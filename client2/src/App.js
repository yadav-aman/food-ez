import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

import DashboardLayout from './dashboard/layout';
import ProjectsPage from './pages/admin/projects';
import UsersPage from './components/Users';
import DashboardProvider from './dashboard/provider/context';
import ProductsPage from './pages/admin/products';
import ProductPage from './pages/admin/product';
import Login from './components/Login';
import Dashboard from './components/dashboard';
import Register from './components/Register';
import PrivateRoute from './routes/privateRoute';
import PublicRoute from './routes/publicRoute';

function App() {
  return (
    <Router>
      <Switch>
        <PublicRoute path="/login" exact={true}>
          <Login />
        </PublicRoute>
        <PublicRoute path="/register" exact={true}>
          <Register />
        </PublicRoute>
        <DashboardProvider>
          <DashboardLayout>
            <PrivateRoute path="/" exact={true}>
              <Dashboard />
            </PrivateRoute>
            <PrivateRoute path="/admin/dashboard" exact={true}>
              <Dashboard />
            </PrivateRoute>
            <PrivateRoute path="/admin/users" exact={true}>
              <UsersPage />
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
            <Redirect from="*" to="/" />
          </DashboardLayout>
        </DashboardProvider>
      </Switch>
    </Router>
  );
}

export default App;
