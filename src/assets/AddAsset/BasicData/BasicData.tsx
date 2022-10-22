import { Control } from "react-hook-form";

import Card from "../../../common/components/Card/Card";
import Select from "../../../common/components/Select/Select";
import TextInput from "../../../common/components/TextInput/TextInput";
import { assetsTypesValues } from "../../../common/utils/ditionaries";
import { exactLengthValidator } from "../../../common/utils/validators";

type Props = {
  control: Control<any> | undefined;
};

const BasicData = ({ control }: Props) => {
  return (
    <Card>
      <div className="row">
        <div className="col-12 col-sm-4">
          <h3>Dane podstawowe</h3>
        </div>
        <div className="col-12 col-sm-8">
          <div className="form-field">
            <Select
              control={control}
              name="asset-types"
              rules={{ required: true }}
              label="Typ"
              values={assetsTypesValues}
            ></Select>
          </div>
          <div className="form-field">
            <TextInput name="title" control={control} rules={{ required: true }} label="Tytuł" />
          </div>
          <div className="form-field">
            <TextInput
              name="isbn"
              control={control}
              rules={{ required: true, validate: { exactLength: exactLengthValidator(13) } }}
              label="Numer ISBN"
              type="number"
            />
          </div>
          <div className="text-field">
            <TextInput
              name="description"
              control={control}
              rules={{ required: true }}
              label="Opis"
              multiline
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BasicData;
