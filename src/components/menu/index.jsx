import styles from "../../styles/menu.module.css";
import Logo from "../../assets/images/logo.png";
import CustomNavigate from "../customNavigate";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../toastNotifier";

const Menu = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { notify } = useNotification();

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "¿Estás seguro de que deseas cerrar sesión?"
    );
    if (confirmLogout) {
      logout();
      navigate("/");
      notify("success", "Has cerrado sesión correctamente");
    }
  };
  const routers = [
    { route: "/wellcome", text: "Inicio" },
    { route: "/list-employees", text: "Lista empleados" },
    { route: "/list-request", text: "Solicitudes" },
    {
      text: "Cerrar sesión",
      onClick: handleLogout,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.containerImage}>
        <img src={Logo} className={styles.image} />
      </div>
      <div className={styles.textNameUSer}>
        {user ? user.email : "Usuario no autenticado"}
      </div>
      <div className={styles.containerBtnNavigation}>
        {routers.map((router, index) => (
          <CustomNavigate key={index} {...router} />
        ))}
      </div>
    </div>
  );
};

export default Menu;
