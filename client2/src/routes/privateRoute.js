import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

// https://dev.to/nilanth/how-to-create-public-and-private-routes-using-react-router-72m

const PrivateRoute = ({ children, ...rest }) => {
  const [token, setToken] = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
