import { ArrowBack } from "@mui/icons-material";
import { Chip } from "@mui/material";
import { Link } from "react-router-dom";

import Card from "../../common/components/Card/Card";
import { AssetsTypes } from "../assets.types";
import AssetTypeLabel from "../AssetTypeLabel/AssetTypeLabel";
import bookCover from "../../common/img/zbrodnia i kara.jpg";

import styles from "./AssetDetails.module.scss";

const AssetDetails = () => {
  return (
    <>
      <div className="mb-3">
        <Link to="/assets/list">
          <ArrowBack /> Katalog
        </Link>
      </div>
      <Card>
        <div className="row">
          <div className="col-12 col-lg-4 col-xl-3">
            <img className={styles.img} src={bookCover} alt="asset cover" />
          </div>
          <div className="col-12 col-lg-8 col-xl-9">
            <div className={styles.type}>
              <AssetTypeLabel type={AssetsTypes.Book} />
            </div>
            <h2 className={styles.title}>Zbrodnia i kara</h2>
            <h3 className={styles.author}>Fiodor Dostojewski</h3>
            <div>
              <dl className="d-flex-wrap p-3">
                <div className={styles.listItem}>
                  <dt className={styles.head}>Wydawnictwo: </dt>
                  <dd className={styles.body}>Wydawnictwo MG</dd>
                </div>
                <div className={styles.listItem}>
                  <dt className={styles.head}>Data wydania</dt>
                  <dd className={styles.body}>2021-10-27</dd>
                </div>
                <div className={styles.listItem}>
                  <dt className={styles.head}>Opis</dt>
                  <dd className={styles.body}>300str, miękka oprawa</dd>
                </div>
                <div className={styles.listItem}>
                  <dt className={styles.head}>ISBN</dt>
                  <dd className={styles.body}>2234353543565645455234</dd>
                </div>
                <div className={styles.listItem}>
                  <dt className={styles.head}>Kategoria</dt>
                  <dd className={styles.body}>
                    <Chip label="Literatura piękna" color="primary" variant="outlined" />
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default AssetDetails;
