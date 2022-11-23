import { useState } from "react";

import ConfirmationDialog from "../../../common/components/ConfirmationDialog/ConfirmationDialog";
import Snackbar from "../../../common/components/Snackbar/Snackbar";
import http from "../../../core/api/http";

type Props = {
  open: boolean;
  readerId: string | undefined;
  onClose: () => void;
  onSave: () => void;
};

const DeleteReader = ({ open, onClose, onSave, readerId }: Props) => {
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const closeSuccessSnackbarHandler = () => {
    setOpenSuccessSnackbar(false);
  };

  const deleteAuthorHandler = async () => {
    setLoading(true);
    try {
      if (readerId) await http.delete(`users/${readerId}`);
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
        text={"Czy na pewno chcesz usunąć tego czytelnika?"}
        loading={loading}
        title={"Usuń czytelnika"}
        onClose={onClose}
        onAccept={deleteAuthorHandler}
      />
      <Snackbar
        text="Pomyślnie usunięto czytelnika"
        color="success"
        open={openSuccessSnackbar}
        handleClose={closeSuccessSnackbarHandler}
      />
    </>
  );
};

export default DeleteReader;
