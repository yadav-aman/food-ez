import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

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
    reqUsers();
    return <h1>Loading data</h1>;
  } else {
    return (
      <section className="container mx-auto p-6 font-mono">
        <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Username</th>
                  <th className="px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {items.map((item) => (
                  <tr className="text-gray-700">
                    <td className="px-4 py-3 border">
                      <div className="flex items-center text-sm">
                        <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                          <img
                            className="object-cover w-full h-full rounded-full"
                            src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
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
                    <td className="px-4 py-3 text-ms font-semibold border">
                      {item.id}
                    </td>
                    <td className="px-4 py-3 text-xs border">
                      {item.username}
                    </td>
                    <td className="px-4 py-3 text-sm border">6/4/2000</td>
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

export default Users;
