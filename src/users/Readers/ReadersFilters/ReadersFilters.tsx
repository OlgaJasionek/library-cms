import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";

import SearchBar from "../../../common/components/SearchBar/SearchBar";
import Switch from "../../../common/components/Switch/Switch";

import styles from "./ReadersFilters.module.scss";

type FormValues = {
  searchReader: string;
  onlyActive: boolean;
};

type Props = {
  onChangeValue: (values: Partial<FormValues>) => void;
  loading: boolean;
};

const ReadersFilters = ({ onChangeValue, loading }: Props) => {
  const { control } = useForm<FormValues>();
  const valuesWatch = useWatch<FormValues>({ control });

  useEffect(() => {
    onChangeValue(valuesWatch);
  }, [valuesWatch]);

  return (
    <>
      <form className={styles.root}>
        <div className={styles.searchInput}>
          <SearchBar name="searchReader" label="Wyszukaj czytelnika" control={control} loading={loading} />
        </div>
        <Switch name="onlyActive" label="Pokaż tylko aktywnych" control={control} />
      </form>
    </>
  );
};

export default ReadersFilters;
