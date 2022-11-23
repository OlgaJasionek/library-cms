import { useState } from "react";

import ConfirmationDialog from "../../../common/components/ConfirmationDialog/ConfirmationDialog";
import Snackbar from "../../../common/components/Snackbar/Snackbar";
import { deleteAssetsAuthor } from "../../assets.api";

type Props = {
  open: boolean;
  authorId: string | undefined;
  onClose: () => void;
  onSave: () => void;
};

const DeleteAssetsAuthor = ({ open, onClose, onSave, authorId }: Props) => {
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const closeSuccessSnackbarHandler = () => {
    setOpenSuccessSnackbar(false);
  };

  const deleteAuthorHandler = async () => {
    setLoading(true);
    try {
      if (authorId) await deleteAssetsAuthor(authorId);
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
        text={"Czy na pewno chcesz usunąć tego autora?"}
        loading={loading}
        title={"Usuń autora"}
        onClose={onClose}
        onAccept={deleteAuthorHandler}
      />
      <Snackbar
        text="Pomyślnie usunięto autora"
        color="success"
        open={openSuccessSnackbar}
        handleClose={closeSuccessSnackbarHandler}
      />
    </>
  );
};

export default DeleteAssetsAuthor;
