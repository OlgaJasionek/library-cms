import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableContainer,
  TableRow,
  TableCell,
  Paper,
  Button,
} from "@mui/material";

import TablePagination from "../../../common/components/TablePagination/TablePagination";
import Loader from "../../../common/components/Loader/Loader";
import { usePagination } from "../../../common/hooks/use-pagination";
import { getRentalsAssetsData } from "../../assets.api";
import { AssetRental } from "../../assets.types";
import { getFullName } from "../../../common/utils/full-name";
import { transformDate } from "../../../common/utils/transform-date";
import ReturnCopyDialog from "../ReturnCopy/ReturnCopyDialog";

const AssetsRentalsTable = () => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [rentals, setRentals] = useState<AssetRental[]>([]);
  const { page, perPage, totalRows, setPage, setPerPage, setTotalRows } = usePagination();
  const [choosenItemId, setChoosenItemId] = useState<string>();
  const [openReturnCopyDialog, setOpenReturnCopyDialog] = useState<boolean>(false);

  useEffect(() => {
    getData();
  }, [page, perPage]);

  const getData = async () => {
    try {
      const resp = await getRentalsAssetsData({ page, perPage });
      setRentals(resp.items);
      setTotalRows(resp.total);
    } catch (err) {}
    setInitialLoading(false);
  };

  const closeReturnCopyDialogHandler = () => {
    setOpenReturnCopyDialog(false);
  };

  const openReturnCopyDialogHandler = (id: string) => {
    setOpenReturnCopyDialog(true);
    setChoosenItemId(id);
  };

  const changeRentalsHandler = (data: AssetRental) => {
    const rentalsWithReturnedCopy = rentals.map((rental) => (rental.id === data.id ? data : rental));
    setRentals(rentalsWithReturnedCopy);
  };

  if (initialLoading) {
    return <Loader />;
  }

  return (
    <div className="container">
      <div className="page-header-with-link ">
        <h2>Lista wypożyczeń</h2>
      </div>
      <TableContainer component={Paper}>
        <Table aria-label="rentals pagination table">
          <TableHead>
            <TableRow>
              <TableCell>Tytuł i autor</TableCell>
              <TableCell>Nr. inwentarza</TableCell>
              <TableCell>Czytelnik</TableCell>
              <TableCell>Data wypożyczenia</TableCell>
              <TableCell>Data końca wypożyczenia</TableCell>
              <TableCell>Data zwrotu</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rentals.map((rental) => (
              <TableRow key={rental.id}>
                <TableCell component="th" className="d-flex flex-column">
                  <span>{rental.asset.title}</span>
                  <span className="text-secondary font-italic">{getFullName(rental.asset.author)}</span>
                </TableCell>
                <TableCell>{rental.copy.inventoryNumber}</TableCell>
                <TableCell>{getFullName(rental.user)}</TableCell>
                <TableCell>{rental.createdAt ? transformDate(rental.createdAt) : null}</TableCell>
                <TableCell>{rental.expiredAt ? transformDate(rental.expiredAt) : null}</TableCell>
                <TableCell>{rental.returnedAt ? transformDate(rental.returnedAt) : "-"}</TableCell>
                <TableCell>
                  {rental.isReturned ? (
                    <span>Zwrócona</span>
                  ) : (
                    <Button
                      onClick={() => {
                        openReturnCopyDialogHandler(rental.id);
                      }}
                      variant="contained"
                    >
                      Zwróć
                    </Button>
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
      <ReturnCopyDialog
        open={openReturnCopyDialog}
        rentalId={choosenItemId}
        onClose={closeReturnCopyDialogHandler}
        onReturn={changeRentalsHandler}
      />
    </div>
  );
};

export default AssetsRentalsTable;
