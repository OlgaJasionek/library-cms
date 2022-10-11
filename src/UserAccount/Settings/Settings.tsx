import ChangePassword from "./ChangePassword/ChangePassword";

import styles from "./Settings.module.scss";

const Settings = () => {
  return (
    <div>
      <h2 className={styles.header}>Ustawienia</h2>
      <hr className="separator" />
      <ChangePassword />
    </div>
  );
};

export default Settings;
