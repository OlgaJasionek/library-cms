import { LoadingButton } from "@mui/lab";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

import TextInput from "../../../common/components/TextInput/TextInput";
import { AssetsCategoryFormValues, AssetsCategory } from "../../assets.types";

type Props = {
  open: boolean;
  loading: boolean;
  title: string;
  initData?: AssetsCategory;
  onSubmit: (body: AssetsCategoryFormValues) => Promise<void>;
  onClose: () => void;
};

const AssetsCategoryFormDialog = ({ open, onClose, onSubmit, loading, title, initData }: Props) => {
  const { handleSubmit, control, reset, setValue } = useForm<AssetsCategoryFormValues>();

  useEffect(() => {
    if (open) {
      if (initData) {
        setValue("name", initData.name);
      }
    } else {
      reset();
    }
  }, [open]);

  return (
    <>
      <Dialog open={open} fullWidth maxWidth="sm" onClose={onClose} aria-labelledby="alert-dialog-title">
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-field">
              <TextInput name="name" control={control} rules={{ required: true }} label="Nazwa" />
            </div>
            <DialogActions>
              <LoadingButton onClick={onClose} loading={loading} loadingIndicator="Anuluj">
                Anuluj
              </LoadingButton>
              <LoadingButton type="submit" variant="contained" role="progressbar" loading={loading}>
                Zapisz
              </LoadingButton>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AssetsCategoryFormDialog;
