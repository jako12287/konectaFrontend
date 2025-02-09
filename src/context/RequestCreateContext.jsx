import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";
import { createRequest } from "../services/api";
import { useAuth } from "./AuthContext";

const RequestCreateContext = createContext();

export const useRequestCreate = () => useContext(RequestCreateContext);

export const RequestCreateProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  const createNewRequest = async (requestData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await createRequest(requestData, token);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <RequestCreateContext.Provider value={{ createNewRequest, loading, error }}>
      {children}
    </RequestCreateContext.Provider>
  );
};

RequestCreateProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
