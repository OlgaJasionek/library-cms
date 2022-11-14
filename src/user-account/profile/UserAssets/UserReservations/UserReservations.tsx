import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";

import RentCopyDialog from "../../../../assets/AssetDetails/CopiesTable/RentCopyDialog/RentCopyDialog";
import Loader from "../../../../common/components/Loader/Loader";
import TablePagination from "../../../../common/components/TablePagination/TablePagination";
import { usePagination } from "../../../../common/hooks/use-pagination";
import { getFullName } from "../../../../common/utils/full-name";
import { getUserAssetsReservations } from "../../../user-account.api";
import { UserAssetReservation } from "../../../user-account.types";

const UserAssetsReservations = () => {
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [userReservations, setUserReservations] = useState<UserAssetReservation[]>([]);
  const [openRentCopyDialog, setOpenRentCopyDialog] = useState<boolean>(false);
  const { page, rowsPerPage, totalRows, setRowsPerPage, setPage, setTotalRows } = usePagination();
  const [choosenCopyId, setChoosenCopyId] = useState<string>();

  useEffect(() => {
    getData();
  }, [page, rowsPerPage]);

  const getData = async () => {
    try {
      const resp = await getUserAssetsReservations({ page, rowsPerPage });
      setTotalRows(resp.total);
      setUserReservations(resp.items);
    } catch (err) {}
    setInitialLoading(false);
  };

  const closeRentCopyDialogHandler = () => {
    setOpenRentCopyDialog(false);
  };

  const openRentCopyDialogHandler = (id: string) => {
    setOpenRentCopyDialog(true);
    setChoosenCopyId(id);
  };

  const showReservationInfo = (activeReservationsBefore: number) => {
    if (activeReservationsBefore === 0) {
      return <span>Oczekujesz na zwrot egzemplarza</span>;
    } else {
      <span>Oczekujące rezerwacje: {activeReservationsBefore}</span>;
    }
  };

  const rentReservationCopy = () => {
    getData();
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
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userReservations.map((userReservation) => (
              <TableRow key={userReservation.copy.inventoryNumber}>
                <TableCell component="th" className="d-flex flex-column">
                  <span>{userReservation.asset.title}</span>
                  <span className="text-secondary">{getFullName(userReservation.asset.author)}</span>
                </TableCell>
                <TableCell>{userReservation.copy.inventoryNumber}</TableCell>
                <TableCell align="right">
                  {userReservation.canRent ? (
                    <Button
                      variant="contained"
                      onClick={() => {
                        openRentCopyDialogHandler(userReservation.copy.id);
                      }}
                    >
                      Wypożycz
                    </Button>
                  ) : (
                    showReservationInfo(userReservation.activeReservationsBefore)
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
      <RentCopyDialog
        open={openRentCopyDialog}
        copyId={choosenCopyId}
        onClose={closeRentCopyDialogHandler}
        onRent={rentReservationCopy}
      />
    </>
  );
};

export default UserAssetsReservations;
