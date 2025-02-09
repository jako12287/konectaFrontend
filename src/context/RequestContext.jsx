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
  const [employeeId, setEmployeeId] = useState(null);
  const [employeeInfo, setEmployeeInfo] = useState(null);
  const { token } = useAuth();

  const getRequests = async () => {
    if (token) {
      setLoading(true);
      try {
        const { requests, totalPages } = await fetchRequests(
          token,
          currentPage
        );

        const filteredRequests = employeeId
          ? requests.filter((req) => req.id_employee === employeeId)
          : requests;

        setRequests(filteredRequests);
        setTotalPages(totalPages);

        if (employeeId && filteredRequests.length > 0) {
          setEmployeeInfo(filteredRequests[0].Employee);
        } else {
          setEmployeeInfo(null);
        }
      } catch (error) {
        console.error("Error al obtener solicitudes:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getRequests();
  }, [token, currentPage, employeeId]);

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
        employeeId,
        setEmployeeId,
        employeeInfo,
      }}
    >
      {children}
    </RequestContext.Provider>
  );
};

RequestProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
