import { Button } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Asset, AssetsFormValues } from "../assets.types";
import AdditionalData from "./AdditionalData/AdditionalData";
import AssetCover from "./AssetCover/AssetCover";
import BasicData from "./BasicData/BasicData";
import AssetCategoryValue from "./Category/AssetCategory";

type Props = {
  initData?: Asset | undefined;
  onSubmit: (body: AssetsFormValues) => Promise<void>;
};

const AssetForm = ({ onSubmit, initData }: Props) => {
  const { handleSubmit, control, setValue } = useForm<AssetsFormValues>();
  const navigate = useNavigate();

  useEffect(() => {
    if (initData) {
      setValue("title", initData.title);
      setValue("type", initData.type);
      setValue("authorId", initData.author.id);
      setValue("isbn", initData.isbn);
      setValue("publisher", initData.publisher);
      setValue("publicationYear", initData.publicationYear.toString());
      setValue("lubimyczytacLink", initData.lubimyczytacLink);
      setValue("imageId", initData.image.id);
      setValue("description", initData.description);
      setValue(
        "categoryIds",
        initData.categories.map((item) => item.id)
      );
    }
  }, []);

  const imageUploadHandler = (id: string) => {
    setValue("imageId", id);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <BasicData control={control} />
        <div className="mt-4">
          <AssetCategoryValue control={control} />
        </div>
        <div className="mt-4">
          <AdditionalData control={control} />
        </div>
        <div className="mt-4">
          <AssetCover onImageUpload={imageUploadHandler} />
        </div>
        <div className="d-flex justify-content-end mt-2">
          <Button
            className="m-2"
            variant="outlined"
            onClick={() => {
              navigate("/assets/list");
            }}
          >
            Anuluj
          </Button>
          <Button type="submit" className="m-2" variant="contained">
            Zapisz
          </Button>
        </div>
      </form>
    </>
  );
};

export default AssetForm;
