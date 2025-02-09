import styles from "../../styles/menu.module.css";
import Logo from "../../assets/images/logo.png";

const Menu = () => {
 

  return (
    <div className={styles.container}>
      <div className={styles.containerImage}>
        <img src={Logo} className={styles.image} />
      </div>
      <div className={styles.textNameUSer}>email</div>
      <div className={styles.containerBtnNavigation}>
    
        espacio para botones
      </div>
    </div>
  );
};

export default Menu;