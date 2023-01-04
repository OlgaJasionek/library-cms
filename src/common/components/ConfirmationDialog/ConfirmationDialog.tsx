import { LoadingButton } from "@mui/lab";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

type Props = {
  open: boolean;
  text: string;
  loading: boolean;
  title: string;
  onClose: () => void;
  onAccept: () => void;
};

const ConfirmationDialog = ({ open, onClose, text, title, loading, onAccept }: Props) => {
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
            <LoadingButton variant="contained" role="progressbar" loading={loading} onClick={onAccept}>
              Tak
            </LoadingButton>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ConfirmationDialog;
