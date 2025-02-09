import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRequests } from "../../context/RequestContext";
import { useEmployees } from "../../context/EmployeeContext";
import styles from "../../styles/detailEmployee.module.css";
import { format } from "date-fns";
import es from "date-fns/locale/es";

const DetailsEmployee = () => {
  const { id } = useParams();
  const { setEmployeeId, requests, employeeInfo } = useRequests();
  const { employees } = useEmployees();

  const [finalEmployeeInfo, setFinalEmployeeInfo] = useState(null);

  const formatDate = (dateString) => {
    if (!dateString) return "Fecha no disponible";
    return format(new Date(dateString), "dd 'de' MMMM 'de' yyyy", {
      locale: es,
    });
  };

  useEffect(() => {
    if (id) {
      setEmployeeId(Number(id)); 
    }
  }, [id]);

  useEffect(() => {
    if (employeeInfo) {
      setFinalEmployeeInfo(employeeInfo);
    } else {
      const foundEmployee = employees.find((emp) => emp.id === Number(id));
      setFinalEmployeeInfo(foundEmployee || null);
    }
  }, [employeeInfo, employees, id]);

  return (
    <div className={styles.container}>
      {finalEmployeeInfo ? (
        <div className={styles.card}>
          <h2 className={styles.title}>Información del Empleado</h2>
          <div className={styles.info}>
            <p>
              <strong>Nombre:</strong> {finalEmployeeInfo.name}
            </p>
            <p>
              <strong>Email:</strong> {finalEmployeeInfo.email}
            </p>
            <p>
              <strong>Rol:</strong>{" "}
              {finalEmployeeInfo.role === "admin"
                ? "Administrador"
                : "Empleado"}
            </p>
            <p>
              <strong>Salario:</strong>{" "}
              {new Intl.NumberFormat("es-CO", {
                style: "currency",
                currency: "COP",
                minimumFractionDigits: 0,
              }).format(finalEmployeeInfo.salary)}
            </p>
            <p>
              <strong>Fecha de ingreso:</strong>{" "}
              {formatDate(finalEmployeeInfo.entryDate) || "No disponible"}
            </p>
          </div>

          <h3 className={styles.subtitle}>Solicitudes</h3>
          {requests.length > 0 ? (
            <ul className={styles.requestList}>
              {requests.map((req) => (
                <li key={req.id} className={styles.requestItem}>
                  <p>
                    <strong>ID:</strong> {req.id}
                  </p>
                  <p>
                    <strong>Codigo:</strong> {req.code}
                  </p>
                  <p>
                    <strong>Descripción:</strong> {req.description}
                  </p>
                  <p>
                    <strong>Resumen:</strong> {req.summary}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.noRequests}>
              Este empleado no tiene solicitudes.
            </p>
          )}
        </div>
      ) : (
        <p className={styles.error}>
          No se encontró información para este usuario.
        </p>
      )}
    </div>
  );
};

export default DetailsEmployee;
