import { ArrowBack } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import AdditionalData from "./AdditionalData/AdditionalData";

import BasicData from "./BasicData/BasicData";
import AssetCategoryValue from "./Category/AssetCategory";

const AddAsset = () => {
  const { handleSubmit, control, watch } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    watch((values) => {
      console.log(values);
    });
  }, []);

  const onSubmit = () => {
    console.log("możesz przejść do kolejnego modulu");
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
