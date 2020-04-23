import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";

import { CocktailContext } from "../../../../context/cocktailContext";
import { AuthContext } from "../../../../context/authContext";

import "./ModifierCocktailMoment.css";
import "./ModifierCocktailMomentDesktop.css";

// eslint-disable-next-line no-undef
const apiBaseURL = process.env.REACT_APP_BASE_API;

const ModifierCocktailMoment = () => {
  const { user, accessToken } = useContext(AuthContext);
  const {
    listeCocktails,
    listeCocktailsMoment,
    setListeCocktailsMoment
  } = useContext(CocktailContext);
  let history = useHistory();

  const remplacerCocktails = () => {
    const cocktail1 = listeCocktailsMoment[0].nom;
    const boxValue1 = document.getElementById("auto-complete-0").value;

    const cocktail2 = listeCocktailsMoment[1].nom;
    const boxValue2 = document.getElementById("auto-complete-1").value;

    if (
      (boxValue2 === "" && boxValue1 === cocktail2) ||
      (boxValue1 === "" && boxValue2 == cocktail1)
    )
      alert("Cette modification ne peut pas etre faite");
    else {
      if (boxValue1 !== "") {
        modifierCocktailMoment(cocktail1, boxValue1);
      }

      if (boxValue2 !== "") {
        modifierCocktailMoment(cocktail2, boxValue2);
      }
      history.push("/gestion");
    }
  };

  const modifierCocktailMoment = (ancienCocktail, nouveauCocktail) => {
    fetch(
      `${apiBaseURL}/api/v1/gestion/cocktails-du-moment?nomAncienCocktail=${ancienCocktail}&nomNouveauCocktail=${nouveauCocktail}`,
      {
        method: "PUT",
        headers: {
          authorization: accessToken
        }
      }
    )
      .then(reponse => {
        return reponse.json();
      })
      .then(data => {
        setListeCocktailsMoment(data);
      });
  };

  return (
    <>
      {user ? (
        <>
          <div>Remplacer :</div>
          {listeCocktailsMoment &&
            listeCocktails &&
            listeCocktailsMoment.map((cm, index) => {
              const idAutoComplete = "auto-complete-" + index;

              return (
                <div className="cocktail-modifie" key={index}>
                  <div>{cm.nom}</div>
                  <div>par</div>
                  <Autocomplete
                    id={idAutoComplete}
                    options={listeCocktails}
                    getOptionLabel={option => option.nom}
                    style={{ width: 300 }}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="Nouvel ingrédient"
                        variant="outlined"
                      />
                    )}
                  />
                </div>
              );
            })}
          <button id="btn-validation-modif" onClick={remplacerCocktails}>
            Remplacer !!
          </button>
        </>
      ) : (
        <div>Vous devez avoir les droits pour accéder à cette page</div>
      )}
    </>
  );
};

export default ModifierCocktailMoment;
