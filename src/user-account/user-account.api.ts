import { PaginationParams } from "../common/types/pagination-params";
import http from "../core/api/http";
import { UserAssetRental, UserAssetReservation } from "./user-account.types";

export const getUserAssetsRentals = (
  params: PaginationParams
): Promise<{ items: UserAssetRental[]; total: number }> =>
  http
    .get("/asset-rentals/me", {
      params: { ...params, page: params.page + 1 },
    })
    .then((res) => res.data);

export const getUserAssetsReservations = (
  params: PaginationParams
): Promise<{ items: UserAssetReservation[]; total: number }> =>
  http
    .get("/asset-reservations/me", {
      params: { ...params, page: params.page + 1 },
    })
    .then((res) => res.data);
