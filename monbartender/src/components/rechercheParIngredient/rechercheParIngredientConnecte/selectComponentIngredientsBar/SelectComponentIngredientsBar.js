import React, { useContext, useState } from "react";

import "./SelectComponentIngredientsBar.css";
import "./SelectComponentIngredientsBarDesktop.css";
import { BarContext } from "../../../../context/barContext";

// eslint-disable-next-line no-undef
const apiBaseURL = process.env.REACT_APP_BASE_API;

const SelectComponentIngredientsBar = props => {
  const { bar } = useContext(BarContext);
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

  //  bar && console.log("bar", bar.Ingredients.length);
  //allIngredients && console.log("allIngredients : ", allIngredients);

  React.useEffect(() => {
    getAllIngredients();
  }, []);

  return (
    <>
      {bar && bar.Ingredients.length === 0 ? (
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
      ) : (
        <select id={idDivSelect} className="selection-box">
          <option>choisissez un ingredient</option>
          {bar &&
            bar.Ingredients.map((i, index) => {
              return (
                <option id={index} key={index} value={i.nom} name={i.nom}>
                  {i.nom}
                </option>
              );
            })}
        </select>
      )}
    </>
  );
};

export default SelectComponentIngredientsBar;
