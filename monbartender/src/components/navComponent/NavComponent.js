import React from "react";

import "./NavComponent.css";

// eslint-disable-next-line react/prop-types
const NavComponent = ({ name, Icon, iconSize }) => {
  return (
    <div className="nav-item">
      <div>
        <Icon size={iconSize} />
      </div>
      <div className="txt-nav-item">{name}</div>
    </div>
  );
};

export default NavComponent;
