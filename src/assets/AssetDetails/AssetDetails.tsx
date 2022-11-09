import { ArrowBack } from "@mui/icons-material";
import { Chip } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Card from "../../common/components/Card/Card";
import { Asset } from "../assets.types";
import AssetTypeLabel from "../AssetTypeLabel/AssetTypeLabel";
import Loader from "../../common/components/Loader/Loader";
import { getFullName } from "../../common/utils/full-name";
import CopiesTable from "./CopiesTable/CopiesTable";
import { getAssetData } from "../assets.api";

import styles from "./AssetDetails.module.scss";

const AssetDetails = () => {
  const [assetData, setAssetData] = useState<Asset | undefined>();
  const { assetId } = useParams<string>();

  useEffect(() => {
    if (assetId) {
      getData(assetId);
    }
  }, []);

  const getData = async (id: string) => {
    try {
      const resp = await getAssetData(id);
      setAssetData(resp);
    } catch (err) {}
  };

  if (!assetData) return <Loader />;

  return (
    <>
      <div className="mb-3">
        <Link to="/assets/list">
          <ArrowBack /> Katalog
        </Link>
      </div>
      <Card>
        <div className="row">
          <div className="col-12 col-lg-4 col-xl-4 col-xxl-3">
            <img className={styles.img} src={assetData.image.path} alt="asset cover" />
          </div>
          <div className="col-12 col-lg-8 col-xl-8 col-xxl-9">
            <div className={styles.type}>
              <AssetTypeLabel type={assetData.type} />
            </div>
            <h2 className={styles.title}>{assetData.title}</h2>
            <h3 className={styles.author}>{getFullName(assetData.author)}</h3>
            <div>
              <dl className="d-flex-wrap p-3">
                <div className={styles.listItem}>
                  <dt className={styles.head}>Wydawnictwo: </dt>
                  <dd className={styles.body}>{assetData.publisher}</dd>
                </div>
                <div className={styles.listItem}>
                  <dt className={styles.head}>Data wydania:</dt>
                  <dd className={styles.body}>{assetData.publicationYear}</dd>
                </div>
                <div className={styles.listItem}>
                  <dt className={styles.head}>Opis:</dt>
                  <dd className={styles.body}>{assetData.description}</dd>
                </div>
                <div className={styles.listItem}>
                  <dt className={styles.head}>ISBN:</dt>
                  <dd className={styles.body}>{assetData.isbn}</dd>
                </div>
                <div className={styles.listItem}>
                  <dt className={styles.head}>LInk do "Lubimy czytać" </dt>
                  <dd className={styles.body}>
                    <a href={assetData.lubimyczytacLink}>Lubimyczytać.pl</a>
                  </dd>
                </div>
                <div className={styles.listItem}>
                  <dt className={styles.head}>Kategoria:</dt>
                  <dd className={styles.body}>
                    {assetData.categories.map((category) => (
                      <span key={category.id} className="me-2">
                        <Chip label={category.name} color="primary" variant="outlined" />
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </Card>
      <div className="mt-4">
        <CopiesTable copies={assetData.copies} />
      </div>
    </>
  );
};

export default AssetDetails;
