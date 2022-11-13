import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableContainer,
  TableRow,
  TableCell,
  Paper,
  Tooltip,
  IconButton,
  Button,
} from "@mui/material";
import * as Icons from "@mui/icons-material";

import TablePagination from "../../../common/components/TablePagination/TablePagination";
import { getAssetsCategoriesData } from "../../assets.api";
import { AssetsCategory } from "../../assets.types";
import Loader from "../../../common/components/Loader/Loader";
import { usePagination } from "../../../common/hooks/use-pagination";
import AddAssetCategoryDialog from "../AddCategory/AddCategoryDialog";

const AssetsCategoriesTable = () => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [categories, setCategories] = useState<AssetsCategory[]>([]);
  const { page, rowsPerPage, totalRows, setPage, setRowsPerPage, setTotalRows } = usePagination();
  const [openAddCategoryDialog, setOpenAddCategoryDialog] = useState<boolean>(false);

  const openAddCategoryDialogHandler = () => {
    setOpenAddCategoryDialog(true);
  };

  const closeAddCategoryDialogHandler = () => {
    setOpenAddCategoryDialog(false);
  };

  useEffect(() => {
    getData();
  }, [page, rowsPerPage]);

  const getData = async () => {
    try {
      const resp = await getAssetsCategoriesData({ page, rowsPerPage });
      setCategories(resp.items);
      setTotalRows(resp.total);
    } catch (err) {}
    setInitialLoading(false);
  };

  const saveHandler = () => {
    page === 0 ? getData() : setPage(0);
  };

  if (initialLoading) {
    return <Loader />;
  }

  return (
    <div className="container--md">
      <div className="page-header-with-button ">
        <h2>Kategorie przedmiotów</h2>
        <Button variant="contained" onClick={openAddCategoryDialogHandler}>
          Dodaj kategorię
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table aria-label="categories pagination table">
          <TableHead>
            <TableRow>
              <TableCell>Nazwa</TableCell>
              <TableCell>Ilość przypisanych</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell component="th">{category.name}</TableCell>
                <TableCell>{category.assetsCount}</TableCell>
                <TableCell scope="row" align="right">
                  <Tooltip title="Edytuj">
                    <IconButton>
                      <Icons.Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Usuń">
                    <IconButton>
                      <Icons.Delete />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TablePagination
            page={page}
            rowsPerPage={rowsPerPage}
            totalRows={totalRows}
            onPageChange={setPage}
            onPerPageChange={setRowsPerPage}
          />
        </Table>
      </TableContainer>
      <AddAssetCategoryDialog
        open={openAddCategoryDialog}
        onClose={closeAddCategoryDialogHandler}
        onSave={saveHandler}
      />
    </div>
  );
};

export default AssetsCategoriesTable;
