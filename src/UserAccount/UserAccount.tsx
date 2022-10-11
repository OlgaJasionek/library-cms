import { Route, Routes } from "react-router-dom";

import Settings from "./Settings/Settings";
import Profile from "./Profile/Profile";

const UserAccount = () => {
  return (
    <Routes>
      <Route path="/profile" element={<Profile />}></Route>
      <Route path="/settings" element={<Settings />}></Route>
    </Routes>
  );
};

export default UserAccount;
