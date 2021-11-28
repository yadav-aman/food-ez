import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import ErrorMessage from './ErrorMessage';
import { useHistory } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmationPassword, setConfirmationPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [, setToken] = useContext(UserContext);
  const history = useHistory();

  const submitRegistration = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name, username: email, password: password }),
    };

    const response = await fetch('http://localhost:8000/user/', requestOptions);
    const data = await response.json();

    if (!response.ok) {
      setErrorMessage(data.detail);
    } else {
      const requestOptionsLogin = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: JSON.stringify(
          `grant_type=&username=${email}&password=${password}&scope=&client_id=&client_secret=`,
        ),
      };

      const responseLogin = await fetch(
        'http://localhost:8000/auth/login',
        requestOptionsLogin,
      );
      const dataLogin = await responseLogin.json();
      setToken(dataLogin.access_token);
      history.push('/admin/dashboard');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmationPassword && password.length > 5) {
      submitRegistration();
    } else if (password.length <= 5) {
      setErrorMessage('Password must be greater than 5 characters');
    } else {
      setErrorMessage('Password and confirm password not same');
    }
  };
  return (
    <div className="min-w-screen min-h-screen bg-gray-900 flex items-center justify-center px-5 py-5">
      <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden max-w-screen-lg">
        <div className="md:flex w-full">
          <div className="hidden md:block w-1/2 bg-indigo-500 py-10 px-10">
            {/* <AuthSvg /> */}
            <img src="/images/Landing_Lady.png" alt="Landing" />
          </div>
          <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
            <div className="text-center mb-10">
              <h1 className="font-bold text-3xl text-gray-900">REGISTER</h1>
              <p>Enter your information to register</p>
            </div>
            <div>
              <form onSubmit={handleSubmit}>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <label for="" className="text-xs font-semibold px-1">
                      Full name
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                      </div>
                      <input
                        type="text"
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        placeholder="Your Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <label for="" className="text-xs font-semibold px-1">
                      Email
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-email-outline text-gray-400 text-lg"></i>
                      </div>
                      <input
                        type="email"
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        placeholder="user@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <label for="" className="text-xs font-semibold px-1">
                      Password
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-lock-outline text-gray-400 text-lg"></i>
                      </div>
                      <input
                        type="password"
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        placeholder="*****"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-12">
                    <label for="" className="text-xs font-semibold px-1">
                      Confirm Password
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-lock-outline text-gray-400 text-lg"></i>
                      </div>
                      <input
                        type="password"
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        placeholder="*****"
                        value={confirmationPassword}
                        onChange={(e) =>
                          setConfirmationPassword(e.target.value)
                        }
                        required
                      />
                    </div>
                    <ErrorMessage message={errorMessage} />
                  </div>
                </div>

                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <button className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">
                      REGISTER NOW
                    </button>
                  </div>
                </div>
              </form>
              <div>
                <span className="flex w-full px-3 mb-5">
                  <h1>Already Registered?</h1>
                  <Link to="/login" className="font-bold ml-2">
                    Login Here
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
