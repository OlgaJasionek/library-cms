import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";

import DatePicker from "../../../common/components/DatePicker/DatePicker";
import MultiSelect from "../../../common/components/MultiSelect/MultiSelect";
import SearchBar from "../../../common/components/SearchBar/SearchBar";
import ShiftSidePanel from "../../../common/components/ShiftSidePanel/ShiftSidePanel";
import { assetsStatusValues } from "../../../common/utils/ditionaries";
import { RentalsFilters } from "../../assets.types";

type Props = {
  open: boolean;
  loading: boolean;
  onCloseSidePanel: () => void;
  onChangeValue: (values: RentalsFilters) => void;
};

const RentalsFilterPanel = ({ open, loading, onCloseSidePanel, onChangeValue }: Props) => {
  const { control } = useForm<RentalsFilters>();
  const valuesWatch = useWatch<RentalsFilters>({ control });

  useEffect(() => {
    onChangeValue(valuesWatch);
  }, [valuesWatch]);

  return (
    <>
      <ShiftSidePanel open={open} onClose={onCloseSidePanel}>
        <form className="d-flex flex-column">
          <div className="m-3">
            <SearchBar loading={loading} name="title" label="Tytuł" control={control} />
          </div>
          <div className="m-3">
            <SearchBar loading={loading} name="reader" label="Czytelnik" control={control} />
          </div>
          <div className="m-3">
            <SearchBar loading={loading} name="inventoryNumber" label="Nr inwentarza" control={control} />
          </div>
          <div className="m-3">
            <MultiSelect
              control={control}
              name="status"
              rules={{ required: true }}
              label="Status"
              values={assetsStatusValues}
            ></MultiSelect>
          </div>
          <div>
            <p className="m-4">Data wypożyczenia</p>
            <DatePicker name="startDateFrom" control={control} label="Od" />
            <DatePicker name="startDateTo" control={control} label="Do" />
          </div>
          <div>
            <p className="m-4">Data końca wypożyczenia</p>
            <DatePicker name="endDateFrom" control={control} label="Od" />
            <DatePicker name="endtDateTo" control={control} label="Do" />
          </div>
          <div>
            <p className="m-4">Data zwrotu</p>
            <DatePicker name="returnedDateFrom" control={control} label="Od" />
            <DatePicker name="returnedDateTo" control={control} label="Do" />
          </div>
        </form>
      </ShiftSidePanel>
    </>
  );
};

export default RentalsFilterPanel;
