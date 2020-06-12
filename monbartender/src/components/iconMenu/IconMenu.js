import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";

import "./IconMenu.css";
import "./IconMenuDesktop.css";

const IconMenu = () => {
  return (
    <div id="icon-menu">
      <GiHamburgerMenu />
      <div id="txt-menu">MENU</div>
    </div>
  );
};

export default IconMenu;
