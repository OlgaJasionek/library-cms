import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";

import Loader from "../../../../common/components/Loader/Loader";
import TablePagination from "../../../../common/components/TablePagination/TablePagination";
import { usePagination } from "../../../../common/hooks/use-pagination";
import { getFullName } from "../../../../common/utils/full-name";
import { transformDate } from "../../../../common/utils/transform-date";
import { getUserAssetsRentals } from "../../../user-account.api";
import { UserAssetRental } from "../../../user-account.types";

const UserAssetsRentals = () => {
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [userRentals, setUserRentals] = useState<UserAssetRental[]>([]);
  const { page, rowsPerPage, totalRows, setRowsPerPage, setPage, setTotalRows } = usePagination();

  useEffect(() => {
    getData();
  }, [page, rowsPerPage]);

  const getData = async () => {
    try {
      const resp = await getUserAssetsRentals({ page, rowsPerPage });
      setTotalRows(resp.total);
      setUserRentals(resp.items);
    } catch (err) {}
    setInitialLoading(false);
  };

  if (initialLoading) return <Loader />;

  return (
    <>
      <TableContainer>
        <Table aria-label="readers pagination table">
          <TableHead>
            <TableRow>
              <TableCell>Tytuł i autor</TableCell>
              <TableCell>Nr.inwentarza</TableCell>
              <TableCell>Termin zwrotu</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userRentals.map((userRental) => (
              <TableRow key={userRental.copy.inventoryNumber}>
                <TableCell component="th" className="d-flex flex-column">
                  <span>{userRental.asset.title}</span>
                  <span className="text-secondary">{getFullName(userRental.asset.author)}</span>
                </TableCell>
                <TableCell>{userRental.copy.inventoryNumber}</TableCell>
                <TableCell>{userRental.expiredAt ? transformDate(userRental.expiredAt) : "-"}</TableCell>
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

export default UserAssetsRentals;
