import { useEffect, useState } from "react";
import { Control } from "react-hook-form";

import Card from "../../../common/components/Card/Card";
import MultiSelect from "../../../common/components/MultiSelect/MultiSelect";
import { SelectOption } from "../../../common/types/select-option";
import { getAllAssetsCategoriesValues } from "../../assets.api";

type Props = {
  control: Control<any> | undefined;
};

const AssetCategoryValue = ({ control }: Props) => {
  const [allAssetCategories, setAllAssetCategories] = useState<SelectOption[]>([]);

  useEffect(() => {
    getCategoriesData();
  }, []);

  const getCategoriesData = async () => {
    try {
      const resp = await getAllAssetsCategoriesValues();
      setAllAssetCategories(resp);
    } catch (err) {}
  };

  return (
    <Card>
      <div className="row">
        <div className="col-12 col-sm-4">
          <h3>Kategoria</h3>
        </div>
        <div className="col-12 col-sm-8">
          <div className="form-field">
            <MultiSelect
              values={allAssetCategories}
              name="categoryIds"
              control={control}
              rules={{
                required: true,
              }}
              label={"Kategoria"}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AssetCategoryValue;
