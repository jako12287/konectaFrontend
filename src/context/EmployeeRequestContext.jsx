import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import PropTypes from "prop-types";

const EmployeeRequestContext = createContext();

export const useEmployeeRequests = () => useContext(EmployeeRequestContext);

export const EmployeeRequestProvider = ({ children }) => {
  const { user, token } = useAuth();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user?.id && token) {
      fetchRequests(user.id, token);
    }
  }, [user, token]);

  const fetchRequests = async (employeeId, authToken) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/api/request/${employeeId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al obtener las solicitudes");
      }

      const data = await response.json();
      setRequests(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <EmployeeRequestContext.Provider value={{ requests, loading, error }}>
      {children}
    </EmployeeRequestContext.Provider>
  );
};

EmployeeRequestProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
