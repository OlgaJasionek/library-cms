import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";

import CheckBoxGroup from "../../../common/components/CheckBoxGroup/CheckBoxGroup";
import MultiSelect from "../../../common/components/MultiSelect/MultiSelect";
import SearchBar from "../../../common/components/SearchBar/SearchBar";
import ShiftSidePanel from "../../../common/components/ShiftSidePanel/ShiftSidePanel";
import { SelectOption } from "../../../common/types/select-option";
import { assetsTypesValues } from "../../../common/utils/ditionaries";
import { AssetFilters } from "../../assets.types";

type Props = {
  open: boolean;
  categories: SelectOption[];
  authors: SelectOption[];
  loading: boolean;
  onChangeValue: (values: AssetFilters) => void;
  onCloseSidePanel: () => void;
};

const AssetsFilterPanel = ({
  open,
  categories,
  authors,
  loading,
  onChangeValue,
  onCloseSidePanel,
}: Props) => {
  const { control } = useForm<AssetFilters>();
  const valuesWatch = useWatch<AssetFilters>({ control });

  useEffect(() => {
    onChangeValue(valuesWatch);
  }, [valuesWatch]);

  return (
    <>
      <ShiftSidePanel open={open} onClose={onCloseSidePanel}>
        <form className="d-flex flex-column">
          <div className="m-3">
            <SearchBar loading={loading} name="title" label="Wyszukaj książkę" control={control} />
          </div>
          <div className="m-3">
            <MultiSelect
              control={control}
              name="type"
              rules={{ required: true }}
              label="Typ"
              values={assetsTypesValues}
            ></MultiSelect>
          </div>
          <div className="d-flex">
            <CheckBoxGroup label="Wybierz kategorię" options={categories} name="category" control={control} />
          </div>
          <div className="d-flex">
            <CheckBoxGroup label="Wybierz autora" options={authors} name="author" control={control} />
          </div>
        </form>
      </ShiftSidePanel>
    </>
  );
};

export default AssetsFilterPanel;
