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
import * as Icons from "@mui/icons-material";

import TablePagination from "../../../common/components/TablePagination/TablePagination";
import { getAssetsCategoriesData } from "../../assets.api";
import { AssetCategory } from "../../assets.types";
import Loader from "../../../common/components/Loader/Loader";
import { usePagination } from "../../../common/hooks/use-pagination";

const AssetsCategoriesTable = () => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [categories, setCategories] = useState<AssetCategory[]>([]);
  const { page, rowsPerPage, totalRows, setPage, setRowsPerPage, setTotalRows } = usePagination();

  useEffect(() => {
    getData();
  }, [page, rowsPerPage]);

  const getData = async () => {
    try {
      const resp = await getAssetsCategoriesData({ page, rowsPerPage });
      setCategories(resp.items);
      setTotalRows(resp.total);
    } catch (err) {}
    setInitialLoading(false);
  };

  if (initialLoading) {
    return <Loader />;
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="categories pagination table">
        <TableHead>
          <TableRow>
            <TableCell>Nazwa</TableCell>
            <TableCell align="right">Ilość przypisanych</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell component="th">{category.name}</TableCell>
              <TableCell align="right">{category.assetsCount}</TableCell>
              <TableCell align="right" scope="row">
                <Tooltip title="Edytuj">
                  <IconButton>
                    <Icons.Edit />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Usuń">
                  <IconButton>
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
  );
};

export default AssetsCategoriesTable;
