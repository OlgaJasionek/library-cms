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
import { getAssetsListData } from "../../assets.api";
import { Asset } from "../../assets.types";
import Loader from "../../../common/components/Loader/Loader";
import { usePagination } from "../../../common/hooks/use-pagination";
import { getFullName } from "../../../common/utils/full-name";
import { assetsTypesTranslations } from "../../../common/utils/translations";

const AssetsListTable = () => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [assetsList, setAssetsList] = useState<Asset[]>([]);
  const { page, rowsPerPage, totalRows, setPage, setRowsPerPage, setTotalRows } = usePagination();

  useEffect(() => {
    getData();
  }, [page, rowsPerPage]);

  const getData = async () => {
    try {
      const resp = await getAssetsListData({ page, rowsPerPage });
      setAssetsList(resp.items);
      setTotalRows(resp.total);
    } catch (err) {}
    setInitialLoading(false);
  };

  if (initialLoading) {
    return <Loader />;
  }

  return (
    <div className="container--md">
      <div className="page-header-with-button">
        <h2>Katalog książek</h2>
        <Button variant="contained">Dodaj książkę</Button>
      </div>
      <TableContainer component={Paper}>
        <Table aria-label="assets-list pagination table">
          <TableHead>
            <TableRow>
              <TableCell>Tytuł</TableCell>
              <TableCell align="right">Autor</TableCell>
              <TableCell align="right">Typ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assetsList.map((asset) => (
              <TableRow key={asset.id}>
                <TableCell component="th">{asset.title}</TableCell>
                <TableCell align="right">{getFullName(asset.author)}</TableCell>
                <TableCell align="right">{assetsTypesTranslations[asset.type]}</TableCell>
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
    </div>
  );
};

export default AssetsListTable;
