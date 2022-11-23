import { Control } from "react-hook-form";

import Card from "../../../common/components/Card/Card";
import TextInput from "../../../common/components/TextInput/TextInput";
import { exactLengthValidator, linkValidator } from "../../../common/utils/validators";

type Props = {
  control: Control<any> | undefined;
};

const AdditionalData = ({ control }: Props) => {
  return (
    <Card>
      <div className="row">
        <div className="col-12 col-sm-4">
          <h3>Dane dodatkowe</h3>
        </div>
        <div className="col-12 col-sm-8">
          <div className="form-field">
            <TextInput name="publisher" control={control} rules={{ required: true }} label="Wydawnictwo" />
          </div>
          <div className="form-field">
            <TextInput
              name="publicationYear"
              control={control}
              rules={{ required: true, validate: { exactLength: exactLengthValidator(4) } }}
              label="Rok wydania"
              type="number"
            />
          </div>
          <div className="text-field">
            <TextInput
              name="lubimyczytacLink"
              control={control}
              rules={{ required: true, validate: { linkValidator } }}
              label="Link do “Lubimyczytać.pl”"
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AdditionalData;
