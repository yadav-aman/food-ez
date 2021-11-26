import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import Loader from './loader';
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Badge,
  Avatar,
  Button,
  Pagination,
} from '@windmill/react-ui';
import AcceptIcon from './icons/accept';

const Orders = () => {
  const [items, setItems] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const [token, setToken] = useContext(UserContext);
  const [isReady, setReady] = useState();

  function Ready() {
    setReady(!isReady);
  }

  const reqOrders = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(
      'http://localhost:8000/order/all',
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
    reqOrders();
  }, []);

  if (!isLoaded) {
    return <Loader />;
  } else {
    return (
      <section className="container mx-auto p-6 font-mono">
        <div className="w-full mb-8 rounded-lg shadow-lg">
          <div className="w-full">
            <TableContainer className="w-full">
              <Table>
                <TableHeader>
                  <tr className="text-center">
                    <TableCell>Order ID</TableCell>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>User ID</TableCell>
                    <TableCell>Order Time</TableCell>
                    <TableCell>Order Status</TableCell>
                    <TableCell>Order Ready</TableCell>
                  </tr>
                </TableHeader>
                <tbody>
                  {items.map((item) => (
                    <tr
                      className="text-gray-700 text-center capitalize"
                      key={item.id}
                    >
                      <td className="px-4 py-3 border">
                        <div>
                          <p className="font-semibold  text-black ">
                            {item.id}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-ms font-semibold border">
                        {item.product_name.name}
                      </td>
                      <td className="px-4 py-3 text-ms font-semibold border">
                        {item.qty}
                      </td>
                      <td className="px-4 py-3 text-ms font-semibold border">
                        {item.user_id}
                      </td>
                      <td className="px-4 py-3 text-sm border">
                        {new Date(item.created_at).toLocaleDateString()},{' '}
                        {new Date(item.created_at)
                          .toTimeString()
                          .substring(0, 9)}
                      </td>
                      {!isReady ? (
                        <td className="px-4 py-3 text-ms font-semibold border">
                          <Badge type="primary">Pending</Badge>
                        </td>
                      ) : (
                        <td className="px-4 py-3 text-ms font-semibold border bg-success">
                          <Badge type="primary">Ready</Badge>
                        </td>
                      )}
                      {/* {isReady ? setReady(false) : ''} */}
                      <td className="border">
                        <Button
                          layout="link"
                          size="icon"
                          aria-label="Edit"
                          onClick={Ready}
                        >
                          <AcceptIcon className="w-6 h-6" aria-hidden="true" />
                        </Button>
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

export default Orders;
