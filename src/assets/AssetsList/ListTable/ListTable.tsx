import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableContainer,
  TableRow,
  TableCell,
  Paper,
  Tooltip,
  IconButton,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import * as Icons from "@mui/icons-material";

import TablePagination from "../../../common/components/TablePagination/TablePagination";
import { getAssetsListData } from "../../assets.api";
import { Asset } from "../../assets.types";
import Loader from "../../../common/components/Loader/Loader";
import { usePagination } from "../../../common/hooks/use-pagination";
import { getFullName } from "../../../common/utils/full-name";
import AssetTypeLabel from "../../AssetTypeLabel/AssetTypeLabel";
import DeleteAsset from "../../DeleteAsset/DeleteAsset";

const AssetsListTable = () => {
  const [initialLoading, setInitialLoading] = useState(true);
  const { page, rowsPerPage, totalRows, setPage, setRowsPerPage, setTotalRows } = usePagination();

  const [assetsList, setAssetsList] = useState<Asset[]>([]);
  const [selectedAssetId, setSelectedAssetId] = useState<string>();
  const [openDeleteAssetDialog, setOpenDeleteAssetDialog] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, [page, rowsPerPage]);

  const openDeleteAssetDialogHandler = (id: string) => {
    setOpenDeleteAssetDialog(true);
    setSelectedAssetId(id);
  };

  const closeDeleteAssetDialogHandler = () => {
    setOpenDeleteAssetDialog(false);
  };

  const saveHandler = () => {
    page === 0 ? getData() : setPage(0);
  };

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
    <>
      <TableContainer component={Paper}>
        <Table aria-label="assets-list pagination table">
          <TableHead>
            <TableRow>
              <TableCell>Tytuł</TableCell>
              <TableCell>Autor</TableCell>
              <TableCell>Typ</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assetsList.map((asset) => (
              <TableRow key={asset.id}>
                <TableCell component="th">
                  <Link to={`/assets/${asset.id}`}>{asset.title}</Link>
                </TableCell>
                <TableCell>{getFullName(asset.author)}</TableCell>
                <TableCell>
                  <AssetTypeLabel type={asset.type} />
                </TableCell>
                <TableCell scope="row" align="right">
                  <Tooltip title="Edytuj">
                    <IconButton onClick={() => navigate(`${asset.id}/edit`)}>
                      <Icons.Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Usuń">
                    <IconButton
                      onClick={() => {
                        openDeleteAssetDialogHandler(asset.id);
                      }}
                    >
                      <Icons.Delete />
                    </IconButton>
                  </Tooltip>
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
      <DeleteAsset
        open={openDeleteAssetDialog}
        assetId={selectedAssetId}
        onClose={closeDeleteAssetDialogHandler}
        onSave={saveHandler}
      />
    </>
  );
};

export default AssetsListTable;
