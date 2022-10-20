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

export type AddAssetsCategoryValues = {
  name: string;
};

export type AddAssetsAuthorValues = {
  firstName: string;
  lastName: string;
};
