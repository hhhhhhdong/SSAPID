import React from "react";
import Navbar from "components/layout/MainTemplate";
import CreateBoardForm from "components/Board/CreateBoardForm";

function CreateBoard() {
  return (
    <div>
      <Navbar>
        <CreateBoardForm />
      </Navbar>
    </div>
  );
}

export default CreateBoard;
