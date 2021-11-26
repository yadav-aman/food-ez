import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import Loader from './loader';

const MyOrders = () => {
  const [items, setItems] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const [token, setToken] = useContext(UserContext);

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
            <table className="w-full">
              <thead>
                <tr className="text-md font-semibold text-center tracking-wide text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                  <th className="px-4 py-3">Product Name</th>
                  <th className="px-4 py-3">Quantity</th>
                  <th className="px-4 py-3">Total Cost</th>
                  <th className="px-4 py-3">Order Time</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {items.map((item) => (
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
                      {new Date(item.created_at).toTimeString().substring(0, 9)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    );
  }
};

export default MyOrders;
