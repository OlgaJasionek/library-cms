import { Route, Routes } from "react-router-dom";

import ReadersTable from "./ReadersTable/ReadersTable";
import AddReaderForm from "./AddReaderForm/AddReaderForm";

const Readers = () => {
  return (
    <div>
      <Routes>
        <Route path="/add" element={<AddReaderForm />} />
        <Route path="/" element={<ReadersTable />}></Route>
      </Routes>
    </div>
  );
};

export default Readers;
