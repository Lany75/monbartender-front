import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";

import apiBaseURL from "../../env";

import { CocktailContext } from "../../context/cocktailContext";
import { AuthContext } from "../../context/authContext";
import { BarContext } from "../../context/barContext";

import "./ModifierCocktailMoment.css";
import "./ModifierCocktailMomentDesktop.css";

const ModifierCocktailMoment = () => {
  const { user, accessToken } = useContext(AuthContext);
  const { bar } = useContext(BarContext);
  const { listeCocktails, setListeCocktailsMoment } = useContext(
    CocktailContext
  );
  let history = useHistory();

  const remplacerCocktails = () => {
    const nvCocktailMoment1 = document.getElementById("autocomplete1").value;
    const nvCocktailMoment2 = document.getElementById("autocomplete2").value;

    if (nvCocktailMoment1 === "" || nvCocktailMoment2 === "") {
      alert("Vous devez choisir 2 nouveaux cocktails");
    } else {
      if (nvCocktailMoment1 === nvCocktailMoment2) {
        alert("Les 2 cocktails choisis doivent être différents");
      } else {
        modifierCocktailMoment({
          cocktail1: nvCocktailMoment1,
          cocktail2: nvCocktailMoment2
        });
        history.push("/gestion");
      }
    }
  };

  const modifierCocktailMoment = nvCocktailsMoment => {
    Axios.put(
      `${apiBaseURL}/api/v1/gestion/cocktails-du-moment`,
      nvCocktailsMoment,
      {
        headers: {
          authorization: accessToken
        }
      }
    )
      .then(reponse => {
        setListeCocktailsMoment(reponse.data);
      })
      .catch(error => {
        console.log("vous avez une erreur : ", error);
      });
  };

  return (
    <>
      {user && bar && bar.droits === true ? (
        <>
          <div id="titre-modif-cocktail-moment">
            Modification des cocktails du moment
          </div>

          {listeCocktails && (
            <>
              <div id="div-autocomplete">
                <div id="auto-complete-1">
                  <Autocomplete
                    id="autocomplete1"
                    options={listeCocktails}
                    getOptionLabel={option => option.nom}
                    style={{ width: 300 }}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="1er cocktail du moment"
                        variant="outlined"
                      />
                    )}
                  />
                </div>
                <div id="auto-complete-2">
                  <Autocomplete
                    id="autocomplete2"
                    options={listeCocktails}
                    getOptionLabel={option => option.nom}
                    style={{ width: 300 }}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="2eme cocktail du moment"
                        variant="outlined"
                      />
                    )}
                  />
                </div>
              </div>
              <Button
                id="btn-validation-modif"
                variant="contained"
                onClick={remplacerCocktails}
              >
                Remplacer !!
              </Button>
            </>
          )}
        </>
      ) : (
        <div>Vous devez avoir les droits pour accéder à cette page</div>
      )}
    </>
  );
};

export default ModifierCocktailMoment;
