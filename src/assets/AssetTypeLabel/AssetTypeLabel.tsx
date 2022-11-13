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
        <div>
          <Icons.AutoStories className="icon" />
          <span className="ms-2">{assetsTypesTranslations[type]}</span>
        </div>
      );
    case AssetsTypes.Magazine:
      return (
        <div>
          <Icons.Article className="icon" />
          <span className="ms-2">{assetsTypesTranslations[type]}</span>
        </div>
      );
    case AssetsTypes.Audiobook:
      return (
        <div>
          <Icons.Headphones className="icon" />
          <span className="ms-2">{assetsTypesTranslations[type]}</span>
        </div>
      );
      break;
  }
};

export default AssetTypeLabel;
