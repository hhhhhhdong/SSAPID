import React from "react";
import UserPanel from "./UserPanel";
import Favorited from "./Favorited";
import DirectMessages from "./DirectMessages";

function Side() {
  return (
    <div
      style={{
        backgroundColor: "#7B83EB",
        padding: "2rem",
        minHeight: "100%",
        color: "white",
        minWidth: "275px",
      }}
    >
      <UserPanel />
      <Favorited />
      <DirectMessages />
    </div>
  );
}

export default Side;
