import { useState } from "react";

import ConfirmationDialog from "../../../common/components/ConfirmationDialog/ConfirmationDialog";
import Snackbar from "../../../common/components/Snackbar/Snackbar";
import { deleteAssetsCategory } from "../../assets.api";

type Props = {
  open: boolean;
  categoryId: string | undefined;
  onClose: () => void;
  onSave: () => void;
};

const DeleteAssetsCategory = ({ open, onClose, onSave, categoryId }: Props) => {
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const closeSuccessSnackbarHandler = () => {
    setOpenSuccessSnackbar(false);
  };

  const deleteAuthorHandler = async () => {
    setLoading(true);
    try {
      if (categoryId) await deleteAssetsCategory(categoryId);
      onClose();
      onSave();
      setOpenSuccessSnackbar(true);
    } catch (err) {}
    setLoading(false);
  };

  return (
    <>
      <ConfirmationDialog
        open={open}
        text={"Czy na pewno chcesz usunąć tą kategorię?"}
        loading={loading}
        title={"Usuń kategorię"}
        onClose={onClose}
        onAccept={deleteAuthorHandler}
      />
      <Snackbar
        text="Pomyślnie usunięto kategorię"
        color="success"
        open={openSuccessSnackbar}
        handleClose={closeSuccessSnackbarHandler}
      />
    </>
  );
};

export default DeleteAssetsCategory;
