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
  const { token } = useAuth();

  useEffect(() => {
    const getEmployees = async () => {
      if (token) {
        const { employees, totalPages } = await fetchEmployees(
          token,
          currentPage
        );
        setEmployees(employees);
        setTotalPages(totalPages);
      }
    };

    getEmployees();
  }, [token, currentPage]);

  return (
    <EmployeeContext.Provider
      value={{ employees, currentPage, setCurrentPage, totalPages }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

EmployeeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
