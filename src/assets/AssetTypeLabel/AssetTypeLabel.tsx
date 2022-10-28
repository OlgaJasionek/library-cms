import { Article, AutoStories, Headphones } from "@mui/icons-material";

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
          <AutoStories />
          <span className="ms-2">{assetsTypesTranslations[type]}</span>
        </div>
      );
    case AssetsTypes.Magazine:
      return (
        <div>
          <Article />
          <span className="ms-2">{assetsTypesTranslations[type]}</span>
        </div>
      );
    case AssetsTypes.Audiobook:
      return (
        <div>
          <Headphones />
          <span className="ms-2">{assetsTypesTranslations[type]}</span>
        </div>
      );
      break;
  }
};

export default AssetTypeLabel;
