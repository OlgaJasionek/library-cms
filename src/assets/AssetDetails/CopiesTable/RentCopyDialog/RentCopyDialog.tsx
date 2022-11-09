import { useState } from "react";

import ConfirmationDialog from "../../../../common/components/ConfirmationDialog/ConfirmationDialog";
import { rentCopy } from "../../../assets.api";
import { AssetCopy } from "../../../assets.types";

type Props = {
  open: boolean;
  copyId: string | undefined;
  onClose: () => void;
  onRent: (data: AssetCopy) => void;
};

const RentCopyDialog = ({ open, onClose, copyId, onRent }: Props) => {
  const [loading, setLoading] = useState(false);

  const acceptDialogHandler = async () => {
    try {
      setLoading(true);

      if (copyId) {
        const resp = await rentCopy(copyId);
        onClose();
        onRent(resp.data);
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
      text="Czy na pewno chcesz wypożyczyć ten egzemplarz?"
      title="Wypożyczenie egzemplarza"
      snackbarText="Pomyślnie wypożyczono książkę"
    />
  );
};

export default RentCopyDialog;
