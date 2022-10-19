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
} from "@mui/material";

import Loader from "../../../common/components/Loader/Loader";
import { getFullName } from "../../../common/utils/full-name";
import { Readers } from "../readers.types";
import TablePagination from "../../../common/components/TablePagination/TablePagination";
import { getReadersData } from "../../users.api";
import { usePagination } from "../../../common/hooks/use-pagination";

import styles from "./ReadersTable.module.scss";

const ReadersTable = () => {
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const { page, rowsPerPage, totalRows, setRowsPerPage, setPage, setTotalRows } = usePagination();

  const [readers, setReaders] = useState<Readers[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, [page, rowsPerPage]);

  const getData = async () => {
    try {
      const resp = await getReadersData({ page, rowsPerPage });
      setReaders(resp.items);
      setTotalRows(resp.total);
    } catch (err) {}
    setInitialLoading(false);
  };

  if (initialLoading) return <Loader />;

  return (
    <>
      <div className={styles.header}>
        <h2>Czytelnicy</h2>
        <Button variant="contained" onClick={() => navigate("add")}>
          Dodaj czytelnika
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table aria-label="readers pagination table">
          <TableHead>
            <TableRow>
              <TableCell>Nazwa</TableCell>
              <TableCell align="right">Pesel</TableCell>
              <TableCell align="right">Numer telefonu</TableCell>
              <TableCell align="right">Status</TableCell>
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
                <TableCell align="right">{reader.pesel}</TableCell>
                <TableCell align="right">{reader.phoneNumber}</TableCell>
                <TableCell align="right">
                  {reader.isActive ? (
                    <Chip label="Aktywny" color="success" />
                  ) : (
                    <Chip label="Nieaktywny" color="error" />
                  )}
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
    </>
  );
};

export default ReadersTable;
