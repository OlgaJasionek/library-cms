import { useState } from "react";

import ConfirmationDialog from "../../../common/components/ConfirmationDialog/ConfirmationDialog";
import { returnCopy } from "../../assets.api";
import { AssetRental } from "../../assets.types";

type Props = {
  open: boolean;
  rentalId: string | undefined;
  onClose: () => void;
  onReturn: (data: AssetRental) => void;
};

const ReturnCopyDialog = ({ open, onClose, rentalId, onReturn }: Props) => {
  const [loading, setLoading] = useState(false);

  const acceptDialogHandler = async () => {
    try {
      setLoading(true);

      if (rentalId) {
        const resp = await returnCopy(rentalId);
        onClose();
        onReturn(resp.data);
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
      text="Czy na pewno chcesz zarejestrować zwrot tego egzemplarza?"
      title="Zwrot egzemplarza"
      snackbarText="Pomyślnie zwrócono egzemplarz"
    />
  );
};

export default ReturnCopyDialog;