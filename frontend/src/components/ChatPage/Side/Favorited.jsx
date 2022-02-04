import React from "react";
import { MdOutlineFavorite } from "react-icons/md";

function Favorited() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.5em",
      }}
    >
      <MdOutlineFavorite style={{ marginRight: "0.2em" }} />
      Favorited Post (3)
    </div>
  );
}

export default Favorited;
