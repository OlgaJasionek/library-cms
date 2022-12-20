import { assetsStatusTranslations, assetsTypesTranslations } from "./translations";

const assetsTypes = Object.entries(assetsTypesTranslations);

export const assetsTypesValues = assetsTypes.map(([value, label]) => ({ value, label }));

const assetsStatus = Object.entries(assetsStatusTranslations);

export const assetsStatusValues = assetsStatus.map(([value, label]) => ({ value, label }));
