import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";
import { registerUser } from "../services/api";
import { useAuth } from "./AuthContext";

const RegisterContext = createContext();

export const useRegister = () => useContext(RegisterContext);

export const RegisterProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await registerUser(userData, token);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <RegisterContext.Provider value={{ register, loading, error }}>
      {children}
    </RegisterContext.Provider>
  );
};

RegisterProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
