import { LoadingButton } from "@mui/lab";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Snackbar from "../../../common/components/Snackbar/Snackbar";

import TextInput from "../../../common/components/TextInput/TextInput";
import { editUserPassword } from "../../../users/users.api";

import styles from "./ChangePasswordDialog.module.scss";

type FormValues = {
  newPassword: string;
  repeatedNewPassword: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
};

const ChangePasswordDialog = ({ open, onClose }: Props) => {
  const { handleSubmit, control } = useForm<FormValues>();
  const [loading, setLoading] = useState<boolean>(false);
  const [openSuccessSnackbar, setOpenSuccesSnackbar] = useState<boolean>(false);

  const SubmitHandler = async (body: FormValues) => {
    try {
      setLoading(true);
      await editUserPassword(body);
      setOpenSuccesSnackbar(true);
      onClose();
    } catch (err) {}
    setLoading(false);
  };

  const handleCloseSuccessSnackbar = () => {
    setOpenSuccesSnackbar(false);
  };

  return (
    <div>
      <Dialog open={open} fullWidth maxWidth="sm" onClose={onClose} aria-labelledby="alert-dialog-title">
        <DialogTitle id="alert-dialog-title">Ustaw nowe hasło</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(SubmitHandler)} className={styles.form}>
            <div className={styles.inputs}>
              <div className={styles.input}>
                <TextInput
                  name="newPassword"
                  control={control}
                  rules={{ required: true, minLength: 8 }}
                  label="Nowe hasło"
                  type="password"
                />
              </div>
              <div className={styles.input}>
                <TextInput
                  name="repeatedNewPassword"
                  control={control}
                  rules={{ required: true, minLength: 8 }}
                  label="Powtórz hasło"
                  type="password"
                />
              </div>
            </div>
            <DialogActions>
              <LoadingButton onClick={onClose} loading={loading} loadingIndicator="Anuluj">
                Anuluj
              </LoadingButton>
              <LoadingButton type="submit" variant="text" role="progressbar" loading={loading}>
                Zapisz
              </LoadingButton>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      <Snackbar
        open={openSuccessSnackbar}
        text={"Hasło zostało zmienione"}
        handleClose={handleCloseSuccessSnackbar}
        color="success"
      />
    </div>
  );
};

export default ChangePasswordDialog;
