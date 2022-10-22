import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import AssetsListTable from "./ListTable/ListTable";

const AssestsList = () => {
  const navigate = useNavigate();

  return (
    <div className="container--md">
      <div className="page-header-with-button">
        <h2>Katalog książek</h2>
        <Button variant="contained" onClick={() => navigate("/assets/add")}>
          Dodaj książkę
        </Button>
      </div>
      <AssetsListTable />
    </div>
  );
};

export default AssestsList;
