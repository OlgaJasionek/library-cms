import { FilterList as IconFilter } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import classnames from "classnames";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { UserRole } from "../../users/users.types";
import AssetsListTable from "./ListTable/ListTable";
import { usePagination } from "../../common/hooks/use-pagination";
import { Asset, AssetFilters } from "../assets.types";
import { getAllAssetsAuthors, getAllAssetsCategoriesValues, getAssetsListData } from "../assets.api";
import Loader from "../../common/components/Loader/Loader";
import FiltersPanel from "./FiltersPanel/FiltersPanel";
import { SelectOption } from "../../common/types/select-option";
import { useSort } from "../../common/hooks/use-sort";
import { selectCurrentUser } from "../../core/store/current-user";

const AssestsList = () => {
  const navigate = useNavigate();
  const [initialLoading, setInitialLoading] = useState(true);
  const { page, perPage, totalRows, setPage, setPerPage, setTotalRows } = usePagination();
  const { sortBy, sortOrder, changeSort } = useSort();
  const currentUser = useSelector(selectCurrentUser);

  const [assetsList, setAssetsList] = useState<Asset[]>([]);
  const [assetCategoriesList, setAssetCategoriesList] = useState<SelectOption[]>([]);
  const [assetAuthorsList, setAssetAuthorList] = useState<SelectOption[]>([]);

  const [openSideFilterPanel, setOpenSideFilterPanel] = useState<boolean>(false);
  const [searchAssetValueLoading, setSearchAssetValueLoading] = useState<boolean>(false);
  const [filters, setFilters] = useState<AssetFilters>({});

  useEffect(() => {
    getCategoriesList();
    getAuthorsList();
  }, []);

  useEffect(() => {
    getData();
  }, [page, perPage, sortBy, sortOrder, filters]);

  useEffect(() => {
    setSearchAssetValueLoading(true);
  }, [filters.title]);

  const saveHandler = () => {
    page === 0 ? getData() : setPage(0);
  };

  const toggleSideFilterPanel = () => {
    setOpenSideFilterPanel((prevState) => !prevState);
  };

  const closeSideFilterPanelHandler = () => {
    setOpenSideFilterPanel(false);
  };

  const getCategoriesList = async () => {
    try {
      const resp = await getAllAssetsCategoriesValues();
      setAssetCategoriesList(resp);
    } catch (err) {}
  };

  const getAuthorsList = async () => {
    try {
      const resp = await getAllAssetsAuthors();
      setAssetAuthorList(resp);
    } catch (err) {}
  };

  const changeAssetFiltersHandler = (values: AssetFilters) => {
    setFilters(values);
    setPage(0);
  };

  const getData = async () => {
    try {
      const resp = await getAssetsListData({
        page,
        perPage,
        sortBy,
        sortOrder,
        ...filters,
      });
      setAssetsList(resp.items);
      setTotalRows(resp.total);
      setSearchAssetValueLoading(false);
    } catch (err) {}
    setInitialLoading(false);
  };

  if (initialLoading) {
    return <Loader />;
  }

  return (
    <div className="d-flex">
      <FiltersPanel
        open={openSideFilterPanel}
        categories={assetCategoriesList}
        authors={assetAuthorsList}
        loading={searchAssetValueLoading}
        onCloseSidePanel={closeSideFilterPanelHandler}
        onChangeValue={changeAssetFiltersHandler}
      />
      <div
        className={classnames("wrapper-with-side-panel", {
          "wrapper-with-side-panel--open": openSideFilterPanel,
        })}
      >
        <div className="page-header-with-button">
          <h2>Katalog książek</h2>
          <div>
            <Button className="me-2" variant="outlined" onClick={toggleSideFilterPanel}>
              Filtry <IconFilter />
            </Button>
            {currentUser?.role === UserRole.Librarian && (
              <Button variant="contained" onClick={() => navigate("/assets/add")}>
                Dodaj książkę
              </Button>
            )}
          </div>
        </div>
        {assetsList.length === 0 ? (
          <p>Brak rekordów</p>
        ) : (
          <AssetsListTable
            assetsList={assetsList}
            page={page}
            perPage={perPage}
            totalRows={totalRows}
            sortBy={sortBy}
            sortOrder={sortOrder}
            setPage={setPage}
            setPerPage={setPerPage}
            onSave={saveHandler}
            onChangeSort={changeSort}
          />
        )}
      </div>
    </div>
  );
};

export default AssestsList;
