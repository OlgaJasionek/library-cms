import { TableFooter, TablePagination as Pagination, TableRow } from "@mui/material";

import TablePaginationActions from "./Actions/Actions.module";
type Props = {
  totalRows: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (value: number) => void;
  onPerPageChange: (value: number) => void;
};

const TablePagination = (props: Props) => {
  const { page, rowsPerPage, totalRows, onPageChange, onPerPageChange } = props;

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    onPageChange(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onPerPageChange(parseInt(event.target.value, 10));
  };

  return (
    <TableFooter>
      <TableRow>
        <Pagination
          rowsPerPageOptions={[10, 25, 50]}
          count={totalRows}
          rowsPerPage={rowsPerPage}
          page={page}
          SelectProps={{
            inputProps: {
              "aria-label": "rows per page",
            },
            native: true,
          }}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
        ></Pagination>
      </TableRow>
    </TableFooter>
  );
};

export default TablePagination;
