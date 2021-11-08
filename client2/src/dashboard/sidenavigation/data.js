import DashboardIcon from './icons/dashboard';
import OrdersIcon from './icons/orders';
import ProductIcons from './icons/products';
import UsersIcon from './icons/users';

const data = [
  {
    title: 'Dashboard',
    icon: <DashboardIcon />,
    link: '/admin/dashboard',
  },
  {
    title: 'Users',
    icon: <UsersIcon />,
    link: '/admin/users',
  },
  {
    title: 'Products',
    icon: <ProductIcons />,
    link: '/products',
  },
  {
    title: 'Orders',
    icon: <OrdersIcon />,
    link: '/admin/orders',
  },
];

export default data;
