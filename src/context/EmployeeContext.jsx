import { createContext, useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { fetchEmployees } from "../services/api";
import { useAuth } from "./AuthContext";

const EmployeeContext = createContext();

export const useEmployees = () => useContext(EmployeeContext);

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const getEmployees = async () => {
    if (token) {
      setLoading(true);
      try {
        const { employees, totalPages } = await fetchEmployees(token, currentPage);
        setEmployees(employees);
        setTotalPages(totalPages);
      } catch (error) {
        console.error("Error al obtener empleados:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getEmployees();
  }, [token, currentPage]);

  const refreshEmployees = () => {
    getEmployees();
  };

  return (
    <EmployeeContext.Provider
      value={{ employees, currentPage, setCurrentPage, totalPages, refreshEmployees, loading }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

EmployeeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
