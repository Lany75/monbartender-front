import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import { useParams } from "react-router-dom";
import Axios from "axios";

import apiBaseURL from "../../env";

import "./ModifierIngredient.css";

const ModifierIngredient = () => {
  const { id } = useParams();
  const [ingredientModifie, setIngredientModifie] = useState();

  const getIngredientModifie = ingredientId => {
    Axios.get(`${apiBaseURL}/api/v1/ingredients/${ingredientId}`)
      .then(reponse => {
        setIngredientModifie(reponse.data);
      })
      .catch(error => {
        console.log("vous avez une erreur : ", error);
      });
  };

  React.useEffect(() => {
    getIngredientModifie(id);
  }, [id]);

  return (
    <>
      {ingredientModifie ? (
        ingredientModifie.length === 0 ? (
          <div>Cet ingrédient n&apos;existe pas</div>
        ) : (
          <>
            <div id="titre-modif-ingredient">
              Modification de l&apos;ingrédient
            </div>
            <div id="donnees-ingredient">
              <div>id : {ingredientModifie.id}</div>
              <TextField
                id="nom-ingredient-modifie"
                label="Nom de l'ingrédient"
                defaultValue={ingredientModifie.nom}
              />
            </div>
            <button
              id="btn-modif-ingredient" /* onClick={modifierIngredientBD} */
            >
              Modifier !!
            </button>
          </>
        )
      ) : (
        <div>chargement</div>
      )}
    </>
  );
};

export default ModifierIngredient;
