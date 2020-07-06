import React, { useContext, useState } from "react";

import "./SelectComponentIngredientsBar.css";
import "./SelectComponentIngredientsBarDesktop.css";
import { BarContext } from "../../context/barContext";
import Axios from "axios";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";

// eslint-disable-next-line no-undef
const apiBaseURL = process.env.REACT_APP_BASE_API;

const SelectComponentIngredientsBar = props => {
  const { bar } = useContext(BarContext);
  const [allIngredients, setAllIngredients] = useState();

  // eslint-disable-next-line react/prop-types
  const idDivSelect = props.id;
  // eslint-disable-next-line react/prop-types
  const label = props.label;

  const getAllIngredients = () => {
    Axios.get(`${apiBaseURL}/api/v1/ingredients/`)
      .then(reponse => {
        setAllIngredients(reponse.data);
      })
      .catch(error => {
        console.log("vous avez une erreur : ", error);
      });
  };

  React.useEffect(() => {
    getAllIngredients();
  }, []);

  return (
    <>
      {bar && bar.Ingredients.length === 0
        ? allIngredients && (
            <Autocomplete
              className="selection-box"
              id={idDivSelect}
              //freeSolo
              options={allIngredients}
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
              //freeSolo
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
