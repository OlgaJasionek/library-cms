import { useState } from "react";

import Snackbar from "../../../common/components/Snackbar/Snackbar";
import { addAssetsAuthor } from "../../assets.api";
import { AssetsAuthorFormValues } from "../../assets.types";
import AssetsAuthorForm from "../AuthorFormDialog/AuthorFormDialog";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
};

const AddAssetsAuthor = ({ open, onClose, onSave }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState<boolean>(false);

  const closeSuccessSnackbarHandler = () => {
    setOpenSuccessSnackbar(false);
  };

  const submitHandler = async (body: AssetsAuthorFormValues) => {
    try {
      setLoading(true);
      await addAssetsAuthor(body);
      onClose();
      onSave();
      setOpenSuccessSnackbar(true);
    } catch (err) {}
    setLoading(false);
  };

  return (
    <>
      <AssetsAuthorForm
        open={open}
        loading={loading}
        title={"Dodaj nowego autora"}
        onSubmit={submitHandler}
        onClose={onClose}
      />
      <Snackbar
        text="Pomyślnie dodano nowego autora"
        color="success"
        open={openSuccessSnackbar}
        handleClose={closeSuccessSnackbarHandler}
      />
    </>
  );
};

export default AddAssetsAuthor;
