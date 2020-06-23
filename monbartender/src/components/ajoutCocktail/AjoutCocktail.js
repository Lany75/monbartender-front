import React, { useState, useContext } from "react";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

import "./AjoutCocktail.css";
import "./AjoutCocktailDesktop.css";
import Axios from "axios";
import { AuthContext } from "../../context/authContext";
import { BarContext } from "../../context/barContext";
import IngredientNvCockComponent from "../ingredientNvCockComponent/IngredientNvCockComponent";

import { refStorage } from "../../firebaseConfig";

// eslint-disable-next-line no-undef
const apiBaseURL = process.env.REACT_APP_BASE_API;

const AjoutCocktail = () => {
  const { user } = useContext(AuthContext);
  const { bar } = useContext(BarContext);
  const [verres, setVerres] = useState();
  const [nbIng, setNbIng] = useState(1);
  const [nbEtape, setNbEtape] = useState(1);
  const tableauIng = [];
  const tableauEtapes = [];

  const mesIngredients = [];
  const mesEtapes = [];

  for (let i = 1; i <= nbIng; i++) {
    const id = "ingredient-" + i;
    const label = "Ingrédient " + i;

    mesIngredients.push(
      <IngredientNvCockComponent
        classe="ingredient-quantite"
        id={id}
        labelIngredient={label}
        key={i}
      />
    );
  }

  for (let e = 1; e <= nbEtape; e++) {
    const id = "etape-" + e;
    const placeholder = "Etape " + e;
    mesEtapes.push(
      <textarea
        className="etape-nv-cocktail"
        id={id}
        rows="4"
        placeholder={placeholder}
        key={e}
      />
    );
  }

  const getAllVerres = () => {
    Axios.get(`${apiBaseURL}/api/v1/verres/`)
      .then(reponse => {
        setVerres(reponse.data);
      })
      .catch(error => {
        console.log("vous avez une erreur : ", error);
      });
  };

  const AjoutDivIngredient = () => {
    if (nbIng < 10) setNbIng(nbIng + 1);
  };
  const SupprimeDivIngredient = () => {
    if (nbIng > 1) setNbIng(nbIng - 1);
  };

  const AjoutDivEtape = () => {
    if (nbEtape < 6) setNbEtape(nbEtape + 1);
  };
  const SupprimeDivEtape = () => {
    if (nbEtape > 1) setNbEtape(nbEtape - 1);
  };

  const ajoutCocktailBD = () => {
    let nouveauCocktail = new URLSearchParams();
    let refImageCocktail;

    const divNomCocktail = document.getElementById("nom-nv");
    if (divNomCocktail.value === "" || !divNomCocktail.value) {
      console.log("nom du cocktail obligatoire");
      return;
    }
    nouveauCocktail.append("nom", divNomCocktail.value);
    // nouveauCocktail.nom = divNomCocktail.value;

    let photo = document.getElementById("photo-cocktail").files[0];
    //console.log("photo : ", photo);
    if (!photo) {
      refImageCocktail = "/api/images/cocktail1.jpg";
    } else {
      refImageCocktail = "img_cocktail/" + photo.name;
      // initialisation de la référence de l'image
      const imgRef = refStorage.child("img_cocktail/" + photo.name);
      //envoi de la photo sur firebase storage
      imgRef.put(photo);
    }
    nouveauCocktail.append("photo", refImageCocktail);
    // nouveauCocktail.photo = refImageCocktail;

    const verre = document.getElementById("verre-nv").value;
    if (verre === "" || !verre) {
      console.log("verre obligatoire");
      return;
    }
    nouveauCocktail.append("verre", verre);
    // nouveauCocktail.verre = verre;

    for (let i = 1; i <= nbIng; i++) {
      const ing = document.getElementById("input-ingredient-" + i);
      const quant = document.getElementById("quantite-ingredient-" + i);
      const unit = document.getElementById("unite-ingredient-" + i);

      if (ing.value && ing.value !== "") {
        tableauIng.push({
          nomIng: ing.value,
          quantiteIng: quant.value,
          uniteIng: unit.value
        });
      }
    }
    if (tableauIng.length === 0) {
      console.log("1 ingrédient minimum");
      return;
    }
    nouveauCocktail.append("ingredients", tableauIng);
    // nouveauCocktail.ingredients = tableauIng;

    for (let i = 1; i <= nbEtape; i++) {
      const etape = document.getElementById("etape-" + i);
      if (etape.value && etape.value !== "") tableauEtapes.push(etape.value);
    }

    if (tableauEtapes.length === 0) {
      console.log("1 étape minimum");
      return;
    }
    nouveauCocktail.append("etapes", tableauEtapes);
    // nouveauCocktail.etapes = tableauEtapes;
    console.log("nv cocktail : ", nouveauCocktail);

    /*   Axios({
      method: "post",
      url: `${apiBaseURL}/api/v1/gestion/cocktails`,
      data: nouveauCocktail
    })
      .then(reponse => {
        console.log(reponse);
      })
      .catch(error => {
        console.log("vous avez une erreur : ", error);
      }); */

    Axios.post(`${apiBaseURL}/api/v1/gestion/cocktails`, nouveauCocktail)
      .then(reponse => {
        console.log(reponse);
      })
      .catch(error => {
        console.log("vous avez une erreur : ", error);
      });
  };

  React.useEffect(() => {
    getAllVerres();
  }, []);

  return (
    <>
      {user && bar && bar.droits === true ? (
        <>
          <div id="titre-ajout-cocktail">Ajout de cocktail</div>
          <div id="nom-nv-cocktail">
            <TextField id="nom-nv" label="Nom du cocktail" />
          </div>
          <div id="div-photo">
            <div>Photo</div>
            <input
              type="file"
              id="photo-cocktail"
              name="photo-cocktail"
              accept="image/png, image/jpeg"
            />
          </div>

          {verres && (
            <div id="verre-nv-cocktail">
              <Autocomplete
                id="verre-nv"
                options={verres}
                getOptionLabel={option => option.nom}
                style={{ width: 300 }}
                renderInput={params => <TextField {...params} label="Verre" />}
              />
            </div>
          )}

          <div id="div-ingredients">
            <div id="ingr-bouton">
              <div>Ingrédients (10 maximum)</div>
              <button id="btn-ajout-supp" onClick={AjoutDivIngredient}>
                +
              </button>
              <button id="btn-ajout-supp" onClick={SupprimeDivIngredient}>
                -
              </button>
            </div>

            <div id="box-ingredient">{mesIngredients}</div>
          </div>

          <div id="div-etapes-preparation">
            <div id="etapes-bouton">
              <div>Etapes Préparation (6 maximum)</div>
              <button id="btn-ajout-supp" onClick={AjoutDivEtape}>
                +
              </button>
              <button id="btn-ajout-supp" onClick={SupprimeDivEtape}>
                -
              </button>
            </div>
            <div id="box-etapes">{mesEtapes}</div>
          </div>

          <button id="btn-ajout-nv-cocktail" onClick={ajoutCocktailBD}>
            Ajouter !!
          </button>
        </>
      ) : (
        <div>Vous devez avoir les droits pour accéder à cette page</div>
      )}
    </>
  );
};

export default AjoutCocktail;
