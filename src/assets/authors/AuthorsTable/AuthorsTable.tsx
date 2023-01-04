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
  TableSortLabel,
} from "@mui/material";
import * as Icons from "@mui/icons-material";

import TablePagination from "../../../common/components/TablePagination/TablePagination";
import { getAssetsAuthorsData } from "../../assets.api";
import { AssetsAuthor } from "../../assets.types";
import Loader from "../../../common/components/Loader/Loader";
import { usePagination } from "../../../common/hooks/use-pagination";
import AddAssetsAuthor from "../AddAuthor/AddAuthor";
import { getFullName } from "../../../common/utils/full-name";
import EditAssetsAuthor from "../EditAuthor/EditAuthor";
import DeleteAssetsAuthor from "../DeleteAuthor/DeleteAuthor";
import AuthorsSearchBar from "../AuthorsSearchBar/AuthorsSearchBar";
import { TableHeadCell } from "../../../common/types/table-head-cell";
import { useSort } from "../../../common/hooks/use-sort";

const headCells: TableHeadCell[] = [
  {
    id: "name",
    label: "Nazwa",
  },
  {
    id: "assetsCount",
    label: "Ilość przypisanych",
  },
];

const AssetsAuthorsTable = () => {
  const [initialLoading, setInitialLoading] = useState(true);
  const { page, perPage, totalRows, setPage, setPerPage, setTotalRows } = usePagination();
  const [searchValueLoading, setSearchValueLoading] = useState<boolean>(false);

  const [authors, setAuthors] = useState<AssetsAuthor[]>([]);
  const [selectedAuthorId, setSelectedAuthorId] = useState<string>();
  const [openAddAuthorDialog, setOpenAddAuthorDialog] = useState<boolean>(false);
  const [openEditAuthorDialog, setOpenEditAuthorDialog] = useState<boolean>(false);
  const [openDeleteAuthorDialog, setOpenDeleteAuthorDialog] = useState<boolean>(false);
  const { sortBy, sortOrder, changeSort } = useSort();
  const [searchAuthorValue, setSearchAuthorValue] = useState<string>();

  useEffect(() => {
    getData();
  }, [page, perPage, sortBy, sortOrder, searchAuthorValue]);

  useEffect(() => {
    setSearchValueLoading(true);
  }, [searchAuthorValue]);

  const getData = async () => {
    try {
      const resp = await getAssetsAuthorsData({
        page,
        perPage,
        sortBy,
        sortOrder,
        q: searchAuthorValue,
      });
      setAuthors(resp.items);
      setTotalRows(resp.total);
    } catch (err) {}
    setInitialLoading(false);
    setSearchValueLoading(false);
  };

  const changeSearchAuthorHandler = (value: string) => {
    setSearchAuthorValue(value);
    setPage(0);
  };

  const openAddAuthorDialogHandler = () => {
    setOpenAddAuthorDialog(true);
  };

  const closeAddAuthorDialogHandler = () => {
    setOpenAddAuthorDialog(false);
  };

  const openEditAuthorDialogHandler = (id: string) => {
    setOpenEditAuthorDialog(true);
    setSelectedAuthorId(id);
  };

  const closeEditAuthorDialogHandler = () => {
    setOpenEditAuthorDialog(false);
  };

  const openDeleteAuthorDialogHandler = (id: string) => {
    setOpenDeleteAuthorDialog(true);
    setSelectedAuthorId(id);
  };

  const closeDeleteAuthorDialogHandler = () => {
    setOpenDeleteAuthorDialog(false);
  };

  const getSelectedAuthorById = (): AssetsAuthor | undefined => {
    return authors.find((item) => item.id === selectedAuthorId);
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
      <div>
        <AuthorsSearchBar onChangeValue={changeSearchAuthorHandler} loading={searchValueLoading} />
      </div>
      {authors.length === 0 ? (
        <p>Brak rekordów.</p>
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="authors pagination table">
            <TableHead>
              <TableRow>
                {headCells.map((headCell) => (
                  <TableCell key={headCell.id}>
                    <TableSortLabel
                      active={headCell.id === sortBy}
                      direction={headCell.id === sortBy ? sortOrder : "asc"}
                      onClick={() => {
                        changeSort(headCell.id);
                      }}
                    >
                      {headCell.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {authors.map((author) => (
                <TableRow key={author.id}>
                  <TableCell component="th">{getFullName(author)}</TableCell>
                  <TableCell>{author.assetsCount}</TableCell>
                  <TableCell>
                    <div className="d-flex justify-content-end">
                      <Tooltip title="Edytuj">
                        <IconButton
                          onClick={() => {
                            openEditAuthorDialogHandler(author.id);
                          }}
                        >
                          <Icons.Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Usuń">
                        <IconButton
                          onClick={() => {
                            openDeleteAuthorDialogHandler(author.id);
                          }}
                        >
                          <Icons.Delete />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TablePagination
              page={page}
              perPage={perPage}
              totalRows={totalRows}
              onPageChange={setPage}
              onPerPageChange={setPerPage}
            />
          </Table>
        </TableContainer>
      )}
      <AddAssetsAuthor
        open={openAddAuthorDialog}
        onClose={closeAddAuthorDialogHandler}
        onSave={saveHandler}
      />
      <EditAssetsAuthor
        open={openEditAuthorDialog}
        onClose={closeEditAuthorDialogHandler}
        onSave={saveHandler}
        authorId={selectedAuthorId}
        initData={getSelectedAuthorById()}
      />
      <DeleteAssetsAuthor
        open={openDeleteAuthorDialog}
        onClose={closeDeleteAuthorDialogHandler}
        onSave={saveHandler}
        authorId={selectedAuthorId}
      />
    </div>
  );
};

export default AssetsAuthorsTable;
