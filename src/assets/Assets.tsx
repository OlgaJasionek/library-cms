import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../common/components/PrivateRoute/PrivateRoute";
import { UserRole } from "../users/users.types";

import AddAsset from "./AddAsset/AddAsset";
import AssetDetails from "./AssetDetails/AssetDetails";
import AssetsList from "./AssetsList/AssetsList";
import AssetsAuthors from "./authors/Authors";
import AssetsCategories from "./categories/Categories";
import EditAsset from "./EditAsset/EditAsset";
import AssetsRentals from "./rentals/Rentals";

const Assests = () => {
  return (
    <Routes>
      <Route
        path="/categories"
        element={
          <PrivateRoute requiredUserRole={UserRole.Librarian}>
            <AssetsCategories />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="/authors"
        element={
          <PrivateRoute requiredUserRole={UserRole.Librarian}>
            <AssetsAuthors />
          </PrivateRoute>
        }
      ></Route>
      <Route path="/list" element={<AssetsList />}></Route>
      <Route
        path="/add"
        element={
          <PrivateRoute requiredUserRole={UserRole.Librarian}>
            <AddAsset />
          </PrivateRoute>
        }
      />
      <Route
        path="/list/:assetId/edit"
        element={
          <PrivateRoute requiredUserRole={UserRole.Librarian}>
            <EditAsset />
          </PrivateRoute>
        }
      />
      <Route path="/:assetId" element={<AssetDetails />} />
      <Route
        path="/rentals"
        element={
          <PrivateRoute requiredUserRole={UserRole.Librarian}>
            <AssetsRentals />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default Assests;
