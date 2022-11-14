export type UserAssetRental = {
  asset: {
    id: string;
    title: string;
    author: {
      firstName: string;
      lastName: string;
    };
  };
  copy: {
    id: string;
    inventoryNumber: string;
  };
  createdAt: string;
  expiredAt: string | null;
  isReturned: boolean;
  returnedAt: string | null;
};

export type UserAssetReservation = {
  asset: {
    id: string;
    title: string;
    author: {
      firstName: string;
      lastName: string;
    };
  };
  copy: {
    id: string;
    inventoryNumber: string;
  };
  activeReservationsBefore: number;
  canRent: boolean;
  expiredAt: string | null;
};
