import { useState } from "react";

import ConfirmationDialog from "../../../../common/components/ConfirmationDialog/ConfirmationDialog";
import Snackbar from "../../../../common/components/Snackbar/Snackbar";
import { rentCopy } from "../../../assets.api";
import { AssetsCopy } from "../../../assets.types";

type Props = {
  open: boolean;
  copyId: string | undefined;
  onClose: () => void;
  onRent: (data: AssetsCopy) => void;
};

const RentCopyDialog = ({ open, onClose, copyId, onRent }: Props) => {
  const [loading, setLoading] = useState(false);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState<boolean>(false);

  const closeSuccessSnackbarHandler = () => {
    setOpenSuccessSnackbar(false);
  };

  const acceptDialogHandler = async () => {
    try {
      setLoading(true);

      if (copyId) {
        const resp = await rentCopy(copyId);
        onClose();
        onRent(resp.data);
        setOpenSuccessSnackbar(true);
      }
    } catch (err) {}
    setLoading(false);
  };

  return (
    <>
      <ConfirmationDialog
        open={open}
        onClose={onClose}
        loading={loading}
        onAccept={acceptDialogHandler}
        text="Czy na pewno chcesz wypożyczyć ten egzemplarz?"
        title="Wypożyczenie egzemplarza"
      />
      <Snackbar
        text="Pomyślnie wypożyczono egzemplarz"
        color="success"
        open={openSuccessSnackbar}
        handleClose={closeSuccessSnackbarHandler}
      />
    </>
  );
};

export default RentCopyDialog;
