import { useState } from "react";
import { SortOrder } from "../types/sort-params";

type SortValues = {
  sortBy: string;
  sortOrder: SortOrder;
  changeSort: (id: string) => void;
};

export const useSort = (): SortValues => {
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const changeSort = (id: string) => {
    const isAsc = sortBy === id && sortOrder === "asc";

    setSortBy(id);
    setSortOrder(isAsc ? "desc" : "asc");
  };

  return {
    sortBy,
    sortOrder,
    changeSort,
  };
};
