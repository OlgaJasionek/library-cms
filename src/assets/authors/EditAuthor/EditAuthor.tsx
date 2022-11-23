import { useState } from "react";

import Snackbar from "../../../common/components/Snackbar/Snackbar";
import { editAssetsAuthor } from "../../assets.api";
import { AssetsAuthorFormValues, AssetsAuthor } from "../../assets.types";
import AssetsAuthorForm from "../AuthorFormDialog/AuthorFormDialog";

type Props = {
  open: boolean;
  authorId: string | undefined;
  initData: AssetsAuthor | undefined;
  onClose: () => void;
  onSave: () => void;
};

const EditAssetsAuthor = ({ open, onClose, onSave, authorId, initData }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState<boolean>(false);

  const closeSuccessSnackbarHandler = () => {
    setOpenSuccessSnackbar(false);
  };

  const sumbitHandler = async (body: AssetsAuthorFormValues) => {
    try {
      setLoading(true);
      if (authorId) await editAssetsAuthor(body, authorId);
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
        title={"Edycja istniejącego autora"}
        onSubmit={sumbitHandler}
        onClose={onClose}
        initData={initData}
      />
      <Snackbar
        text="Pomyślnie zedytowano istniejącego autora"
        color="success"
        open={openSuccessSnackbar}
        handleClose={closeSuccessSnackbarHandler}
      />
    </>
  );
};

export default EditAssetsAuthor;
