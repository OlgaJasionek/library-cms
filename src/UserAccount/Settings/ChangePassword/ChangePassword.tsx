import { Button } from "@mui/material";
import { useState } from "react";

import Card from "../../../common/components/Card/Card";
import ChangePasswordDialog from "../ChangePasswordDialog/ChangePasswordDialog";

import styles from "./ChangePassword.module.scss";

const ChangePassword = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <Card>
        <div className={styles.wrapper}>
          <h3 className={styles.text}>Zmień hasło</h3>
          <Button onClick={handleOpenDialog} variant="text">
            Zmień
          </Button>
        </div>
      </Card>
      <ChangePasswordDialog open={openDialog} onClose={handleCloseDialog} />
    </div>
  );
};

export default ChangePassword;
