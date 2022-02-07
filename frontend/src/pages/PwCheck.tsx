import React from "react";
import Navbar from "components/layout/MainTemplate";
import PwCheckForm from "components/UserEdit/PwCheckForm";

function PwCheck() {
  return (
    <div>
      <Navbar>
        <PwCheckForm />
      </Navbar>
    </div>
  );
}

export default PwCheck;
