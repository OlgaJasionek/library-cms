import { useState } from "react";
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
import { AssetRental } from "../../assets.types";
import { getFullName } from "../../../common/utils/full-name";
import { transformDate } from "../../../common/utils/transform-date";
import ReturnCopyDialog from "../ReturnCopy/ReturnCopyDialog";
import { SortOrder } from "../../../common/types/sort-params";
import TabelSort from "../../../common/components/TabelSort/TabelSort";

type Props = {
  rentals: AssetRental[];
  page: number;
  perPage: number;
  totalRows: number;
  sortBy: string;
  sortOrder: SortOrder;
  onChangeSort: (id: string) => void;
  setPage: (value: number) => void;
  setPerPage: (value: number) => void;
  onReturnRental: (data: AssetRental) => void;
};

const AssetsRentalsTable = ({
  rentals,
  page,
  perPage,
  totalRows,
  sortBy,
  sortOrder,
  onChangeSort,
  setPage,
  setPerPage,
  onReturnRental,
}: Props) => {
  const [choosenItemId, setChoosenItemId] = useState<string>();
  const [openReturnCopyDialog, setOpenReturnCopyDialog] = useState<boolean>(false);

  const closeReturnCopyDialogHandler = () => {
    setOpenReturnCopyDialog(false);
  };

  const openReturnCopyDialogHandler = (id: string) => {
    setOpenReturnCopyDialog(true);
    setChoosenItemId(id);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="rentals pagination table">
          <TableHead>
            <TableRow>
              <TableCell>
                <TabelSort
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  name="title"
                  label="Tytuł i autor"
                  onChangeSort={onChangeSort}
                />
              </TableCell>
              <TableCell>
                <TabelSort
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  name="inventoryNumber"
                  label=" Nr inwentarza "
                  onChangeSort={onChangeSort}
                />
              </TableCell>
              <TableCell>
                <TabelSort
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  name="user"
                  label=" Czytelnik"
                  onChangeSort={onChangeSort}
                />
              </TableCell>
              <TableCell>
                <TabelSort
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  name="createdAt"
                  label="Data wypożyczenia"
                  onChangeSort={onChangeSort}
                />
              </TableCell>
              <TableCell>
                <TabelSort
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  name="expiredAt"
                  label="Data końca wypożyczenia"
                  onChangeSort={onChangeSort}
                />
              </TableCell>
              <TableCell>
                <TabelSort
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  name="returnedAt"
                  label="Data zwrotu"
                  onChangeSort={onChangeSort}
                />
              </TableCell>
              <TableCell>
                <TabelSort
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  name="isReturned"
                  label="Status"
                  onChangeSort={onChangeSort}
                />
              </TableCell>
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
        onReturn={onReturnRental}
      />
    </>
  );
};

export default AssetsRentalsTable;
