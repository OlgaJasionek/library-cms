import Header from "../Header/Header";

import styles from "./Cockpit.module.scss";

const Cockpit = () => {
  return (
    <div>
      <Header />
      <div className={styles.cockpitBody}></div>
    </div>
  );
};
export default Cockpit;
