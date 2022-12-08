import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab } from "@mui/material";
import { useState } from "react";

import Card from "../../../common/components/Card/Card";
import UserAssetsRentals from "./UserRentals/UserRentals";
import UserAssetsReservations from "./UserReservations/UserReservations";

const UserAssets = () => {
  const [tabValue, setTabValue] = useState<string>("rentals");

  const changeTabValueHandler = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  return (
    <div className="col-sm-12 col-lg-8">
      <Card>
        <TabContext value={tabValue}>
          <TabList onChange={changeTabValueHandler} aria-label="user-assets-tabs">
            <Tab label="Aktywne wypożyczenia" value="rentals" />
            <Tab label="Aktywne rezerwacje" value="reservations" />
          </TabList>
          <TabPanel value="rentals">
            <UserAssetsRentals />
          </TabPanel>
          <TabPanel value="reservations">
            <UserAssetsReservations />
          </TabPanel>
        </TabContext>
      </Card>
    </div>
  );
};

export default UserAssets;
