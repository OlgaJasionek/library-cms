import { Alert, AlertColor, Snackbar as MuiSnackbar } from "@mui/material";

type Props = {
  open: boolean;
  handleClose: () => void;
  error: string | null | undefined;
  color: AlertColor;
};

const Snackbar = ({ open, handleClose, error, color }: Props) => {
  return (
    <MuiSnackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={color} sx={{ width: "100%" }}>
        {error}
      </Alert>
    </MuiSnackbar>
  );
};
export default Snackbar;
