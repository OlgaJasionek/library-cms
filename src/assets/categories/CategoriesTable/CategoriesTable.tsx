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
import AddAssetCategory from "../AddCategory/AddCategoryDialog";
import EditAssetsCategory from "../EditCategory/EditCategory";
import DeleteAssetsCategory from "../DeleteCategory/DeleteCategory";

const AssetsCategoriesTable = () => {
  const [initialLoading, setInitialLoading] = useState(true);
  const { page, rowsPerPage, totalRows, setPage, setRowsPerPage, setTotalRows } = usePagination();

  const [categories, setCategories] = useState<AssetsCategory[]>([]);
  const [categoryId, setCategoryId] = useState<string>();
  const [openAddCategoryDialog, setOpenAddCategoryDialog] = useState<boolean>(false);
  const [openEditCategoryDialog, setOpenEditCategoryDialog] = useState<boolean>(false);
  const [openDeleteCategoryDialog, setOpenDeleteCategoryDialog] = useState<boolean>(false);

  useEffect(() => {
    getData();
  }, [page, rowsPerPage]);

  const openAddCategoryDialogHandler = () => {
    setOpenAddCategoryDialog(true);
  };

  const closeAddCategoryDialogHandler = () => {
    setOpenAddCategoryDialog(false);
  };

  const openEditCategoryDialogHandler = (id: string) => {
    setOpenEditCategoryDialog(true);
    setCategoryId(id);
  };

  const closeEditCategoryDialogHandler = () => {
    setOpenEditCategoryDialog(false);
  };

  const openDeleteCategoryDialogHandler = (id: string) => {
    setOpenDeleteCategoryDialog(true);
    setCategoryId(id);
  };

  const closeDeleteCategoryDialogHandler = () => {
    setOpenDeleteCategoryDialog(false);
  };

  const getSelectedCategoryById = (): AssetsCategory | undefined => {
    return categories.find((item) => item.id === categoryId);
  };

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
                    <IconButton
                      onClick={() => {
                        openEditCategoryDialogHandler(category.id);
                      }}
                    >
                      <Icons.Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Usuń">
                    <IconButton
                      onClick={() => {
                        openDeleteCategoryDialogHandler(category.id);
                      }}
                    >
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
      <AddAssetCategory
        open={openAddCategoryDialog}
        onClose={closeAddCategoryDialogHandler}
        onSave={saveHandler}
      />
      <EditAssetsCategory
        open={openEditCategoryDialog}
        onClose={closeEditCategoryDialogHandler}
        onSave={saveHandler}
        categoryId={categoryId}
        initData={getSelectedCategoryById()}
      />
      <DeleteAssetsCategory
        open={openDeleteCategoryDialog}
        onClose={closeDeleteCategoryDialogHandler}
        onSave={saveHandler}
        categoryId={categoryId}
      />
    </div>
  );
};

export default AssetsCategoriesTable;
