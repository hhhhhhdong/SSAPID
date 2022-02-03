import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import Input from "../../common/Input";

function MessageHeader() {
  const [state, setState] = useState({
    search: "",
  });
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
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="title">하윙</div>
        <Input
          name="search"
          value={search}
          placeHolder="Search Messages"
          onChange={change}
          width={150}
        />
      </div>
    </div>
  );
}

export default MessageHeader;
