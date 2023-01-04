import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Card from "../../../common/components/Card/Card";
import Loader from "../../../common/components/Loader/Loader";
import { editReader, getReaderData } from "../../users.api";
import { FullUserInfo } from "../../users.types";
import ReaderForm from "../Form/Form";
import { ReaderFormValues } from "../readers.types";

const EditReader = () => {
  const [readerData, setReaderData] = useState<FullUserInfo>();
  const { readerId } = useParams<string>();
  const navigate = useNavigate();

  useEffect(() => {
    getSelectedReader();
  }, [readerId]);

  const getSelectedReader = async () => {
    try {
      if (readerId) {
        const resp = await getReaderData(readerId);
        setReaderData(resp.data);
      }
    } catch (err) {}
  };

  const editReaderHandler = async (body: ReaderFormValues) => {
    try {
      if (readerId) {
        await editReader(body, readerId);
      }

      navigate("/users/readers");
    } catch (err) {}
  };

  return (
    <>
      <div className="container--sm">
        {readerData ? (
          <>
            <div className="mb-5">
              <h2>Edytuj czytelnika</h2>
            </div>
            <Card>
              <ReaderForm onSave={editReaderHandler} actionType="edit" initData={readerData} />
            </Card>
          </>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

export default EditReader;
