import DashboardIcon from './icons/dashboard';
import OrdersIcon from './icons/orders';
import ProductIcons from './icons/products';
import UsersIcon from './icons/users';

const data = [
  {
    title: 'Dashboard',
    icon: <DashboardIcon />,
    link: '/admin/dashboard',
    access: ['admin'],
  },
  {
    title: 'Users',
    icon: <UsersIcon />,
    link: '/admin/users',
    access: ['admin'],
  },
  {
    title: 'Products',
    icon: <ProductIcons />,
    link: '/products',
    access: ['admin', 'users'],
  },
  {
    title: 'Orders',
    icon: <OrdersIcon />,
    link: '/admin/orders',
    access: ['admin'],
  },
  {
    title: 'My Orders',
    icon: <OrdersIcon />,
    link: '/user/orders',
    access: ['users'],
  },
];

export default data;
