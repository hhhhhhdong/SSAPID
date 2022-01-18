import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Home from "./pages/Home";
import IdFindPage from "./pages/IdFindPage";
import PasswordFindPage from "./pages/PasswordFindPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/main" element={<Main />} />
          <Route path="/idFind" element={<IdFindPage />} />
          <Route path="/passwordFind" element={<PasswordFindPage />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
