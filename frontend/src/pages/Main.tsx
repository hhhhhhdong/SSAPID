import React from "react";
import MainPage from "components/Main/MainPage";
import NavigationForm from "components/NavbarForm";
import SidebarForm from "components/SidebarForm";
// import Navbar from "components/SidebarForm";
// import Sidebar from "components/SidebarForm";

function Main() {
  return (
    <div>
      <NavigationForm />
      {/* <SidebarForm /> */}
      <MainPage />
    </div>
  );
}

export default Main;
