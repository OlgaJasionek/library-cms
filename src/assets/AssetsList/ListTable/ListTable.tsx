import { useEffect, useState } from "react";
import { Table, TableBody, TableHead, TableContainer, TableRow, TableCell, Paper } from "@mui/material";
import { Link } from "react-router-dom";

import TablePagination from "../../../common/components/TablePagination/TablePagination";
import { getAssetsListData } from "../../assets.api";
import { Asset } from "../../assets.types";
import Loader from "../../../common/components/Loader/Loader";
import { usePagination } from "../../../common/hooks/use-pagination";
import { getFullName } from "../../../common/utils/full-name";
import AssetTypeLabel from "../../AssetTypeLabel/AssetTypeLabel";

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
              <TableCell component="th">
                <Link to={`/assets/${asset.id}`}>{asset.title}</Link>
              </TableCell>
              <TableCell align="right">{getFullName(asset.author)}</TableCell>
              <TableCell align="right">
                <AssetTypeLabel type={asset.type} />
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
  );
};

export default AssetsListTable;
