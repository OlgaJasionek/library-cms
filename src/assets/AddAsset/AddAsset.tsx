import { ArrowBack } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

import { addAsset } from "../assets.api";
import AssetForm from "../AssetForm/AssetForm";
import { AssetsFormValues } from "../assets.types";

const AddAsset = () => {
  const navigate = useNavigate();

  const submitHandler = async (body: AssetsFormValues) => {
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
      <AssetForm onSubmit={submitHandler} />
    </div>
  );
};

export default AddAsset;
