import { useState } from "react";

import Snackbar from "../../../common/components/Snackbar/Snackbar";
import { addAssetsCategory } from "../../assets.api";
import { AssetsCategoryFormValues } from "../../assets.types";
import AssetsCategoryFormDialog from "../CategoryFormDialog/CategoryFormDialog";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
};

const AddAssetCategory = ({ open, onClose, onSave }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState<boolean>(false);

  const closeSuccessSnackbarHandler = () => {
    setOpenSuccessSnackbar(false);
  };

  const onSubmit = async (body: AssetsCategoryFormValues) => {
    try {
      setLoading(true);
      await addAssetsCategory(body);
      onClose();
      onSave();
      setOpenSuccessSnackbar(true);
    } catch (err) {}
    setLoading(false);
  };

  return (
    <>
      <AssetsCategoryFormDialog
        open={open}
        loading={loading}
        title={"Dodaj nową kategorię"}
        onSubmit={onSubmit}
        onClose={onClose}
      />
      <Snackbar
        text="Pomyślnie dodano nową kategorię"
        color="success"
        open={openSuccessSnackbar}
        handleClose={closeSuccessSnackbarHandler}
      />
    </>
  );
};

export default AddAssetCategory;
