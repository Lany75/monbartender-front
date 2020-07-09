import React, { useContext } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";

import "./IngredientNvCockComponent.css";
import "./IngredientNvCockComponentDesktop.css";
import { IngredientContext } from "../../context/ingredientContext";

// eslint-disable-next-line react/prop-types
const IngredientNvCockComponent = ({ classe, id, labelIngredient }) => {
  const { listeIngredients } = useContext(IngredientContext);

  const inputId = "input-" + id;
  const quantId = "quantite-" + id;
  const unitId = "unite-" + id;

  return (
    <div className={classe}>
      {listeIngredients && (
        <>
          <Autocomplete
            className="ingredient-nv-cocktail"
            id={inputId}
            //freeSolo
            options={listeIngredients}
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
