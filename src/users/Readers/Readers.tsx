import { Button } from "@mui/material";

import ReadersTable from "./ReadersTable/ReadersTable";

import styles from "./Readers.module.scss";

const Readers = () => {
  return (
    <div>
      <div className={styles.header}>
        <h2>Czytelnicy</h2>
        <Button variant="contained">Dodaj czytelnika</Button>
      </div>
      <ReadersTable />
    </div>
  );
};

export default Readers;
