import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Home from "./pages/Home";
import IdFind from "./pages/IdFind";
import Register from "./pages/Register";
import PassFind from "./pages/PassFind";
import Login from "./pages/Login";
import UserDist from "./pages/UserDist";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/main" element={<Main />} />
          <Route path="/idFind" element={<IdFind />} />
          <Route path="/passwordFind" element={<PassFind />} />
          <Route path="/login" element={<Login />} />
          <Route path="/userDist" element={<UserDist />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
