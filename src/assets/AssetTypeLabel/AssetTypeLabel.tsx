import * as Icons from "@mui/icons-material";

import { assetsTypesTranslations } from "../../common/utils/translations";
import { AssetsTypes } from "../assets.types";

type Props = {
  type: AssetsTypes;
};

const AssetTypeLabel = ({ type }: Props) => {
  switch (type) {
    case AssetsTypes.Book:
      return (
        <div className="d-flex">
          <Icons.AutoStories className="icon" />
          <span className="ms-2">{assetsTypesTranslations[type]}</span>
        </div>
      );
    case AssetsTypes.Magazine:
      return (
        <div className="d-flex">
          <Icons.Article className="icon" />
          <span className="ms-2">{assetsTypesTranslations[type]}</span>
        </div>
      );
    case AssetsTypes.Audiobook:
      return (
        <div className="d-flex">
          <Icons.Headphones className="icon" />
          <span className="ms-2">{assetsTypesTranslations[type]}</span>
        </div>
      );
      break;
  }
};

export default AssetTypeLabel;
