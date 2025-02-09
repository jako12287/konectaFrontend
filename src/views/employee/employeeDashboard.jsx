import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEmployeeRequests } from "../../context/EmployeeRequestContext";
import styles from "../../styles/dashboard.module.css";
import { useNotification } from "../../components/toastNotifier";

const EmployeeDashboard = () => {
  const { requests, loading, error } = useEmployeeRequests();

  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { notify } = useNotification();

  if (loading) return <p>Cargando solicitudes...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleLogout = () => {
    logout();
    navigate("/");
    notify("success", "Has cerrado sesión correctamente");
  };

  return (
    <div className={styles.container}>
      <div>
        <h1>Mis Solicitudes</h1>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Cerrar sesión
        </button>{" "}
      </div>
      {user && (
        <>
          <p>Bienvenido {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Rol: {user.role}</p>
        </>
      )}
      {requests?.requests?.length > 0 ? (
        <ul className={styles.requestList}>
          {requests.requests.map((req) => (
            <li key={req.id} className={styles.requestItem}>
              <p>
                <strong>Descripción:</strong> {req.description}
              </p>
              <p>
                <strong>Código:</strong> {req.code}
              </p>
              <p>
                <strong>Resumen:</strong> {req.summary}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tienes solicitudes aún.</p>
      )}
    </div>
  );
};

export default EmployeeDashboard;
