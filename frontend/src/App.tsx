import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ChatPage from "pages/ChatPage";
import Edit from "pages/Edit";
import PwCheck from "pages/PwCheck";
import Inquire from "pages/Inquire";
import Main from "./pages/Main";
import IdFind from "./pages/IdFind";
import Register from "./pages/Register";
import PassFind from "./pages/PassFind";
import Login from "./pages/Login";
import UserDist from "./pages/UserDist";
import CreateBoard from "./pages/CreateBoard";
import AuthFind from "./pages/AuthFind";
import PassChange from "./pages/PassChange";
import BoardDetail from "./pages/BoardDetail";
import WebRtcTest from "./pages/WebRtcTest";
import Openvidu from "./pages/Openvidu";
import "./App.module.scss";

function App() {
  const userNickname = sessionStorage.getItem("userNickname");
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={userNickname ? <Main /> : <Login />} />
          <Route path="/home" element={<Main />} />
          <Route path="/register" element={<Register />} />
          <Route path="/idFind" element={<IdFind />} />
          <Route path="/passFind" element={<PassFind />} />
          <Route path="/userDist" element={<UserDist />} />
          <Route path="/createBoard" element={<CreateBoard />} />
          <Route path="/authFind" element={<AuthFind />} />
          <Route path="/passChange" element={<PassChange />} />
          <Route path="/chatPage" element={<ChatPage />} />
          <Route path="/board/:boardSeq" element={<BoardDetail />} />
          <Route path="/webrtctest" element={<WebRtcTest />} />
          <Route path="/inquire" element={<Inquire />} />
          <Route path="/pwcheck" element={<PwCheck />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/openvidu" element={<Openvidu />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
