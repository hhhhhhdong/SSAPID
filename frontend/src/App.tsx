import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Main from "./pages/Main";
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
          {/* <Route path="/" element={<Main />} /> */}
          <Route path="/register" element={<Register />} />
          <Route path="/idFind" element={<IdFind />} />
          <Route path="/passFind" element={<PassFind />} />
          <Route path="/login" element={<Login />} />
          <Route path="/userDist" element={<UserDist />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
