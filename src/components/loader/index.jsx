import styles from "../../styles/loader.module.css"; 

const Loader = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default Loader;
