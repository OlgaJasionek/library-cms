export type AssetsCategory = {
  assetsCount: number;
  id: string;
  name: string;
};

export type AssetsAuthor = {
  assetsCount: number;
  firstName: string;
  id: string;
  lastName: string;
};

export type Asset = {
  author: {
    id: string;
    firstName: string;
    lastName: string;
  };
  authorId: string;
  categories: [
    {
      assetIds: string[];
      id: string;
      name: string;
    }
  ];
  categoryIds: string[];
  createdAt: string;
  description: string;
  id: string;
  image: {
    path: string;
  };
  isbn: string;
  lubimyczytacLink: string;
  publicationYear: number;
  publisher: string;
  title: string;
  type: AssetsTypes;
  updatedAt: string;
  copies: AssetCopy[];
};

export type AssetCopy = {
  activeReservationsCount: number;
  canRent: boolean;
  canReserve: boolean;
  id: string;
  inventoryNumber: string;
  isFreeAccess: boolean;
  isRent: boolean;
  rentExpiredAt: string | null;
  isRentByCurrentUser: boolean;
  isReservedByCurrentUser: boolean;
};

export type AddAssetsCategoryValues = {
  name: string;
};

export type AddAssetsAuthorValues = {
  firstName: string;
  lastName: string;
};

export enum AssetsTypes {
  Book = "BOOK",
  Audiobook = "AUDIOBOOK",
  Magazine = "MAGAZINE",
}

export type AddAssetFormValues = {
  imageId: string;
  authorId: string;
  categoryIds: string[];
  description: string;
  isbn: string;
  lubimyczytacLink: string;
  publicationYear: string;
  publisher: string;
  title: string;
  type: AssetsTypes;
};

export type AssetRental = {
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
  id: string;
  isReturned: boolean;
  returnedAt: string | null;
  user: {
    id: string;
    lastName: string;
    firstName: string;
  };
};
