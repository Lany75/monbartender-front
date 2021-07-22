import React, { useContext } from "react";

import "./SelectComponentAllIngredientsDesktop.css";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";
import { IngredientContext } from "../../context/ingredientContext";

const SelectComponentAllIngredients = props => {
  const { listeIngredients } = useContext(IngredientContext);
  // eslint-disable-next-line react/prop-types
  const idDivSelect = props.id;
  // eslint-disable-next-line react/prop-types
  const label = props.label;

  return (
    <>
      {listeIngredients && (
        <Autocomplete
          className="selection-box"
          id={idDivSelect}
          //freeSolo
          options={listeIngredients}
          getOptionLabel={option => option.nom}
          style={{ width: 300 }}
          renderInput={params => <TextField {...params} label={label} />}
        />
      )}
    </>
  );
};

export default SelectComponentAllIngredients;
