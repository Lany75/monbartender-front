import React, { useState } from "react";
import { useForm } from "react-hook-form";
//import { TextField } from "@material-ui/core";
import Axios from "axios";

import "./Test.css";
//import SelectComponentAllIngredients from "../selectComponentAllIngredients/SelectComponentAllIngredients";
// eslint-disable-next-line no-undef
const apiBaseURL = process.env.REACT_APP_BASE_API;

const Test = () => {
  const { register, handleSubmit } = useForm();
  const [verres, setVerres] = useState();
  const [ingredients, setIngredients] = useState();
  // const [nomNvCocktail, setNomNvCocktail] = useState("");
  // const [nomNvIngredients, setNomNvIngredients] = useState();
  // const [quantiteNvIngredient, setQuantiteNvIngredient] = useState();
  // const [uniteNvIngredient, setUniteNvIngredient] = useState();
  // const [photoNvIngredient, setPhotoNvIngredient] = useState();
  // const [etapesPreparation, setEtapesPreparation] = useState();

  const getAllVerres = () => {
    Axios.get(`${apiBaseURL}/api/v1/verres/`)
      .then(reponse => {
        setVerres(reponse.data);
      })
      .catch(error => {
        console.log("vous avez une erreur : ", error);
      });
  };

  const getAllIngredients = () => {
    Axios.get(`${apiBaseURL}/api/v1/ingredients/`)
      .then(reponse => {
        setIngredients(reponse.data);
      })
      .catch(error => {
        console.log("vous avez une erreur : ", error);
      });
  };

  const onSubmit = async data => {
    //event.preventDefault();
    //console.log(data);
    await Axios.post(`${apiBaseURL}/api/v1/gestion/cocktails`, data);
  };

  React.useEffect(() => {
    getAllVerres();
    getAllIngredients();
  }, []);

  return (
    <>
      <div id="titre-ajout-cocktail">Création de Cocktail</div>

      <form
        id="formulaire-ajout-cocktail"
        method="post"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div id="nom-nouveau-cocktail">
          <label id="label-nom-nv-cock">Nom</label>
          <input
            id="input-nom-nv-cock"
            type="text"
            name="nom"
            required
            // onChange={e => setNomNvCocktail(e.target.value)}
            // value={nomNvCocktail}
            ref={register()}
          />
        </div>
        <div id="photo-nouveau-cocktail">
          <label id="label-photo-nv-cock">Photo</label>
          <input
            id="input-photo-nv-cock"
            type="file"
            name="photo"
            ref={register}
          />
        </div>
        <div id="verre-nouveau-cocktail">
          <label id="label-verre-nv-cock">Verre</label>
          <select id="select-verre-nv-cock" name="verre" ref={register}>
            {verres &&
              verres.map((v, index) => {
                return <option key={index}>{v.nom}</option>;
              })}
          </select>
        </div>
        <div id="ingredient-nouveau-cocktail">
          <div id="div-titre-ingredients">Ingrédients</div>
          <div id="ingredients-cocktail">
            <div className="ingredients">
              <label id="label-nom-ingredient-nv-cock">
                nom de l&apos;ingrédient
              </label>
              <select
                id="select-nom-ingredient-nv-cock"
                name="nom-ingredient"
                ref={register}
              >
                {ingredients &&
                  ingredients.map((i, index) => {
                    return <option key={index}>{i.nom}</option>;
                  })}
              </select>
            </div>
            <div className="ingredients">
              <label id="label-quantite-ingredient-nv-cock">quantité</label>
              <input
                id="input-quantite-ingredient-nv-cock"
                type="text"
                name="quantite-ingredient"
                ref={register}
              ></input>
            </div>
            <div className="ingredients">
              <label id="label-unite-ingredient-nv-cock">unité</label>
              <input
                id="input-unite-ingredient-nv-cock"
                type="text"
                name="unite-ingredient"
                ref={register}
              ></input>
            </div>
          </div>
        </div>
        <div id="etape-nouveau-cocktail">
          <div id="div-titre-etapes">Etapes de préparation</div>
          <div id="etapes-preparation">
            <label id="label-etape-nv-cock">Etape 1</label>
            <textarea
              id="textarea-etape-nv-cock"
              name="etape"
              className="texte-etape"
              // onChange={e => setEtapesPreparation(e.target.value)}
              // value={etapesPreparation}
              ref={register}
            />
          </div>
        </div>
        <input
          id="btn-ajout-cocktail"
          type="submit"
          value="Ajouter le cocktail"
        />
      </form>
    </>
  );
};

export default Test;
