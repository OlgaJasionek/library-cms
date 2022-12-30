import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";

import ReadersTable from "./ReadersTable/ReadersTable";
import AddReader from "./AddReader/AddReader";
import EditReader from "./EditReader/EditReader";
import { useDocumentTitle } from "../../common/hooks/use-document-title";

const Readers = () => {
  const [setDocumentTitle] = useDocumentTitle();

  useEffect(() => {
    setDocumentTitle("Czytelnicy");
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/add" element={<AddReader />} />
        <Route path="/:readerId/edit" element={<EditReader />} />
        <Route path="/" element={<ReadersTable />}></Route>
      </Routes>
    </div>
  );
};

export default Readers;
