import { PaginationParams } from "../common/types/pagination-params";
import { SelectOption } from "../common/types/select-option";
import http from "../core/api/http";
import {
  AddAssetsCategoryValues,
  AddAssetsAuthorValues,
  AssetsAuthor,
  AssetsCategory,
  Asset,
  AddAssetFormValues,
  AssetCopy,
} from "./assets.types";

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

export const getAssetsListData = (params: PaginationParams): Promise<{ items: Asset[]; total: number }> =>
  http
    .get("assets", {
      params: {
        page: params.page + 1,
        perPage: params.rowsPerPage,
      },
    })
    .then((res) => res.data);

export const getAllAssetsAuthors = (): Promise<SelectOption[]> =>
  http.get("/asset-authors/all").then((res) => res.data);

export const addAssetCover = (formData: FormData): Promise<{ id: string }> =>
  http.post("assets/upload", formData).then((res) => res.data);

export const getAllCategoriesValues = (): Promise<SelectOption[]> =>
  http.get("/asset-categories/all").then((res) => res.data);

export const addAsset = (body: AddAssetFormValues): Promise<{ id: string }> =>
  http.post("/assets", { ...body, publicationYear: parseInt(body.publicationYear) }).then((res) => res.data);

export const getAssetData = (id: string): Promise<Asset> => http.get(`assets/${id}`).then((res) => res.data);

export const addAssetCopy = (
  assetId: string,
  body: { isFreeAccess: boolean }
): Promise<{ data: AssetCopy }> => http.post(`/assets/${assetId}/copies`, body);

export const rentCopy = (copyId: string): Promise<{ data: AssetCopy }> =>
  http.post(`/asset-copies/${copyId}/rentals`);

export const reserveCopy = (copyId: string): Promise<{ data: AssetCopy }> =>
  http.post(`/asset-copies/${copyId}/reservations`);
