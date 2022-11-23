import { LoadingButton } from "@mui/lab";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import TextInput from "../../../common/components/TextInput/TextInput";
import { AssetsAuthorFormValues, AssetsAuthor } from "../../assets.types";

type Props = {
  open: boolean;
  loading: boolean;
  title: string;
  initData?: AssetsAuthor | undefined;
  onSubmit: (body: AssetsAuthorFormValues) => Promise<void>;
  onClose: () => void;
};

const AssetsAuthorFormDialog = ({ open, onClose, onSubmit, loading, title, initData }: Props) => {
  const { handleSubmit, control, reset, setValue } = useForm<AssetsAuthorFormValues>();

  useEffect(() => {
    if (open) {
      if (initData) {
        setValue("firstName", initData.firstName);
        setValue("lastName", initData.lastName);
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
    </>
  );
};

export default AssetsAuthorFormDialog;
