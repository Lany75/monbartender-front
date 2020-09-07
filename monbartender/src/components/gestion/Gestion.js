import React, { useContext } from "react";

import "./Gestion.css";
import "./GestionDesktop.css";
import GestionCocktailMoment from "../gestionCocktailMoment/GestionCocktailMoment";
import GestionCocktails from "../gestionCocktails/GestionCocktails";
import { AuthContext } from "../../context/authContext";
import { BarContext } from "../../context/barContext";
import GestionIngredients from "../gestionIngredients/GestionIngredients";
import GestionVerres from "../gestionVerres/GestionVerres";
//import GestionAdmin from "../gestionAdmin/GestionAdmin";

const Gestion = () => {
  const { user } = useContext(AuthContext);
  const { bar } = useContext(BarContext);

  return (
    <>
      {user && bar && bar.droits === true ? (
        <>
          <div id="titre-gestion">Gestion</div>
          <div id="gestion">
            <div className="gestion-cocktails">
              <GestionCocktailMoment />
              <GestionCocktails />
            </div>
            <div className="gestion-ingr-verres">
              <GestionIngredients />
              <GestionVerres />
            </div>
            {/* {user.email === "mlanie.parry@gmail.com" && (
              <div className="gestion-admin">
                <GestionAdmin />
              </div>
            )} */}
          </div>
        </>
      ) : (
        <div>Vous devez avoir les droits pour accéder à cette page</div>
      )}
    </>
  );
};

export default Gestion;
