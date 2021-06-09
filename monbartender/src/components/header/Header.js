import React from "react";

import AuthButton from "../authButton/AuthButton";
import AppliTitre from "../appliTitre/AppliTitre";
import MenuButton from "../menuButton/MenuButton";

import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <MenuButton />
      <AppliTitre />
      <AuthButton />
    </div>
  );
};

export default Header;
