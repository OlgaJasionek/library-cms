import { LoadingButton } from "@mui/lab";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";

import Snackbar from "../../../common/components/Snackbar/Snackbar";
import TextInput from "../../../common/components/TextInput/TextInput";
import { addAssetsAuthor } from "../../assets.api";
import { AddAssetsAuthorValues } from "../../assets.types";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
};

const AddAssetsAuthorDialog = ({ open, onClose, onSave }: Props) => {
  const { handleSubmit, control } = useForm<AddAssetsAuthorValues>();
  const [loading, setLoading] = useState<boolean>(false);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState<boolean>(false);

  const closeSuccessSnackbarHandler = () => {
    setOpenSuccessSnackbar(false);
  };

  const onSubmit = async (body: AddAssetsAuthorValues) => {
    try {
      setLoading(true);
      await addAssetsAuthor(body);
      onClose();
      onSave();
      setOpenSuccessSnackbar(true);
    } catch (err) {}
    setLoading(false);
  };

  return (
    <>
      <Dialog open={open} fullWidth maxWidth="sm" onClose={onClose} aria-labelledby="alert-dialog-title">
        <DialogTitle id="alert-dialog-title">Dodaj nowego autora</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-field">
              <TextInput name="firstName" control={control} rules={{ required: true }} label="Imię" />
            </div>
            <div className="form-field">
              <TextInput name="lastName" control={control} rules={{ required: true }} label="Nazwisko" />
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
        text="Pomyślnie dodano nowego autora"
        color="success"
        open={openSuccessSnackbar}
        handleClose={closeSuccessSnackbarHandler}
      />
    </>
  );
};

export default AddAssetsAuthorDialog;
