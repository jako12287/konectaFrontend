import styles from "../../styles/createUserForm.module.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useNotification } from "../toastNotifier";
import PropTypes from "prop-types";
import { useRegister } from "../../context/RegisterContext";
import { useEmployees } from "../../context/EmployeeContext";

const schema = yup.object().shape({
  entryDate: yup.string().required("La fecha de ingreso es obligatoria"),
  name: yup.string().required("El nombre es obligatorio"),
  salary: yup
    .number()
    .typeError("El salario debe ser un número")
    .positive("El salario debe ser mayor a 0")
    .required("El salario es obligatorio"),
  role: yup
    .string()
    .oneOf(["admin", "employee"], "El rol debe ser admin o employee")
    .required("El rol es obligatorio"),
  password: yup
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required("La contraseña es obligatoria"),
  email: yup
    .string()
    .email("El email no es válido")
    .transform((value) => value.toLowerCase())
    .required("El email es obligatorio"),
});

const CreateUseForm = ({ setOpenModal }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(schema) });

  const { notify } = useNotification();
  const { register, loading } = useRegister();
  const { refreshEmployees } = useEmployees()

  const onSubmit = async (data) => {
    try {
      await register(data);
      setOpenModal(false);
      notify("success", "Usuario registrado correctamente");
      refreshEmployees()
    } catch (err) {
      console.error("Error en el registro:", {err});
      notify("error", "Error en el registro");
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.containerCard}>
        <h4 className={styles.titleForm}>Registro de Usuario</h4>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.containerInput}>
            <Controller
              name="entryDate"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input type="date" placeholder="Fecha de ingreso" {...field} />
              )}
            />
            {errors.entryDate && (
              <p className={styles.textError}>{errors.entryDate.message}</p>
            )}
          </div>

          <div className={styles.containerInput}>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input type="text" placeholder="Nombre" {...field} />
              )}
            />
            {errors.name && (
              <p className={styles.textError}>{errors.name.message}</p>
            )}
          </div>

          <div className={styles.containerInput}>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  {...field}
                />
              )}
            />
            {errors.email && (
              <p className={styles.textError}>{errors.email.message}</p>
            )}
          </div>

          <div className={styles.containerInput}>
            <Controller
              name="salary"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input type="number" placeholder="Salario" {...field} />
              )}
            />
            {errors.salary && (
              <p className={styles.textError}>{errors.salary.message}</p>
            )}
          </div>

          <div className={styles.containerInput}>
            <Controller
              name="role"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <select {...field}>
                  <option value="">Selecciona un rol</option>
                  <option value="admin">Admin</option>
                  <option value="employee">Employee</option>
                </select>
              )}
            />
            {errors.role && (
              <p className={styles.textError}>{errors.role.message}</p>
            )}
          </div>

          <div className={styles.containerInput}>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input type="password" placeholder="Contraseña" {...field} />
              )}
            />
            {errors.password && (
              <p className={styles.textError}>{errors.password.message}</p>
            )}
          </div>

          <button type="submit" className={styles.submitButton}>
            {loading ? "Registrando..." : "Registrar"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateUseForm;

CreateUseForm.propTypes = {
  setOpenModal: PropTypes.func.isRequired,
};
