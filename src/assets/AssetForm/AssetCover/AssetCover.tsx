import Card from "../../../common/components/Card/Card";
import { addAssetCover } from "../../assets.api";

type Props = {
  onImageUpload: (value: string) => void;
};

const AssetCover = ({ onImageUpload }: Props) => {
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;

    if (!fileList) return;

    const formData = new FormData();
    formData.append("image", fileList[0], fileList[0].name);

    try {
      const resp = await addAssetCover(formData);
      onImageUpload(resp.id);
    } catch (err) {}
  };

  return (
    <Card>
      <div className="row">
        <div className="col-12 col-sm-4">
          <h3>Okładka</h3>
        </div>
        <div className="col-12 col-sm-8">
          <input
            id="image"
            name="imageId"
            accept="image/png, image/jpeg, image/jpg"
            onChange={handleChange}
            type="file"
          ></input>
        </div>
      </div>
    </Card>
  );
};

export default AssetCover;
