import { Route, Routes } from "react-router-dom";

import Readers from "./Readers/Readers";

const Users = () => {
  return (
    <Routes>
      <Route path="/readers" element={<Readers />}></Route>
    </Routes>
  );
};

export default Users;
