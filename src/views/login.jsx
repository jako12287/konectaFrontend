import styles from "../styles/login.module.css";
import Logo from "../assets/images/logo.png";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";


const schema = yup.object().shape({
  user: yup
    .string()
    .email("El email no es válido")
    .required("El email es obligatorio"),
  password: yup.string().required("La contraseña es obligatoria"),
});
const Login = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    console.log(data);
   
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
          <h4 className={styles.titleForm}>
            Bienvenido a Konecta
          </h4>
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