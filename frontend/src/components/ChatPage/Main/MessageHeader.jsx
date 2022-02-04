import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
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
        height: "20%",
        border: ".2rem solid black",
        borderRadius: "4px",
        padding: "1rem",
        marginBottom: "1rem",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div className="title" style={{ marginBottom: "2em" }}>
          {select[1]}
        </div>
        <input
          name="search"
          value={search}
          placeholder="Search Messages"
          onChange={change}
          style={{ width: "10rem", height: "2rem" }}
        />
      </div>
    </div>
  );
}

export default MessageHeader;
