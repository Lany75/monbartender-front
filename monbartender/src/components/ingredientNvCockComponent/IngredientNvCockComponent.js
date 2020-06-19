import React, { useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";
import Axios from "axios";

import "./IngredientNvCockComponent.css";
import "./IngredientNvCockComponentDesktop.css";

// eslint-disable-next-line no-undef
const apiBaseURL = process.env.REACT_APP_BASE_API;

// eslint-disable-next-line react/prop-types
const IngredientNvCockComponent = ({ classe, id, labelIngredient }) => {
  const [ingredients, setIngredients] = useState();
  //const idElement = id;
  const inputId = "input-" + id;
  const quantId = "quantite-" + id;
  const unitId = "unite-" + id;

  const getAllIngredients = () => {
    Axios.get(`${apiBaseURL}/api/v1/ingredients/`)
      .then(reponse => {
        setIngredients(reponse.data);
      })
      .catch(error => {
        console.log("vous avez une erreur : ", error);
      });
  };

  React.useEffect(() => {
    getAllIngredients();
  }, []);

  return (
    <div className={classe}>
      {ingredients && (
        <>
          <Autocomplete
            className="ingredient-nv-cocktail"
            id={inputId}
            freeSolo
            options={ingredients}
            getOptionLabel={option => option.nom}
            style={{ width: 300 }}
            renderInput={params => (
              <TextField {...params} label={labelIngredient} />
            )}
          />
          <div className="quantite-ajout">
            <div className="quantite-nv-ingredient">
              <TextField id={quantId} label="quantité" />
            </div>
            <div className="unite-nv-ingredient">
              <TextField id={unitId} label="unité" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default IngredientNvCockComponent;
