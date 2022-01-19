import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Home from "./pages/Home";
import IdFindPage from "./pages/IdFindPage";
import Register from "./pages/Register";
import PasswordFindPage from "./pages/PasswordFindPage";
import LoginPage from "./pages/LoginPage";
import UserDistPage from "./pages/UserDistPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/main" element={<Main />} />
          <Route path="/idFind" element={<IdFindPage />} />
          <Route path="/passwordFind" element={<PasswordFindPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/userDist" element={<UserDistPage />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
