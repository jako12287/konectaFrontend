import styles from "../styles/login.module.css";
import Logo from "../assets/images/logo.png";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { loginUser } from "../services/api";
import { useAuth } from "../context/authContext";
import { useNotification } from "../components/toastNotifier";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  user: yup
    .string()
    .email("El email no es válido")
    .required("El email es obligatorio"),
  password: yup.string().required("La contraseña es obligatoria"),
});
const Login = () => {
  const { login } = useAuth();
  const { notify } = useNotification();
  const navigation = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const user = await loginUser(data?.user, data?.password);
      console.log("TCL: onSubmit -> data", user);
      login(user.user, user.token);
      notify("success", user.message.es);
      console.log("data", user.user.role);
      if (user.user.role === "admin") {
        navigation("/wellcome");
      } else if (user.user.role === "employee") {
        navigation("/dashboard-employee");
      } else {
        notify(
          "error",
          "El usuario no tiene permisos para acceder a este sitio"
        );
      }
    } catch (error) {
      console.log(error);
      notify("error", "Credenciales inválidas");
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.containerCardLogin}>
        <div className={styles.containerImage}>
          <img src={Logo} alt="Logo konecta" className={styles.imageLogo} />
        </div>
        <div className={styles.containerForm}>
          <div className={styles.containerImageResponsive}>
            <img
              src={Logo}
              alt="Logo konecta"
              className={styles.imageLogoResponsive}
            />
          </div>
          <h4 className={styles.titleForm}>Bienvenido a Konecta</h4>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.containerIpunt}>
              <Controller
                name="user"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    type="text"
                    placeholder="Usuario"
                    alt="Campo para ingresar email"
                    {...field}
                  />
                )}
              />
              {errors.user && (
                <p className={styles.textError}>{errors.user.message}</p>
              )}
            </div>
            <div className={styles.containerIpunt}>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    type="password"
                    placeholder="Contraseña"
                    alt="Campo para ingresar contraseña"
                    {...field}
                  />
                )}
              />
              {errors.password && (
                <p className={styles.textError}>{errors.password.message}</p>
              )}
            </div>

            <button>Ingresar</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
