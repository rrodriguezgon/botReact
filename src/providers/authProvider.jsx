import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { refresh } from '../services/user';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // State to hold the authentication token
  const [token, setToken_] = useState(localStorage.getItem("token"));

  // Function to set the authentication token
  const setToken = (newToken) => {
    setToken_(newToken);
  };

  // Function to set the authentication token
  const setUsername = (username) => {
    localStorage.setItem('username',username);
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem('token',token);
      setInterval(() => {
        refresh({username: localStorage.getItem("username")})
          .then(({data}) => {
            localStorage.setItem('token',data.token);
          });
       }, 3300000)
    } else {
      localStorage.removeItem('token')
    }
  }, [token]);

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
      setUsername,
    }),
    [token]
  );

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;