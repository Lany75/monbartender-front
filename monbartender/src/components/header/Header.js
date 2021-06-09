import React from "react";

import AuthButton from "../authButton/AuthButton";
import AppliTitre from "../appliTitre/AppliTitre";
import InputRechercheParNom from "../inputRechercheParNom/InputRechercheParNom";

import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <AppliTitre />
      <InputRechercheParNom />
      <AuthButton />
    </div>
  );
};

export default Header;
