import styles from "../../styles/layout.module.css";
import Menu from "../menu";

const Layout = (children) => {
  return (
    <main className={styles.container}>
      <section className={styles.sectionMenu}>
        <Menu />
      </section>
      <section className={styles.sectionContent}>{children}</section>
    </main>
  );
};

export default Layout;
