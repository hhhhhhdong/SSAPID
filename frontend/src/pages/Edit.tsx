import React from "react";
import Navbar from "components/layout/MainTemplate";
import EditForm from "../components/User/EditForm";

function Edit() {
  return (
    <div>
      <Navbar>
        <EditForm />;
      </Navbar>
    </div>
  );
}

export default Edit;
