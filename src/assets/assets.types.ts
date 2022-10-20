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
  imageUrl: string;
  isbn: string;
  lubimyczytacLink: string;
  publicationYear: number;
  publisher: string;
  title: string;
  type: AssetsTypes;
  updatedAt: string;
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
