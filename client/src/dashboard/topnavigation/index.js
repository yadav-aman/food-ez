import { useToggle } from '../provider/context';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/UserContext';

export default function TopNavigation() {
  const { toggle } = useToggle();
  const [token] = useContext(UserContext);
  const [name, setName] = useState('U');

  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  };

  const requestName = async () => {
    const res = await fetch(`http://localhost:8000/user/me`, requestOptions);

    const json = await res.json();
    setName(json);
  };

  useEffect(() => {
    requestName();
  }, []);

  return (
    <header className="bg-white h-16 items-center relative shadow w-full z-10 md:h-20 lg:rounded-2xl">
      <div className="flex flex-center flex-col h-full justify-center mx-auto px-3 relative">
        <div className="flex items-center pl-1 relative w-full sm:pr-2 sm:ml-0 lg:max-w-68">
          <div className="flex h-full left-0 relative w-3/4">
            <div className="group flex items-center h-full relative w-12">
              <button
                type="button"
                aria-expanded="false"
                aria-label="Toggle sidenav"
                className="text-4xl text-gray-500 focus:outline-none"
                onClick={toggle}
              >
                &#8801;
              </button>
            </div>
          </div>
          <div className="flex items-center justify-end ml-5 p-1 relative w-1/4 sm:mr-0 sm:right-auto">
            <a href="#" className="block relative">
              <img
                alt="User"
                src={`https://ui-avatars.com/api/?background=random&name=${name.name}`}
                className="h-10 mx-auto object-cover rounded-full w-10"
              />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
