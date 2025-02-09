import { createContext, useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { fetchRequests } from "../services/api";
import { useAuth } from "./AuthContext";

const RequestContext = createContext();

export const useRequests = () => useContext(RequestContext);

export const RequestProvider = ({ children }) => {
  const [requests, setRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const getRequests = async () => {
    if (token) {
      setLoading(true);
      try {
        const { requests, totalPages } = await fetchRequests(token, currentPage);
        setRequests(requests);
        setTotalPages(totalPages);
      } catch (error) {
        console.error("Error al obtener solicitudes:", error);
      } finally {
        setLoading(false);
      }
    }
  };
  

  useEffect(() => {
    getRequests();
  }, [token, currentPage]);

  const refreshRequests = () => {
    getRequests();
  };

  return (
    <RequestContext.Provider
      value={{
        requests,
        currentPage,
        setCurrentPage,
        totalPages,
        refreshRequests,
        loading,
      }}
    >
      {children}
    </RequestContext.Provider>
  );
};

RequestProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
