import { Route, Routes } from "react-router-dom";

import ReadersTable from "./ReadersTable/ReadersTable";
import AddReader from "./AddReader/AddReader";

const Readers = () => {
  return (
    <div>
      <Routes>
        <Route path="/add" element={<AddReader />} />
        <Route path="/" element={<ReadersTable />}></Route>
      </Routes>
    </div>
  );
};

export default Readers;
