import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import Loader from './loader';
import {
  Table,
  TableHeader,
  TableCell,
  TableFooter,
  TableContainer,
} from '@windmill/react-ui';

const Users = () => {
  const [items, setItems] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const [token, setToken] = useContext(UserContext);

  useEffect(() => {
    reqUsers();
  }, []);

  const reqUsers = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(
      'http://localhost:8000/user/all',
      requestOptions,
    );

    if (!response.ok) {
      alert('Not Authorized to view Users');
    } else {
      const json = await response.json();
      setItems(json);
      setLoaded(true);
    }
  };

  if (!isLoaded) {
    return <Loader />;
  } else {
    return (
      <section className="container mx-auto p-6 font-mono">
        <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
          <div className="w-full overflow-x-auto">
            <TableContainer className="w-full capitalize">
              <Table>
                <TableHeader>
                  <tr className="text-md font-semibold text-cente uppercase border-b border-gray-600">
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Username</TableCell>
                    <TableCell>User Type</TableCell>
                  </tr>
                </TableHeader>
                <tbody className="bg-white">
                  {items.map((item) => (
                    <tr className="text-gray-700">
                      <td className="px-4 py-3 text-ms font-semibold border">
                        {item.id}
                      </td>
                      <td className="px-4 py-3 border">
                        <div className="flex items-center text-sm">
                          <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                            <img
                              className="object-cover w-full h-full rounded-full"
                              src={`https://ui-avatars.com/api/?background=random&name=${item.name}`}
                              alt=""
                              loading="lazy"
                            />
                            <div
                              className="absolute inset-0 rounded-full shadow-inner"
                              aria-hidden="true"
                            ></div>
                          </div>
                          <div>
                            <p className="font-semibold text-black">
                              {item.name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs border lowercase">
                        {item.username}
                      </td>
                      <td className="px-4 py-3 text-sm border">
                        {item.is_superuser ? 'Admin' : 'User'}
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

export default Users;
