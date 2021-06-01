import React, { useState, useContext } from "react";
import { TextField, Button } from "@material-ui/core";
import { useParams, useHistory } from "react-router-dom";
import Axios from "axios";

import apiBaseURL from "../../env";

import "./ModifierIngredient.css";
import "./ModifierIngredientDesktop.css";

import { IngredientContext } from "../../context/ingredientContext";
import { AuthContext } from "../../context/authContext";
import { BarContext } from "../../context/barContext";

const ModifierIngredient = () => {
  const { id } = useParams();
  const { accessToken } = useContext(AuthContext);
  const [ingredientModifie, setIngredientModifie] = useState();
  const { listeIngredients, setListeIngredients } = useContext(
    IngredientContext
  );
  const { getBarUser } = useContext(BarContext);
  let history = useHistory();

  const getIngredientModifie = ingredientId => {
    Axios.get(`${apiBaseURL}/api/v1/ingredients/${ingredientId}`)
      .then(reponse => {
        setIngredientModifie(reponse.data);
      })
      .catch(error => {
        console.log("vous avez une erreur : ", error);
      });
  };

  const modifierIngredientBD = () => {
    const divNomIngredient = document.getElementById("nom-ingredient-modifie");
    let ingredientExistant = false;

    if (
      divNomIngredient.value !== "" &&
      divNomIngredient.value !== ingredientModifie.nom
    ) {
      const nvNomIngredient = {
        nom: divNomIngredient.value.replace(
          /(^\w|\s\w)(\S*)/g,
          (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
        )
      };

      // On vérifie que le nom de l'ingrédient n'existe pas déja
      for (let i = 0; i < listeIngredients.length; i++) {
        if (listeIngredients[i].nom === nvNomIngredient.nom) {
          ingredientExistant = true;
        }
      }

      if (ingredientExistant === false) {
        Axios.put(`${apiBaseURL}/api/v1/ingredients/${id}`, nvNomIngredient, {
          headers: {
            authorization: accessToken
          }
        }).then(reponse => {
          setListeIngredients(reponse.data);
          getBarUser();
          history.push("/gestion");
        });
      } else {
        alert("MODIFICATION IMPOSSIBLE : ce nom d'ingrédient existe déja");
      }
    }
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
            <Button
              id="btn-modif-ingredient"
              variant="contained"
              onClick={modifierIngredientBD}
            >
              Modifier !!
            </Button>
          </>
        )
      ) : (
        <div>chargement</div>
      )}
    </>
  );
};

export default ModifierIngredient;
