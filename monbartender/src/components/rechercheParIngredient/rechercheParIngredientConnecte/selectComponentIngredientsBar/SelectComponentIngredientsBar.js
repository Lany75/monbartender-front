import React, { useContext } from "react";

import "./SelectComponentIngredientsBar.css";
import "./SelectComponentIngredientsBarDesktop.css";
import { BarContext } from "../../../../context/barContext";

const SelectComponentIngredientsBar = props => {
  const { bar } = useContext(BarContext);

  // eslint-disable-next-line react/prop-types
  const idDivSelect = props.id;

  return (
    <>
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
    </>
  );
};

export default SelectComponentIngredientsBar;
