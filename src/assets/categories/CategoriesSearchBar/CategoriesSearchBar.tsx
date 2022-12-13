import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";

import SearchBar from "../../../common/components/SearchBar/SearchBar";

type FormValues = {
  searchCategory: string;
};

type Props = {
  onChangeValue: (value: string) => void;
  loading: boolean;
};

const CategoriesSearchBar = ({ onChangeValue, loading }: Props) => {
  const { control } = useForm<FormValues>();
  const searchCategoryWatch = useWatch({ name: "searchCategory", control });

  useEffect(() => {
    onChangeValue(searchCategoryWatch);
  }, [searchCategoryWatch]);

  return (
    <>
      <form className="mb-5">
        <SearchBar name="searchCategory" label="Wyszukaj kategorię" control={control} loading={loading} />
      </form>
    </>
  );
};

export default CategoriesSearchBar;
