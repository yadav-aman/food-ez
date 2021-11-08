import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const PublicRoute = ({ children, ...rest }) => {
  const [token, setToken] = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/admin/dashboard',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PublicRoute;
