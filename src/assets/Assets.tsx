import { Route, Routes } from "react-router-dom";

import AssetsCategories from "./categories/Categories";

const Assests = () => {
  return (
    <Routes>
      <Route path="/categories" element={<AssetsCategories />}></Route>
    </Routes>
  );
};

export default Assests;
