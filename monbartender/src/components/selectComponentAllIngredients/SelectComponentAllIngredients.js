import React, { useState } from "react";

import "./SelectComponentAllIngredients.css";
import "./SelectComponentAllIngredientsDesktop.css";
import Axios from "axios";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";

// eslint-disable-next-line no-undef
const apiBaseURL = process.env.REACT_APP_BASE_API;

const SelectComponentAllIngredients = props => {
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
      {allIngredients && (
        <Autocomplete
          className="selection-box"
          id={idDivSelect}
          //freeSolo
          options={allIngredients}
          getOptionLabel={option => option.nom}
          style={{ width: 300 }}
          renderInput={params => <TextField {...params} label={label} />}
        />
      )}
    </>
  );
};

export default SelectComponentAllIngredients;
