import { LoadingButton } from "@mui/lab";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";

import TextInput from "../../../common/components/TextInput/TextInput";
import { addAssetCategory } from "../../assets.api";
import { AddAssetCategoryValue } from "../../assets.types";

import styles from "./AddCategoryDialog.module.scss";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
};

const AddAssetCategoryDialog = ({ open, onClose, onSave }: Props) => {
  const { handleSubmit, control } = useForm<AddAssetCategoryValue>();
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (body: AddAssetCategoryValue) => {
    try {
      setLoading(true);
      await addAssetCategory(body);
      onClose();
      onSave();
    } catch (err) {}
    setLoading(false);
  };

  return (
    <Dialog open={open} fullWidth maxWidth="sm" onClose={onClose} aria-labelledby="alert-dialog-title">
      <DialogTitle id="alert-dialog-title">Dodaj nową kategorię</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.input}>
            <TextInput name="name" control={control} rules={{ required: true }} label="Nazwa" type="text" />
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
  );
};

export default AddAssetCategoryDialog;
