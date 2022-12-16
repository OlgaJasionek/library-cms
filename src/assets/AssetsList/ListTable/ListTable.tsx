import { useState } from "react";
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
  TableSortLabel,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import * as Icons from "@mui/icons-material";

import TablePagination from "../../../common/components/TablePagination/TablePagination";
import { Asset } from "../../assets.types";
import { getFullName } from "../../../common/utils/full-name";
import AssetTypeLabel from "../../AssetTypeLabel/AssetTypeLabel";
import DeleteAsset from "../../DeleteAsset/DeleteAsset";
import { SortOrder } from "../../../common/types/sort-params";

type Props = {
  assetsList: Asset[];
  page: number;
  perPage: number;
  totalRows: number;
  sortBy: string;
  sortOrder: SortOrder;
  onChangeSort: (id: string) => void;
  onSave: () => void;
  setPage: (value: number) => void;
  setPerPage: (value: number) => void;
};

const AssetsListTable = ({
  assetsList,
  page,
  perPage,
  totalRows,
  sortBy,
  sortOrder,
  onChangeSort,
  onSave,
  setPage,
  setPerPage,
}: Props) => {
  const [selectedAssetId, setSelectedAssetId] = useState<string>();
  const [openDeleteAssetDialog, setOpenDeleteAssetDialog] = useState<boolean>(false);
  const navigate = useNavigate();

  const openDeleteAssetDialogHandler = (id: string) => {
    setOpenDeleteAssetDialog(true);
    setSelectedAssetId(id);
  };

  const closeDeleteAssetDialogHandler = () => {
    setOpenDeleteAssetDialog(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="assets-list pagination table">
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={"title" === sortBy}
                  direction={"title" === sortBy ? sortOrder : "asc"}
                  onClick={() => {
                    onChangeSort("title");
                  }}
                >
                  Tytuł
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={"author" === sortBy}
                  direction={"author" === sortBy ? sortOrder : "asc"}
                  onClick={() => {
                    onChangeSort("author");
                  }}
                >
                  Autor
                </TableSortLabel>
              </TableCell>
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
            perPage={perPage}
            totalRows={totalRows}
            onPageChange={setPage}
            onPerPageChange={setPerPage}
          />
        </Table>
      </TableContainer>
      <DeleteAsset
        open={openDeleteAssetDialog}
        assetId={selectedAssetId}
        onClose={closeDeleteAssetDialogHandler}
        onSave={onSave}
      />
    </>
  );
};

export default AssetsListTable;
