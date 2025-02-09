import styles from "../../styles/createUserForm.module.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useNotification } from "../../components/toastNotifier";
import PropTypes from "prop-types";
import { useRequestCreate } from "../../context/RequestCreateContext";

const schema = yup.object().shape({
  code: yup.string().required("El código es obligatorio"),
  description: yup.string().required("La descripción es obligatoria"),
  summary: yup.string().required("El resumen es obligatorio"),
  id_employee: yup
    .number()
    .typeError("El ID del empleado debe ser un número")
    .positive("El ID debe ser mayor a 0")
    .required("El ID del empleado es obligatorio"),
});

const CreateRequestForm = ({ setOpenModal, refreshRequests }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(schema) });

  const { notify } = useNotification();
  const { createNewRequest, loading } = useRequestCreate();

  const onSubmit = async (data) => {
    try {
      await createNewRequest(data);
      setOpenModal(false);
      refreshRequests();
      notify("success", "Solicitud creada correctamente");
    } catch (err) {
      console.error("Error al crear la solicitud:", err);
      notify("error", "Error al crear la solicitud");
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.containerCard}>
        <h4 className={styles.titleForm}>Crear Solicitud</h4>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.containerInput}>
            <Controller
              name="code"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input type="text" placeholder="Código" {...field} />
              )}
            />
            {errors.code && (
              <p className={styles.textError}>{errors.code.message}</p>
            )}
          </div>

          <div className={styles.containerInput}>
            <Controller
              name="description"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input type="text" placeholder="Descripción" {...field} />
              )}
            />
            {errors.description && (
              <p className={styles.textError}>{errors.description.message}</p>
            )}
          </div>

          <div className={styles.containerInput}>
            <Controller
              name="summary"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input type="text" placeholder="Resumen" {...field} />
              )}
            />
            {errors.summary && (
              <p className={styles.textError}>{errors.summary.message}</p>
            )}
          </div>

          <div className={styles.containerInput}>
            <Controller
              name="id_employee"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input type="number" placeholder="ID Empleado" {...field} />
              )}
            />
            {errors.id_employee && (
              <p className={styles.textError}>{errors.id_employee.message}</p>
            )}
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? "Creando..." : "Crear Solicitud"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateRequestForm;

CreateRequestForm.propTypes = {
  setOpenModal: PropTypes.func.isRequired,
  refreshRequests: PropTypes.func.isRequired,
};
