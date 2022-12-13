import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";

import SearchBar from "../../../common/components/SearchBar/SearchBar";

type FormValues = {
  searchAuthor: string;
};

type Props = {
  onChangeValue: (value: string) => void;
  loading: boolean;
};

const AuthorsSearchBar = ({ onChangeValue, loading }: Props) => {
  const { control } = useForm<FormValues>();
  const searchAuthorWatch = useWatch({ name: "searchAuthor", control });

  useEffect(() => {
    onChangeValue(searchAuthorWatch);
  }, [searchAuthorWatch]);

  return (
    <>
      <form className="mb-5">
        <SearchBar
          name="searchAuthor"
          label="Wyszukaj autora"
          control={control}
          loading={loading}
        />
      </form>
    </>
  );
};

export default AuthorsSearchBar;
