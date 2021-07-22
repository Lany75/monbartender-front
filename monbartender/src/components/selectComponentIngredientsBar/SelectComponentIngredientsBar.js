import React, { useContext } from "react";

import "./SelectComponentIngredientsBarDesktop.css";
import { BarContext } from "../../context/barContext";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";
import { IngredientContext } from "../../context/ingredientContext";

const SelectComponentIngredientsBar = props => {
  const { bar } = useContext(BarContext);
  const { listeIngredients } = useContext(IngredientContext);

  // eslint-disable-next-line react/prop-types
  const idDivSelect = props.id;
  // eslint-disable-next-line react/prop-types
  const label = props.label;

  return (
    <>
      {bar && bar.Ingredients.length === 0
        ? listeIngredients && (
          <Autocomplete
            className="selection-box"
            id={idDivSelect}
            options={listeIngredients}
            getOptionLabel={option => option.nom}
            style={{ width: 300 }}
            renderInput={params => <TextField {...params} label={label} />}
          />
        )
        : bar &&
        bar.Ingredients && (
          <Autocomplete
            className="selection-box"
            id={idDivSelect}
            options={bar.Ingredients}
            getOptionLabel={option => option.nom}
            style={{ width: 300 }}
            renderInput={params => <TextField {...params} label={label} />}
          />
        )}
    </>
  );
};

export default SelectComponentIngredientsBar;
