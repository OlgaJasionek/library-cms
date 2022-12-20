import { TableSortLabel } from "@mui/material";
import { SortOrder } from "../../types/sort-params";

type Props = {
  sortBy: string;
  sortOrder: SortOrder;
  name: string;
  label: string;
  onChangeSort: (id: string) => void;
};

const TabelSort = ({ sortBy, sortOrder, onChangeSort, name, label }: Props) => {
  return (
    <TableSortLabel
      active={name === sortBy}
      direction={name === sortBy ? sortOrder : "asc"}
      onClick={() => {
        onChangeSort(name);
      }}
    >
      {label}
    </TableSortLabel>
  );
};

export default TabelSort;
