import React, { ReactNode } from "react";
import SidebarForm from "components/SidebarForm";
import style from "styles/Sidebar.module.scss";

type Props = {
  children: ReactNode;
};
function Sidebar({ children }: Props) {
  return (
    <div>
      <SidebarForm />
      {children}
    </div>
  );
}

export default Sidebar;
