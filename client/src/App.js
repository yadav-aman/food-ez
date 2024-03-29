import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { lazy, Suspense } from 'react';

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
const UserPage = lazy(() => import('./components/Users'));
const OrdersPage = lazy(() => import('./components/Orders'));
const MyOrdersPage = lazy(() => import('./components/MyOrders'));
const AddProductPage = lazy(() => import('./components/AddProduct'));
const UpdateStockPage = lazy(() => import('./components/UpdateStock'));

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
                <UserPage />
              </PrivateRoute>
              <PrivateRoute path="/product/:id">
                <ProductPage />
              </PrivateRoute>
              <PrivateRoute path="/products" exact={true}>
                <ProductsPage />
              </PrivateRoute>
              <PrivateRoute path="/admin/orders" exact={true}>
                <OrdersPage />
              </PrivateRoute>
              <PrivateRoute path="/user/orders" exact={true}>
                <MyOrdersPage />
              </PrivateRoute>
              <PrivateRoute path="/admin/product" exact={true}>
                <AddProductPage />
              </PrivateRoute>
              <PrivateRoute path="/admin/update" exact={true}>
                <UpdateStockPage />
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
