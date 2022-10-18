import { Button } from "@mui/material";

import AssetsCategoriesTable from "./CategoriesTable/CategoriesTable";

import styles from "./Categories.module.scss";

const AssetsCategories = () => {
  return (
    <div className="container--md">
      <div className={styles.header}>
        <h2>Kategorie przedmiotów</h2>
        <Button variant="contained">Dodaj kategorię</Button>
      </div>
      <AssetsCategoriesTable />
    </div>
  );
};

export default AssetsCategories;
