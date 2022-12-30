import { useEffect } from "react";

import { useDocumentTitle } from "../../common/hooks/use-document-title";
import ChangePassword from "./ChangePassword/ChangePassword";

import styles from "./Settings.module.scss";

const Settings = () => {
  const [setDocumentTitle] = useDocumentTitle();

  useEffect(() => {
    setDocumentTitle("Ustawienia");
  }, []);
  return (
    <div>
      <h2 className={styles.header}>Ustawienia</h2>
      <ChangePassword />
    </div>
  );
};

export default Settings;
