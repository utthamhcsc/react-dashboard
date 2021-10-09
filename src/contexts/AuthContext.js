import { createContext, useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Roles } from '../constants/Roles';
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthenticationProvider = ({ children }) => {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState({
    name: '',
    roles: [],
    isAuthenticated: false,
  });

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem('auth'));
      if (user) {
        setCurrentUser(user);
      }
    } catch (err) {}
  }, []);

  const login = ({ userName, password }) =>
    new Promise((resolve, reject) => {
      try {
        const data = JSON.parse(localStorage.getItem('user'));
        if (userName == 'admin' && password == 'admin') {
          setCurrentUser({
            name: 'admin',
            roles: ['admin'],
            isAuthenticated: true,
          });
          localStorage.setItem(
            'auth',
            JSON.stringify({
              name: 'admin',
              roles: ['admin'],
              isAuthenticated: true,
            })
          );
          resolve({
            name: 'admin',
            roles: ['admin'],
            isAuthenticated: true,
          });
        } else {
          const user = data?.find(
            (user) => user.userName == userName && user.password == password
          );
          if (user) {
            setCurrentUser({ ...user, isAuthenticated: true });
            localStorage.setItem(
              'auth',
              JSON.stringify({ ...user, isAuthenticated: true })
            );
            resolve(user);
          } else {
            reject({ message: 'invalid username/password' });
          }
        }
      } catch (err) {
        setCurrentUser(null);
      }
    });
  const logout = () => {
    localStorage.removeItem('auth');
    setCurrentUser(null);
    history.push('/');
  };

  const register = (data) =>
    new Promise((resolve, reject) => {
      try {
        const users = JSON.parse(localStorage.getItem('user'));
        localStorage.setItem('user', JSON.stringify([...(users || []), data]));
        localStorage.setItem(
          'auth',
          JSON.stringify({ ...data, isAuthenticated: true })
        );
        setCurrentUser({ ...data, isAuthenticated: true });
        resolve({ ...data, isAuthenticated: true });
      } catch (err) {
        reject(err);
      }
    });

  const values = { currentUser, login, logout, register, setCurrentUser };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
