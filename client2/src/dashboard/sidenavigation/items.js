import { Link, useLocation } from 'react-router-dom';
import LogoutIcon from './icons/logout';

import data from './data';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

const style = {
  title: `font-normal mx-4 text-sm`,
  active: `bg-gradient-to-r border-r-4 border-blue-500 border-r-4 border-blue-500 from-white to-blue-100 text-blue-500`,
  link: `duration-200 flex font-thin items-center justify-start my-2 p-4 transition-colors text-gray-500 uppercase w-full lg:hover:text-blue-500`,
};

export default function SidenavItems() {
  const { pathname } = useLocation();
  const [token, setToken] = useContext(UserContext);
  return (
    <ul>
      <li>
        {data.map((item) => (
          <Link to={item.link} key={item.title}>
            <span
              className={`${style.link} 
              ${item.link === pathname && style.active}`}
            >
              <span>{item.icon}</span>
              <span className={style.title}>{item.title}</span>
            </span>
          </Link>
        ))}
        <div className="p-2 w-full">
          <button
            onClick={(e) => {
              setToken(null);
            }}
            className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          >
            <span className="m-1 mr-2">
              <LogoutIcon />
            </span>
            Log Out
          </button>
        </div>
      </li>
    </ul>
  );
}
