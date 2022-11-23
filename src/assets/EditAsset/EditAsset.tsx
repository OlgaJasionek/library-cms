import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Asset, AssetsFormValues } from "../assets.types";
import AssetForm from "../AssetForm/AssetForm";
import { editAsset, getAssetData } from "../assets.api";
import Loader from "../../common/components/Loader/Loader";

const EditAsset = () => {
  const [assetData, setAssetData] = useState<Asset>();
  const { assetId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getSelectedAssetData();
  }, [assetId]);

  const getSelectedAssetData = async () => {
    if (assetId) {
      const resp = await getAssetData(assetId);
      setAssetData(resp);
    }
  };

  const submitHandler = async (body: AssetsFormValues) => {
    try {
      if (assetId) await editAsset(body, assetId);
      navigate(`/assets/${assetId}`);
    } catch (err) {}
  };

  return (
    <div className="container--md">
      <div className="mb-5">
        <h2>Edytuj książkę</h2>
      </div>
      {assetData ? <AssetForm onSubmit={submitHandler} initData={assetData} /> : <Loader />}
    </div>
  );
};

export default EditAsset;
