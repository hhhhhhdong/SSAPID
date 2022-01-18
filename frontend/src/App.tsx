import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Home from "./pages/Home";
import IdFindPage from "./pages/IdFindPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Main" element={<Main />} />
          <Route path="/IdFind" element={<IdFindPage />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
