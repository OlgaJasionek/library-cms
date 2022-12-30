import { useEffect } from "react";

import { useDocumentTitle } from "../../common/hooks/use-document-title";
import AssetsAuthorsTable from "./AuthorsTable/AuthorsTable";

const AssetsAuthors = () => {
  const [setDocumentTitle] = useDocumentTitle();

  useEffect(() => {
    setDocumentTitle("Autorzy książek");
  }, []);
  
  return (
    <div>
      <AssetsAuthorsTable />
    </div>
  );
};
export default AssetsAuthors;
