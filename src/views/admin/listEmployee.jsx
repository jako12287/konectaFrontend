import { useState } from "react";
import EmployeeTable from "../../components/customTable";
import { useEmployees } from "../../context/EmployeeContext";
import styles from "../../styles/listEmployee.module.css";
const ListEmployee = () => {
  const { employees } = useEmployees();
  const [openModal, setOpenModal] = useState(false);
  console.log("TCL: ListEmployee -> [openModal", openModal);

  return (
    <div className={styles.container}>
      <h2>Lista de Empleados</h2>
      {employees.length === 0 ? (
        <p>No hay empleados disponibles</p>
      ) : (
        <EmployeeTable
          data={employees}
          onOpenModal={() => setOpenModal(!openModal)}
        />
      )}
    </div>
  );
};

export default ListEmployee;
