import React from "react";

import "./NavComponent.css";
import "./NavComponentDesktop.css";

// eslint-disable-next-line react/prop-types
const NavComponent = ({ name, Icon }) => {
  return (
    <div className="nav-item">
      <div className="icon-nav-item">
        <Icon /* size={iconSize} */ />
      </div>
      <div className="txt-nav-item invisible">{name}</div>
    </div>
  );
};

export default NavComponent;
