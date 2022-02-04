import React from "react";
import Navbar from "components/layout/MainTemplate";
import BoardDetailForm from "components/Board/BoardDetailForm";

function BoardDetail() {
  return (
    <div>
      <Navbar>
        <BoardDetailForm />
      </Navbar>
    </div>
  );
}

export default BoardDetail;
