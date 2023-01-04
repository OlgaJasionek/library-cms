import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  Avatar,
  Chip,
  TableHead,
  TableContainer,
  TableRow,
  TableCell,
  Paper,
  Button,
  Tooltip,
  IconButton,
} from "@mui/material";
import * as Icons from "@mui/icons-material";

import Loader from "../../../common/components/Loader/Loader";
import { getFullName } from "../../../common/utils/full-name";
import { Readers } from "../readers.types";
import TablePagination from "../../../common/components/TablePagination/TablePagination";
import { getReadersData } from "../../users.api";
import { usePagination } from "../../../common/hooks/use-pagination";
import DeleteReader from "../DeleteReader/DeleteReader";
import { useSort } from "../../../common/hooks/use-sort";
import ReadersFilters from "../ReadersFilters/ReadersFilters";
import TabelSort from "../../../common/components/TabelSort/TabelSort";

import styles from "./ReadersTable.module.scss";

const ReadersTable = () => {
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const { page, perPage, totalRows, setPerPage, setPage, setTotalRows } = usePagination();

  const { sortBy, sortOrder, changeSort } = useSort();
  const [searchReaderValue, setSearchReaderValue] = useState<string>();
  const [searchReaderLoading, setSearchReaderLoading] = useState<boolean>(false);
  const [showOnlyActiveReaders, setShowOnlyActiverReaders] = useState<boolean>(false);

  const [readers, setReaders] = useState<Readers[]>([]);
  const [selectedReaderId, setSelectedReaderId] = useState<string>();
  const [openDeleteReaderDialog, setOpenDeleteReaderDialog] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, [page, perPage, sortBy, sortOrder, searchReaderValue, showOnlyActiveReaders]);

  useEffect(() => {
    setSearchReaderLoading(true);
  }, [searchReaderValue]);

  const changeReaderFiltersHandler = (values: { searchReader?: string; onlyActive?: boolean }) => {
    setSearchReaderValue(values.searchReader);
    setShowOnlyActiverReaders(!!values.onlyActive);
    setPage(0);
  };

  const openDeleteReaderDialogHandler = (id: string) => {
    setOpenDeleteReaderDialog(true);
    setSelectedReaderId(id);
  };

  const closeDeleteReaderDialogHandler = () => {
    setOpenDeleteReaderDialog(false);
  };

  const saveHandler = () => {
    page === 0 ? getData() : setPage(0);
  };

  const getData = async () => {
    try {
      const resp = await getReadersData({
        page,
        perPage,
        sortBy,
        sortOrder,
        q: searchReaderValue,
        onlyActive: showOnlyActiveReaders,
      });

      setReaders(resp.items);
      setTotalRows(resp.total);
    } catch (err) {}
    setSearchReaderLoading(false);
    setInitialLoading(false);
  };

  const goToEditReaderForm = (id: string) => {
    navigate(`${id}/edit`);
  };

  if (initialLoading) return <Loader />;

  return (
    <div className={styles.root}>
      <div className="page-header-with-button ">
        <h2>Czytelnicy</h2>
        <Button variant="contained" onClick={() => navigate("add")}>
          Dodaj czytelnika
        </Button>
      </div>
      <ReadersFilters loading={searchReaderLoading} onChangeValue={changeReaderFiltersHandler} />
      {readers.length === 0 ? (
        <p>Brak rekordów</p>
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="readers pagination table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <TabelSort
                    sortBy={sortBy}
                    sortOrder={sortOrder}
                    name="name"
                    label=" Nazwa"
                    onChangeSort={changeSort}
                  />
                </TableCell>
                <TableCell>Pesel</TableCell>
                <TableCell>Numer telefonu</TableCell>
                <TableCell>
                  <TabelSort
                    sortBy={sortBy}
                    sortOrder={sortOrder}
                    name="status"
                    label=" Status"
                    onChangeSort={changeSort}
                  />
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {readers.map((reader) => (
                <TableRow key={reader.id}>
                  <TableCell component="th" scope="row">
                    <div className="d-flex align-item-center">
                      <Avatar />
                      <div className="ms-3">
                        <div> {getFullName(reader)}</div>
                        <div>{reader.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{reader.pesel}</TableCell>
                  <TableCell>{reader.phoneNumber}</TableCell>
                  <TableCell>
                    {reader.disabled ? (
                      <Chip label="Nieaktywny" color="default" />
                    ) : (
                      <Chip label="Aktywny" color="success" />
                    )}
                  </TableCell>
                  <TableCell>
                    {!reader.disabled && (
                      <div className="d-flex justify-content-end">
                        <Tooltip title="Edytuj">
                          <IconButton
                            onClick={() => {
                              goToEditReaderForm(reader.id);
                            }}
                          >
                            <Icons.Edit />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Usuń">
                          <IconButton
                            onClick={() => {
                              openDeleteReaderDialogHandler(reader.id);
                            }}
                          >
                            <Icons.Delete />
                          </IconButton>
                        </Tooltip>
                      </div>
                    )}
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
      <DeleteReader
        open={openDeleteReaderDialog}
        readerId={selectedReaderId}
        onClose={closeDeleteReaderDialogHandler}
        onSave={saveHandler}
      />
    </div>
  );
};

export default ReadersTable;
