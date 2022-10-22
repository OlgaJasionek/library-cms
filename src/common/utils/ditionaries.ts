import { assetsTypesTranslations } from "./translations";

const assetsTypes = Object.entries(assetsTypesTranslations);

export const assetsTypesValues = assetsTypes.map(([value, label]) => ({ value, label }));
