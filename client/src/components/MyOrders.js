import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import Loader from './loader';
import {
  Table,
  TableHeader,
  TableCell,
  TableFooter,
  TableContainer,
  Badge,
} from '@windmill/react-ui';

const MyOrders = () => {
  const [items, setItems] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const [token] = useContext(UserContext);

  const reqMyOrders = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(
      'http://localhost:8000/order/me',
      requestOptions,
    );

    if (!response.ok) {
      alert('Not Authorized to view Orders');
    } else {
      const json = await response.json();
      setItems(json);
      setLoaded(true);
    }
  };

  useEffect(() => {
    reqMyOrders();
  }, []);

  if (!isLoaded) {
    return <Loader />;
  } else if (items.length == 0) {
    return <h2>No orders found.</h2>;
  } else {
    return (
      <section className="container mx-auto p-6 font-mono">
        <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
          <div className="w-full overflow-x-auto">
            <TableContainer className="w-full">
              <Table>
                <TableHeader>
                  <tr className="text-md font-semibold text-center uppercase border-b border-gray-600">
                    <TableCell>Product Name</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Total Cost</TableCell>
                    <TableCell>Order Time</TableCell>
                    <TableCell>Order Status</TableCell>
                  </tr>
                </TableHeader>
                <tbody className="bg-white">
                  {items
                    .slice(0)
                    .reverse()
                    .map((item) => (
                      <tr className="text-gray-700 text-center capitalize">
                        <td className="px-4 py-3 text-ms font-semibold border">
                          {item.product_name.name}
                        </td>
                        <td className="px-4 py-3 text-ms font-semibold border">
                          {item.qty}
                        </td>
                        <td className="px-4 py-3 border">
                          <div>
                            <p className="font-semibold  text-black ">
                              ₹{item.qty * item.product_name.price}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm border">
                          {new Date(item.created_at).toLocaleDateString()},{' '}
                          {new Date(item.created_at)
                            .toTimeString()
                            .substring(0, 9)}
                        </td>
                        <td className="px-4 py-3 text-ms font-semibold border">
                          {item.status === 'pending' ? (
                            <Badge type="warning">Pending</Badge>
                          ) : (
                            <Badge type="primary">Ready</Badge>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
              <TableFooter />
            </TableContainer>
          </div>
        </div>
      </section>
    );
  }
};

export default MyOrders;
