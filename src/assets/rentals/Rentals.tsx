import { FilterList as IconFilter } from "@mui/icons-material";
import { Button } from "@mui/material";
import classnames from "classnames";
import { useEffect, useState } from "react";

import Loader from "../../common/components/Loader/Loader";
import { useDocumentTitle } from "../../common/hooks/use-document-title";
import { usePagination } from "../../common/hooks/use-pagination";
import { useSort } from "../../common/hooks/use-sort";
import { getRentalsAssetsData } from "../assets.api";
import { AssetRental, RentalsFilters } from "../assets.types";
import RentalsFilterPanel from "./FilterPanel/FilterPanel";
import AssetsRentalsTable from "./RentalsTable/RentalsTable";

const AssetsRentals = () => {
  const { page, perPage, totalRows, setPage, setPerPage, setTotalRows } = usePagination();
  const { sortBy, sortOrder, changeSort } = useSort();

  const [rentals, setRentals] = useState<AssetRental[]>([]);
  const [openFilterPanel, setOpenFilterPanel] = useState<boolean>(false);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState<RentalsFilters>();
  const [setDocumentTitle] = useDocumentTitle();

  useEffect(() => {
    setDocumentTitle("Wypożyczenia");
  }, []);

  useEffect(() => {
    getData();
  }, [page, perPage, sortBy, sortOrder, filters]);

  const getData = async () => {
    try {
      const resp = await getRentalsAssetsData({ page, perPage, sortBy, sortOrder, ...filters });
      setRentals(resp.items);
      setTotalRows(resp.total);
    } catch (err) {}
    setInitialLoading(false);
  };

  const changeRentalsHandler = (data: AssetRental) => {
    const rentalsWithReturnedCopy = rentals.map((rental) => (rental.id === data.id ? data : rental));
    setRentals(rentalsWithReturnedCopy);
  };

  const toggleSideFilterPanel = () => {
    setOpenFilterPanel((prevState) => !prevState);
  };

  const closeSideFilterPanel = () => {
    setOpenFilterPanel(false);
  };

  const changeRentalsFilterHandler = (values: any) => {
    setFilters(values);
    setPage(0);
  };

  if (initialLoading) {
    return <Loader />;
  }

  return (
    <div>
      <RentalsFilterPanel
        open={openFilterPanel}
        loading={false}
        onCloseSidePanel={closeSideFilterPanel}
        onChangeValue={changeRentalsFilterHandler}
      />
      <div
        className={classnames("wrapper-with-side-panel", {
          "wrapper-with-side-panel--open": openFilterPanel,
        })}
      >
        <div className="page-header-with-button ">
          <h2>Lista wypożyczeń</h2>
          <Button className="me-2" variant="outlined" onClick={toggleSideFilterPanel}>
            Filtry <IconFilter />
          </Button>
        </div>
        <AssetsRentalsTable
          page={page}
          rentals={rentals}
          perPage={perPage}
          totalRows={totalRows}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onReturnRental={changeRentalsHandler}
          setPage={setPage}
          setPerPage={setPerPage}
          onChangeSort={changeSort}
        />
      </div>
    </div>
  );
};

export default AssetsRentals;
