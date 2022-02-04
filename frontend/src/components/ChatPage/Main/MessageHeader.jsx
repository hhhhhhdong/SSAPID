import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
import { useSelector } from "react-redux";
import Input from "../../common/Input";
import { chatRoomString } from "../../../redux/_actions/actions";

function MessageHeader() {
  const [state, setState] = useState({
    search: "",
  });
  const select = useSelector((state) => state.userReducer.chatRoomString);

  const { search } = state;
  const change = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };
  return (
    <div
      style={{
        width: "100%",
        height: "0%",
        borderRadius: "20px",
        padding: "1rem",
        marginBottom: "1rem",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div
          className="title"
          style={{
            marginBottom: "2em",
            color: "#1e272e",
            fontSize: "1.3rem",
            fontWeight: "bold",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <FaUserFriends style={{ fontSize: "2rem", marginRight: "0.3em" }} />
          {select[1]}
        </div>
        <input
          name="search"
          value={search}
          placeholder="Search Messages"
          onChange={change}
          style={{ width: "10rem", height: "2rem", backgroundColor: "" }}
        />
      </div>
    </div>
  );
}

export default MessageHeader;
