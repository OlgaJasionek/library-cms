import { useState } from "react";

import ConfirmationDialog from "../../../../common/components/ConfirmationDialog/ConfirmationDialog";
import Snackbar from "../../../../common/components/Snackbar/Snackbar";
import { reserveCopy } from "../../../assets.api";
import { AssetsCopy } from "../../../assets.types";

type Props = {
  open: boolean;
  copyId: string | undefined;
  onClose: () => void;
  onReserve: (data: AssetsCopy) => void;
};

const ReserveCopyDialog = ({ open, onClose, copyId, onReserve }: Props) => {
  const [loading, setLoading] = useState(false);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState<boolean>(false);

  const closeSuccessSnackbarHandler = () => {
    setOpenSuccessSnackbar(false);
  };

  const acceptDialogHandler = async () => {
    try {
      setLoading(true);

      if (copyId) {
        const resp = await reserveCopy(copyId);
        onClose();
        onReserve(resp.data);
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
        text="Czy na pewno chcesz zarezerwować ten egzemplarz?"
        title="Zarezerwowanie egzemplarza"
      />
      <Snackbar
        text="Pomyślnie zarezerowowano egzemplarz"
        color="success"
        open={openSuccessSnackbar}
        handleClose={closeSuccessSnackbarHandler}
      />
    </>
  );
};

export default ReserveCopyDialog;
