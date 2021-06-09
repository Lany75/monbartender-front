import React from "react";

import AuthButton from "../authButton/AuthButton";
import AppliTitre from "../appliTitre/AppliTitre";

import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <AppliTitre />
      <AuthButton />
    </div>
  );
};

export default Header;
