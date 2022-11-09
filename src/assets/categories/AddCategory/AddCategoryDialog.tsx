import { LoadingButton } from "@mui/lab";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Snackbar from "../../../common/components/Snackbar/Snackbar";

import TextInput from "../../../common/components/TextInput/TextInput";
import { addAssetsCategory } from "../../assets.api";
import { AddAssetsCategoryValues } from "../../assets.types";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
};

const AddAssetCategoryDialog = ({ open, onClose, onSave }: Props) => {
  const { handleSubmit, control, reset } = useForm<AddAssetsCategoryValues>();
  const [loading, setLoading] = useState<boolean>(false);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState<boolean>(false);

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open]);

  const closeSuccessSnackbarHandler = () => {
    setOpenSuccessSnackbar(false);
  };

  const onSubmit = async (body: AddAssetsCategoryValues) => {
    try {
      setLoading(true);
      await addAssetsCategory(body);
      onClose();
      setOpenSuccessSnackbar(true);
      onSave();
    } catch (err) {}
    setLoading(false);
  };

  return (
    <>
      <Dialog open={open} fullWidth maxWidth="sm" onClose={onClose} aria-labelledby="alert-dialog-title">
        <DialogTitle id="alert-dialog-title">Dodaj nową kategorię</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-field">
              <TextInput name="name" control={control} rules={{ required: true }} label="Nazwa" />
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
        text="Pomyślnie dodano nową kategorię"
        color="success"
        open={openSuccessSnackbar}
        handleClose={closeSuccessSnackbarHandler}
      />
    </>
  );
};

export default AddAssetCategoryDialog;
