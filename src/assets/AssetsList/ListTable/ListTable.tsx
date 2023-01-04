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
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import * as Icons from "@mui/icons-material";
import { useSelector } from "react-redux";

import TablePagination from "../../../common/components/TablePagination/TablePagination";
import { Asset } from "../../assets.types";
import { getFullName } from "../../../common/utils/full-name";
import AssetTypeLabel from "../../AssetTypeLabel/AssetTypeLabel";
import DeleteAsset from "../../DeleteAsset/DeleteAsset";
import { SortOrder } from "../../../common/types/sort-params";
import TabelSort from "../../../common/components/TabelSort/TabelSort";
import { selectCurrentUser } from "../../../core/store/current-user";
import { UserRole } from "../../../users/users.types";

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
  const currentUser = useSelector(selectCurrentUser);
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
                <TabelSort
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  name="title"
                  label=" Tytuł"
                  onChangeSort={onChangeSort}
                />
              </TableCell>
              <TableCell>
                <TabelSort
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  name="author"
                  label=" Autor"
                  onChangeSort={onChangeSort}
                />
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
                {currentUser?.role === UserRole.Librarian && (
                  <TableCell>
                    <div className="d-flex justify-content-end">
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
                    </div>
                  </TableCell>
                )}
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
