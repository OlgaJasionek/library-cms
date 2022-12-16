import { useState } from "react";

type PaginationValues = {
  page: number;
  perPage: number;
  totalRows: number;
  setPage: (value: number) => void;
  setPerPage: (value: number) => void;
  setTotalRows: (value: number) => void;
};

export const usePagination = (): PaginationValues => {
  const [page, setPage] = useState<number>(0);
  const [perPage, setPerPage] = useState<number>(10);
  const [totalRows, setTotalRows] = useState<number>(0);

  const _setPerPage = (value: number) => {
    setPage(0);
    setPerPage(value);
  };

  return {
    page,
    perPage,
    totalRows,
    setPage,
    setPerPage: _setPerPage,
    setTotalRows,
  };
};
