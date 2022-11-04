import * as Icons from "@mui/icons-material";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

import Card from "../../../common/components/Card/Card";
import { Asset, AssetCopy } from "../../assets.types";

type Props = {
  assetData: Asset;
};

const CopiesTable = ({ assetData }: Props) => {
  const showAccessInfo = ({ isFreeAccess, canRent }: AssetCopy) => {
    if (isFreeAccess) {
      return <div className="text-info">Wolny dostęp</div>;
    } else if (!isFreeAccess && canRent) {
      return (
        <div className="text-success">
          <Icons.Check />
          Dostępny
        </div>
      );
    } else if (!isFreeAccess && !canRent) {
      return (
        <div className="text-danger">
          <Icons.Close />
          Niedostępny
        </div>
      );
    }
  };

  return (
    <Card>
      <h3>Dokumenty przeznaczone do wypożyczenia({assetData.copies.length})</h3>
      {assetData.copies.length ? (
        <div className="mt-4">
          <TableContainer component={Paper}>
            <Table aria-label="assets-list pagination table">
              <TableHead>
                <TableRow>
                  <TableCell>Nr inwentarza</TableCell>
                  <TableCell align="right">Ilość rezerwacji</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {assetData.copies.map((copy) => (
                  <TableRow key={copy.id}>
                    <TableCell component="th">{copy.inventoryNumber}</TableCell>
                    <TableCell align="right">0</TableCell>
                    <TableCell align="right">{showAccessInfo(copy)}</TableCell>
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
  );
};

export default CopiesTable;
