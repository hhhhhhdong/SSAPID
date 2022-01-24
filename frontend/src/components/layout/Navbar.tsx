import React, { ReactNode } from "react";
import NavigationForm from "components/NavbarForm";
import style from "styles/Navbar.module.scss";

type Props = {
  children: ReactNode;
};
function Navbar({ children }: Props) {
  return (
    <>
      <NavigationForm />
      {children}
    </>
  );
}

export default Navbar;
