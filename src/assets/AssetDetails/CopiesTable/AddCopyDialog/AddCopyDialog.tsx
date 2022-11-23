import { LoadingButton } from "@mui/lab";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import Snackbar from "../../../../common/components/Snackbar/Snackbar";
import Switch from "../../../../common/components/Switch/Switch";
import { addAssetCopy } from "../../../assets.api";
import { AssetsCopy } from "../../../assets.types";

type Props = {
  open: boolean;
  onClose: () => void;
  onAddCopy: (item: AssetsCopy) => void;
};

type AddAssetCopyForm = {
  isFreeAccess: boolean;
};

const AddCopyDialog = ({ open, onClose, onAddCopy }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState<boolean>(false);
  const { handleSubmit, control, reset } = useForm<AddAssetCopyForm>();
  const { assetId } = useParams<string>();

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open]);

  const closeSuccessSnackbarHandler = () => {
    setOpenSuccessSnackbar(false);
  };

  const onSubmit = async (body: AddAssetCopyForm) => {
    try {
      setLoading(true);
      if (assetId) {
        const resp = await addAssetCopy(assetId, body);
        onClose();
        onAddCopy(resp.data);
      }
      setOpenSuccessSnackbar(true);
    } catch (err) {}
    setLoading(false);
  };

  return (
    <>
      <Dialog open={open} fullWidth maxWidth="sm" onClose={onClose} aria-labelledby="alert-dialog-title">
        <DialogTitle id="alert-dialog-title">Dodaj egzemplarz</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-field">
              <Switch name="isFreeAccess" label="Czy książka jest w wolnym dostępie?" control={control} />
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
        text="Pomyślnie dodano nowy egzemplarz"
        color="success"
        open={openSuccessSnackbar}
        handleClose={closeSuccessSnackbarHandler}
      />
    </>
  );
};

export default AddCopyDialog;
