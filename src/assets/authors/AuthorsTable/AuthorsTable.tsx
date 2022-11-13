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
import { getAssetsAuthorsData } from "../../assets.api";
import { AssetsAuthor } from "../../assets.types";
import Loader from "../../../common/components/Loader/Loader";
import { usePagination } from "../../../common/hooks/use-pagination";
import AddAssetsAuthorDialog from "../AddAuthor/AddAuthor";
import { getFullName } from "../../../common/utils/full-name";

const AssetsAuthorsTable = () => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [authors, setAuthors] = useState<AssetsAuthor[]>([]);
  const { page, rowsPerPage, totalRows, setPage, setRowsPerPage, setTotalRows } = usePagination();
  const [openAddAuthorDialog, setOpenAddAuthorDialog] = useState<boolean>(false);

  const openAddAuthorDialogHandler = () => {
    setOpenAddAuthorDialog(true);
  };

  const closeAddAuthorDialogHandler = () => {
    setOpenAddAuthorDialog(false);
  };

  useEffect(() => {
    getData();
  }, [page, rowsPerPage]);

  const getData = async () => {
    try {
      const resp = await getAssetsAuthorsData({ page, rowsPerPage });
      setAuthors(resp.items);
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
      <div className="page-header-with-button">
        <h2>Autorzy</h2>
        <Button variant="contained" onClick={openAddAuthorDialogHandler}>
          Dodaj autora
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table aria-label="authors pagination table">
          <TableHead>
            <TableRow>
              <TableCell>Nazwa</TableCell>
              <TableCell>Ilość przypisanych</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {authors.map((author) => (
              <TableRow key={author.id}>
                <TableCell component="th">{getFullName(author)}</TableCell>
                <TableCell>{author.assetsCount}</TableCell>
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
      <AddAssetsAuthorDialog
        open={openAddAuthorDialog}
        onClose={closeAddAuthorDialogHandler}
        onSave={saveHandler}
      />
    </div>
  );
};

export default AssetsAuthorsTable;
