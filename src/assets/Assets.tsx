import { Route, Routes } from "react-router-dom";

import AddAsset from "./AddAsset/AddAsset";
import AssetDetails from "./AssetDetails/AssetDetails";
import AssetsList from "./AssetsList/AssetsList";
import AssetsAuthors from "./authors/Authors";
import AssetsCategories from "./categories/Categories";

const Assests = () => {
  return (
    <Routes>
      <Route path="/categories" element={<AssetsCategories />}></Route>
      <Route path="/authors" element={<AssetsAuthors />}></Route>
      <Route path="/list" element={<AssetsList />}></Route>
      <Route path="/add" element={<AddAsset />} />
      <Route path="/:assetId" element={<AssetDetails />} />
    </Routes>
  );
};

export default Assests;
