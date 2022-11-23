import { PaginationParams } from "../common/types/pagination-params";
import { SelectOption } from "../common/types/select-option";
import http from "../core/api/http";
import {
  AssetsCategoryFormValues,
  AssetsAuthorFormValues,
  AssetsAuthor,
  AssetsCategory,
  Asset,
  AssetsFormValues,
  AssetsCopy,
  AssetRental,
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

export const addAssetsCategory = (body: AssetsCategoryFormValues): Promise<void> =>
  http.post("asset-categories", body).then((res) => res.data);

export const editAssetsCategory = (body: AssetsCategoryFormValues, categoryId: string): Promise<void> =>
  http.put(`/asset-categories/${categoryId}`, body);

export const deleteAssetsCategory = (categoryId: string): Promise<void> =>
  http.delete(`asset-categories/${categoryId}`);

export const getAllAssetsCategoriesValues = (): Promise<SelectOption[]> =>
  http.get("/asset-categories/all").then((res) => res.data);

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

export const addAssetsAuthor = (body: AssetsAuthorFormValues): Promise<void> =>
  http.post("asset-authors", body).then((res) => res.data);

export const editAssetsAuthor = (body: AssetsAuthorFormValues, authorId: string): Promise<void> =>
  http.put(`/asset-authors/${authorId}`, body);

export const deleteAssetsAuthor = (authorId: string): Promise<void> =>
  http.delete(`asset-authors/${authorId}`);

export const getAllAssetsAuthors = (): Promise<SelectOption[]> =>
  http.get("/asset-authors/all").then((res) => res.data);

export const getAssetsListData = (params: PaginationParams): Promise<{ items: Asset[]; total: number }> =>
  http
    .get("assets", {
      params: {
        page: params.page + 1,
        perPage: params.rowsPerPage,
      },
    })
    .then((res) => res.data);

export const addAsset = (body: AssetsFormValues): Promise<{ id: string }> =>
  http.post("/assets", { ...body, publicationYear: parseInt(body.publicationYear) }).then((res) => res.data);

export const editAsset = (body: AssetsFormValues, assetId: string): Promise<void> =>
  http.put(`assets/${assetId}`, { ...body, publicationYear: parseInt(body.publicationYear) });

export const deleteAsset = (assetId: string): Promise<void> => http.delete(`assets/${assetId} `);

export const addAssetCover = (formData: FormData): Promise<{ id: string }> =>
  http.post("assets/upload", formData).then((res) => res.data);

export const getAssetData = (id: string): Promise<Asset> => http.get(`assets/${id}`).then((res) => res.data);

export const addAssetCopy = (
  assetId: string,
  body: { isFreeAccess: boolean }
): Promise<{ data: AssetsCopy }> => http.post(`/assets/${assetId}/copies`, body);

export const getRentalsAssetsData = (
  params: PaginationParams
): Promise<{ items: AssetRental[]; total: number }> =>
  http
    .get("asset-rentals", {
      params: {
        page: params.page + 1,
        perPage: params.rowsPerPage,
      },
    })
    .then((res) => res.data);

export const returnCopy = (rentalId: string): Promise<{ data: AssetRental }> =>
  http.post(`/asset-rentals/${rentalId}/close`);

export const rentCopy = (copyId: string): Promise<{ data: AssetsCopy }> =>
  http.post(`/asset-copies/${copyId}/rentals`);

export const reserveCopy = (copyId: string): Promise<{ data: AssetsCopy }> =>
  http.post(`/asset-copies/${copyId}/reservations`);
