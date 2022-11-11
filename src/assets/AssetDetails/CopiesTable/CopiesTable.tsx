import { Check } from "@mui/icons-material";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState } from "react";

import Card from "../../../common/components/Card/Card";
import { transformDate } from "../../../common/utils/transform-date";
import { AssetCopy } from "../../assets.types";
import AddCopyDialog from "./AddCopyDialog/AddCopyDialog";
import RentCopyDialog from "./RentCopyDialog/RentCopyDialog";
import ReserveCopyDialog from "./ReserveCopyDialog/ReserveCopyDialog";

type Props = {
  copies: AssetCopy[];
};

const CopiesTable = ({ copies }: Props) => {
  const [openAddCopyDialog, setOpenAddCopyDialog] = useState<boolean>(false);
  const [openRentCopyDialog, setOpenRentCopyDialog] = useState<boolean>(false);
  const [openReserveCopyDialog, setOpenReserveCopyDialog] = useState<boolean>(false);
  const [displayCopies, setDisplayCopies] = useState<AssetCopy[]>(copies);
  const [choosenCopyId, setChoosenCopyId] = useState<string>();

  const closeReserveCopyDialogHandler = () => {
    setOpenReserveCopyDialog(false);
  };

  const openReserveCopyDialogHandler = (id: string) => {
    setOpenReserveCopyDialog(true);
    setChoosenCopyId(id);
  };

  const closeRentCopyDialogHandler = () => {
    setOpenRentCopyDialog(false);
  };

  const openRentCopyDialogHandler = (id: string) => {
    setOpenRentCopyDialog(true);
    setChoosenCopyId(id);
  };

  const changeCopiesHandler = (data: AssetCopy) => {
    const copiesWithChangedCopy = displayCopies.map((copy) => (copy.id === data.id ? data : copy));
    setDisplayCopies(copiesWithChangedCopy);
  };

  const openAddCopyDialogHandler = () => {
    setOpenAddCopyDialog(true);
  };

  const closeAddCopyDialogHandler = () => {
    setOpenAddCopyDialog(false);
  };

  const addNewCopyHandler = (item: AssetCopy) => {
    return setDisplayCopies((prevState) => [...prevState, item]);
  };

  const showStatusInfo = (copy: AssetCopy) => {
    if (copy.isFreeAccess) {
      return <div>Wolny dostęp</div>;
    } else if (copy.isRent) {
      return (
        <div className="d-flex flex-column">
          <span>Wypożyczona</span>
          {copy.rentExpiredAt && (
            <span className="text-secondary">Termin zwrotu: {transformDate(copy.rentExpiredAt)}</span>
          )}
        </div>
      );
    } else if (copy.canRent || copy.canReserve) {
      return <div>Dostępny</div>;
    }
  };

  const showUserAccess = (copy: AssetCopy) => {
    if (copy.canRent) {
      return (
        <Button
          onClick={() => {
            openRentCopyDialogHandler(copy.id);
          }}
          variant="contained"
        >
          Wypożycz
        </Button>
      );
    } else if (copy.canReserve) {
      return (
        <Button
          onClick={() => {
            openReserveCopyDialogHandler(copy.id);
          }}
          variant="contained"
        >
          Zarezerwuj
        </Button>
      );
    } else if (copy.isRentByCurrentUser) {
      return (
        <div className="text-secondary">
          <span>Wypożyczyłeś/aś</span> <Check className="mb-2" />
        </div>
      );
    } else if (copy.isReservedByCurrentUser) {
      return (
        <div className="text-secondary ">
          <span>Zarezerwowałeś/aś </span>
          <Check className="mb-2" />
        </div>
      );
    }
  };

  return (
    <>
      <Card>
        <div className="d-flex justify-content-between align-items-center">
          <h3>Dokumenty przeznaczone do wypożyczenia: ({displayCopies.length})</h3>
          <Button variant="contained" onClick={openAddCopyDialogHandler}>
            Dodaj egzemplarz
          </Button>
        </div>
        {displayCopies.length ? (
          <div className="mt-4">
            <TableContainer component={Paper}>
              <Table aria-label="assets-list pagination table">
                <TableHead>
                  <TableRow>
                    <TableCell>Nr inwentarza</TableCell>
                    <TableCell align="right">Ilość rezerwacji</TableCell>
                    <TableCell align="right">Status</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {displayCopies.map((copy) => (
                    <TableRow key={copy.id}>
                      <TableCell component="th">{copy.inventoryNumber}</TableCell>
                      <TableCell align="right">{copy.activeReservationsCount}</TableCell>
                      <TableCell align="right">{showStatusInfo(copy)}</TableCell>
                      <TableCell align="right">{showUserAccess(copy)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ) : (
          <span className="text-secondary">Brak dostępnych egzemplarzy</span>
        )}
      </Card>
      <AddCopyDialog
        open={openAddCopyDialog}
        onClose={closeAddCopyDialogHandler}
        onAddCopy={addNewCopyHandler}
      />
      <RentCopyDialog
        open={openRentCopyDialog}
        copyId={choosenCopyId}
        onClose={closeRentCopyDialogHandler}
        onRent={changeCopiesHandler}
      />
      <ReserveCopyDialog
        open={openReserveCopyDialog}
        copyId={choosenCopyId}
        onClose={closeReserveCopyDialogHandler}
        onReserve={changeCopiesHandler}
      />
    </>
  );
};

export default CopiesTable;
