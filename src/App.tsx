import React from "react";
import { Route, Routes } from "react-router-dom";
import Cockpit from "./cockpit/Cockpit";

import Login from "./login/Login";

function App() {
  return (
    <div className="h-100">
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="*" element={<Cockpit />}></Route>
      </Routes>
    </div>
  );
}

export default App;
