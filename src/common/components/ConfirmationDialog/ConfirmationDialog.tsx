import { LoadingButton } from "@mui/lab";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";

import Snackbar from "../Snackbar/Snackbar";

type Props = {
  open: boolean;
  text: string;
  loading: boolean;
  title: string;
  snackbarText: string;
  onClose: () => void;
  onAccept: () => void;
};

const ConfirmationDialog = ({ open, onClose, text, title, snackbarText, loading, onAccept }: Props) => {
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState<boolean>(false);

  const closeSuccessSnackbarHandler = () => {
    setOpenSuccessSnackbar(false);
  };

  return (
    <>
      <Dialog open={open} fullWidth maxWidth="sm" onClose={onClose}>
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <span>{text}</span>
          <DialogActions>
            <LoadingButton onClick={onClose} loading={loading} loadingIndicator="Anuluj">
              Nie
            </LoadingButton>
            <LoadingButton variant="text" role="progressbar" loading={loading} onClick={onAccept}>
              Tak
            </LoadingButton>
          </DialogActions>
        </DialogContent>
      </Dialog>
      <Snackbar
        text={snackbarText}
        color="success"
        open={openSuccessSnackbar}
        handleClose={closeSuccessSnackbarHandler}
      />
    </>
  );
};

export default ConfirmationDialog;
