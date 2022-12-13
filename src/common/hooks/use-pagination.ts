import { useState } from "react";

type PaginationValues = {
  page: number;
  rowsPerPage: number;
  totalRows: number;
  setPage: (value: number) => void;
  setRowsPerPage: (value: number) => void;
  setTotalRows: (value: number) => void;
};

export const usePagination = (): PaginationValues => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [totalRows, setTotalRows] = useState<number>(0);

  const _setRowsPerPage = (value: number) => {
    setPage(0);
    setRowsPerPage(value); 
  };

  return {
    page,
    rowsPerPage,
    totalRows,
    setPage,
    setRowsPerPage: _setRowsPerPage,
    setTotalRows,
  };
};
