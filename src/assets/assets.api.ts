import { PaginationParams } from "../common/types/pagination-params";
import http from "../core/api/http";
import { AddAssetsCategoryValues, AddAssetsAuthorValues, AssetsAuthor, AssetsCategory } from "./assets.types";

export const getAssetsCategoriesData = (
  params: PaginationParams
): Promise<{ items: AssetsCategory[]; total: number }> =>
  http
    .get("asset-categories", {
      params: {
        page: params.page + 1,
        perPage: params.rowsPerPage,
      },
    })
    .then((res) => res.data);

export const addAssetsCategory = (body: AddAssetsCategoryValues): Promise<void> =>
  http.post("asset-categories", body).then((res) => res.data);

export const getAssetsAuthorsData = (
  params: PaginationParams
): Promise<{ items: AssetsAuthor[]; total: number }> =>
  http
    .get("asset-authors", {
      params: {
        page: params.page + 1,
        perPage: params.rowsPerPage,
      },
    })
    .then((res) => res.data);

export const addAssetsAuthor = (body: AddAssetsAuthorValues): Promise<void> =>
  http.post("asset-authors", body).then((res) => res.data);
