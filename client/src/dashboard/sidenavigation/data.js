import AddProductIcon from './icons/AddProductIcon';
import DashboardIcon from './icons/dashboard';
import OrdersIcon from './icons/orders';
import ProductIcons from './icons/products';
import UsersIcon from './icons/users';
import UpdateStockIcon from './icons/UpdateStockIcon';

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
  {
    title: 'Add Product',
    icon: <AddProductIcon />,
    link: '/admin/product',
    access: ['admin'],
  },
  {
    title: 'Update Stock',
    icon: <UpdateStockIcon />,
    link: '/admin/update',
    access: ['admin'],
  },
];

export default data;
