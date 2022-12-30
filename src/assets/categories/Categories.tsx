import { useEffect } from "react";

import { useDocumentTitle } from "../../common/hooks/use-document-title";
import AssetsCategoriesTable from "./CategoriesTable/CategoriesTable";

const AssetsCategories = () => {
  const [setDocumentTitle] = useDocumentTitle();

  useEffect(() => {
    setDocumentTitle("Kategorie");
  }, []);

  return (
    <div>
      <AssetsCategoriesTable />
    </div>
  );
};

export default AssetsCategories;
