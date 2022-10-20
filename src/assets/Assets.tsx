import { Route, Routes } from "react-router-dom";

import AssetsAuthors from "./authors/Authors";
import AssetsCategories from "./categories/Categories";

const Assests = () => {
  return (
    <Routes>
      <Route path="/categories" element={<AssetsCategories />}></Route>
      <Route path="/authors" element={<AssetsAuthors />}></Route>
    </Routes>
  );
};

export default Assests;
