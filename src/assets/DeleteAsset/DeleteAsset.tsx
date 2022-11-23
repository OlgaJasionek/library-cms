import { useState } from "react";

import ConfirmationDialog from "../../common/components/ConfirmationDialog/ConfirmationDialog";
import Snackbar from "../../common/components/Snackbar/Snackbar";
import { deleteAsset } from "../assets.api";

type Props = {
  open: boolean;
  assetId: string | undefined;
  onClose: () => void;
  onSave: () => void;
};

const DeleteAsset = ({ open, onClose, onSave, assetId }: Props) => {
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const closeSuccessSnackbarHandler = () => {
    setOpenSuccessSnackbar(false);
  };

  const deleteAuthorHandler = async () => {
    setLoading(true);
    try {
      if (assetId) await deleteAsset(assetId);
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
        text={"Czy na pewno chcesz usunąć tą książkę?"}
        loading={loading}
        title={"Usuń książkę"}
        onClose={onClose}
        onAccept={deleteAuthorHandler}
      />
      <Snackbar
        text="Pomyślnie usunięto książkę"
        color="success"
        open={openSuccessSnackbar}
        handleClose={closeSuccessSnackbarHandler}
      />
    </>
  );
};

export default DeleteAsset;
