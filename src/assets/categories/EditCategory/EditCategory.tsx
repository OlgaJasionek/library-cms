import { useState } from "react";

import Snackbar from "../../../common/components/Snackbar/Snackbar";
import { editAssetsCategory } from "../../assets.api";
import { AssetsCategoryFormValues, AssetsCategory } from "../../assets.types";
import AssetsCategoryFormDialog from "../CategoryFormDialog/CategoryFormDialog";

type Props = {
  open: boolean;
  categoryId: string | undefined;
  initData: AssetsCategory | undefined;
  onClose: () => void;
  onSave: () => void;
};

const EditAssetsCategory = ({ open, onClose, onSave, categoryId, initData }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState<boolean>(false);

  const closeSuccessSnackbarHandler = () => {
    setOpenSuccessSnackbar(false);
  };

  const onSubmit = async (body: AssetsCategoryFormValues) => {
    try {
      setLoading(true);
      if (categoryId) await editAssetsCategory(body, categoryId);
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
        title={"Edycja istniejącej kategorii"}
        onSubmit={onSubmit}
        onClose={onClose}
        initData={initData}
      />
      <Snackbar
        text="Pomyślnie zedytowano kategorię"
        color="success"
        open={openSuccessSnackbar}
        handleClose={closeSuccessSnackbarHandler}
      />
    </>
  );
};

export default EditAssetsCategory;
