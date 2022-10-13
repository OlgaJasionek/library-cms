import { Route, Routes } from "react-router-dom";

import Settings from "./settings/Settings";
import Profile from "./profile/Profile";

const UserAccount = () => {
  return (
    <Routes>
      <Route path="/profile" element={<Profile />}></Route>
      <Route path="/settings" element={<Settings />}></Route>
    </Routes>
  );
};

export default UserAccount;
