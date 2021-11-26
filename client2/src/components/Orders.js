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
  Button,
} from '@windmill/react-ui';
import AcceptIcon from './icons/accept';

const Orders = () => {
  const [items, setItems] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const [token] = useContext(UserContext);
  const [acceptButton, setAcceptButton] = useState(false);
  const [filterToggle, setFilterToggle] = useState(true);

  const setOrder = async (id) => {
    const requestOptions = {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    await fetch(`http://localhost:8000/order/accept/${id}`, requestOptions);
    setAcceptButton(!acceptButton);
  };

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
  }, [acceptButton]);

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
                    <TableCell>
                      <div>ORDER STATUS</div>
                      <button
                        className="text-blue-200"
                        onClick={(e) => setFilterToggle(!filterToggle)}
                      >
                        Show
                        {filterToggle ? ' All' : ' Pending'}
                      </button>
                    </TableCell>
                    <TableCell>Order Ready</TableCell>
                  </tr>
                </TableHeader>
                <tbody>
                  {items
                    .filter((item) =>
                      filterToggle ? item.status === 'pending' : item,
                    )
                    .map((item) => (
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
                        <td className="px-4 py-3 text-ms font-semibold border">
                          {item.status === 'pending' ? (
                            <Badge type="warning">Pending</Badge>
                          ) : (
                            <Badge type="primary">Ready</Badge>
                          )}
                        </td>
                        <td className="border" key={item.id}>
                          {item.status === 'ready' ? (
                            <Button
                              layout="link"
                              size="icon"
                              aria-label="Edit"
                              disabled
                            >
                              <AcceptIcon
                                className="w-6 h-6"
                                aria-hidden="true"
                              />
                            </Button>
                          ) : (
                            <Button
                              layout="link"
                              size="icon"
                              aria-label="Edit"
                              onClick={(e) => setOrder(item.id)}
                              key={item.id}
                            >
                              <AcceptIcon
                                className="w-6 h-6"
                                aria-hidden="true"
                              />
                            </Button>
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

export default Orders;
