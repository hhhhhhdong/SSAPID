import React, { useEffect, useState } from "react";
import { FaUserFriends } from "react-icons/fa";
import { useSelector } from "react-redux";

function MessageHeader({ handleSearchChange, searchTerm }) {
  const [state, setState] = useState({
    search: "",
    messages: [],
  });

  const room = useSelector((state) => state.userReducer.chatRoomString);

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
          {room[1]}
        </div>
        <input
          name="search"
          value={searchTerm}
          placeholder="  Search Messages"
          onChange={handleSearchChange}
          style={{
            width: "10rem",
            height: "2rem",
            backgroundColor: "",
            borderRadius: "10px",
            border: "none",
          }}
          autoComplete="off"
        />
      </div>
    </div>
  );
}

export default MessageHeader;
