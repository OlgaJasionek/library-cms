import { PaginationParams } from "../common/types/pagination-params";
import http from "../core/api/http";
import { AddAssetCategoryValue, AssetCategory } from "./assets.types";

export const getAssetsCategoriesData = (
  params: PaginationParams
): Promise<{ items: AssetCategory[]; total: number }> =>
  http
    .get("asset-categories", {
      params: {
        page: params.page + 1,
        perPage: params.rowsPerPage,
      },
    })
    .then((res) => res.data);

export const addAssetCategory = (body: AddAssetCategoryValue): Promise<void> =>
  http.post("asset-categories", body).then((res) => res.data);
