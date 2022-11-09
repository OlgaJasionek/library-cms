import { useState } from "react";

import ConfirmationDialog from "../../../../common/components/ConfirmationDialog/ConfirmationDialog";
import { reserveCopy } from "../../../assets.api";
import { AssetCopy } from "../../../assets.types";

type Props = {
  open: boolean;
  copyId: string | undefined;
  onClose: () => void;
  onReserve: (data: AssetCopy) => void;
};

const ReserveCopyDialog = ({ open, onClose, copyId, onReserve }: Props) => {
  const [loading, setLoading] = useState(false);

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
    <ConfirmationDialog
      open={open}
      onClose={onClose}
      loading={loading}
      onAccept={acceptDialogHandler}
      text="Czy na pewno chcesz zarezerwować ten egzemplarz?"
      title="Zarezerwowanie egzemplarza"
      snackbarText="Pomyślnie zarezerwowano"
    />
  );
};

export default ReserveCopyDialog;
