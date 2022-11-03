import { ArrowBack } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { addAsset } from "../assets.api";
import { AddAssetFormValues } from "../assets.types";
import AdditionalData from "./AdditionalData/AdditionalData";
import AssetCover from "./AssetCover/AssetCover";
import BasicData from "./BasicData/BasicData";
import AssetCategoryValue from "./Category/AssetCategory";

const AddAsset = () => {
  const { handleSubmit, control, setValue } = useForm<AddAssetFormValues>();
  const navigate = useNavigate();

  const imageUploadHandler = (id: string) => {
    setValue("imageId", id);
  };

  const onSubmit = async (body: AddAssetFormValues) => {
    try {
      const resp = await addAsset(body);
      const assetId = resp.id;
      navigate(`/assets/${assetId}`);
    } catch (err) {}
  };

  return (
    <div className="container--md">
      <div className="page-header-with-link ">
        <h2>Dodaj nową książkę</h2>
        <Link to="/assets/list">
          <ArrowBack /> Katalog
        </Link>
      </div>
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
    </div>
  );
};

export default AddAsset;
