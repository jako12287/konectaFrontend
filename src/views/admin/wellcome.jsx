import styles from "../../styles/wellcome.module.css";

const Wellcome = () => {
  return (
    <div className={styles.container}>
      <h1>Bienvenido a Konecta</h1>
      <p>
        En este sitio podrás gestionar la información de empleados y solicitudes de manera sencilla. 
      </p>
      <ul>
        <li>Ver una lista de empleados</li>
        <li>Consultar la lista de solicitudes asignadas a los empleados</li>
        <li>Crear nuevos empleados</li>
        <li>Registrar nuevas solicitudes</li>
        <li>Eliminar solicitudes</li>
      </ul>
    </div>
  );
  
};

export default Wellcome;
