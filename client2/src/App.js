import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import HomePage from './pages';
import DashboardLayout from './dashboard/layout';
import ProjectsPage from './pages/admin/projects';
import CalendarPage from './pages/admin/calendar';
import DashboardProvider from './dashboard/provider/context';
import ProductsPage from './pages/admin/products';
import ProductPage from './pages/admin/product';

function App() {
  return (
    <Router>
      <DashboardProvider>
        <DashboardLayout>
          <Switch>
            <Route path="/" exact={true}>
              <HomePage />
            </Route>
            <Route path="/admin/users" exact={true}>
              <CalendarPage />
            </Route>
            <Route path="/product/:id">
              <ProductPage />
            </Route>
            <Route path="/products" exact={true}>
              <ProductsPage />
            </Route>
            <Route path="/admin/orders" exact={true}>
              <ProjectsPage />
            </Route>
          </Switch>
        </DashboardLayout>
      </DashboardProvider>
    </Router>
  );
}

export default App;
