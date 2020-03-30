import React, { useState } from "react";

import "./SelectComponentAllIngredients.css";
import "./SelectComponentAllIngredientsDesktop.css";

// eslint-disable-next-line no-undef
const apiBaseURL = process.env.REACT_APP_BASE_API;

const SelectComponentAllIngredients = props => {
  const [allIngredients, setAllIngredients] = useState();
  // eslint-disable-next-line react/prop-types
  const idDivSelect = props.id;

  const getAllIngredients = () => {
    fetch(`${apiBaseURL}/api/ingredients/`)
      .then(reponse => {
        return reponse.json();
      })
      .then(data => {
        setAllIngredients(data);
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
      <select id={idDivSelect} className="selection-box">
        <option>choisissez un ingredient</option>
        {allIngredients &&
          allIngredients.map((i, index) => {
            return (
              <option id={index} key={index} value={i.nom} name={i.nom}>
                {i.nom}
              </option>
            );
          })}
      </select>
    </>
  );
};

export default SelectComponentAllIngredients;
