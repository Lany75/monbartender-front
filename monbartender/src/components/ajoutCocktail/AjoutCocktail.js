import React, { useState, useContext } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import {
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

import { refStorage } from "../../firebaseConfig";
import apiBaseURL from "../../env";

import { AuthContext } from "../../context/authContext";
import { BarContext } from "../../context/barContext";
import { CocktailContext } from "../../context/cocktailContext";
import { VerreContext } from "../../context/verreContext";

import IngredientNvCockComponent from "../ingredientNvCockComponent/IngredientNvCockComponent";

import "./AjoutCocktail.css";
import "./AjoutCocktailDesktop.css";

const AjoutCocktail = () => {
  let history = useHistory();
  const { user, accessToken } = useContext(AuthContext);
  const { bar } = useContext(BarContext);
  const { setListeCocktails } = useContext(CocktailContext);
  const { listeVerres } = useContext(VerreContext);
  const [nbIng, setNbIng] = useState(1);
  const [nbEtape, setNbEtape] = useState(1);
  const tableauIng = [];
  const tableauEtapes = [];
  const mesIngredients = [];
  const mesEtapes = [];
  const [valueRadioButton, setValueRadioButton] = React.useState("Aalcool");

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

  const postNvCocktail = nouveauCocktail => {
    Axios.post(`${apiBaseURL}/api/v1/gestion/cocktails`, nouveauCocktail, {
      headers: {
        authorization: accessToken
      }
    })
      .then(reponse => {
        setListeCocktails(reponse.data);
      })
      .catch(error => {
        console.log("vous avez une erreur : ", error);
      });

    history.push("/gestion");
  };

  const ajoutCocktailBD = () => {
    const nouveauCocktail = {
      nom: "",
      alcoolise: "",
      photo: "",
      verre: "",
      ingredients: [{ nomIng: "", quantiteIng: "", uniteIng: "" }],
      etapes: []
    };
    let refImageCocktail;
    let upload;

    // vérification du nom du cocktail
    const divNomCocktail = document.getElementById("nom-nv");
    if (divNomCocktail.value === "" || !divNomCocktail.value) {
      divNomCocktail.style.border = "solid 1px red";
    } else {
      divNomCocktail.style.border = "none";
      // transformation de la 1ere lettre de chauqe mot du nom en majuscule, le reste en minuscule
      nouveauCocktail.nom = divNomCocktail.value.replace(
        /(^\w|\s\w)(\S*)/g,
        (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
      );
    }

    // récupération de la valeur des boutons radio (alcoolisé ou non)
    if (valueRadioButton === "Aalcool") nouveauCocktail.alcoolise = true;
    else nouveauCocktail.alcoolise = false;

    // vérification du verre du cocktail
    const divVerre = document.getElementById("verre-nv");
    if (divVerre.value === "" || !divVerre.value) {
      divVerre.style.border = "solid 1px red";
    } else {
      divVerre.style.border = "none";
      nouveauCocktail.verre = divVerre.value;
    }

    // vérification des ingrédients du cocktail
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

    for (let i = 0; i < tableauIng.length; i++) {
      for (let j = i + 1; j < tableauIng.length; j++) {
        if (tableauIng[i].nomIng === tableauIng[j].nomIng) {
          tableauIng.splice(j, 1);
        }
      }
    }

    const divIngredient = document.getElementById("input-ingredient-1");
    if (tableauIng.length === 0) {
      divIngredient.style.border = "solid 1px red";
    } else {
      divIngredient.style.border = "none";
      nouveauCocktail.ingredients = tableauIng;
    }

    // vérification des étapes du cocktail
    for (let i = 1; i <= nbEtape; i++) {
      const etape = document.getElementById("etape-" + i);
      if (etape.value && etape.value !== "") tableauEtapes.push(etape.value);
    }

    const divEtape = document.getElementById("etape-1");
    if (tableauEtapes.length === 0) {
      divEtape.style.border = "solid 1px red";
    } else {
      divEtape.style.border = "none";
      nouveauCocktail.etapes = tableauEtapes;
    }

    // gestion de la photo
    const photo = document.getElementById("photo-cocktail").files[0];
    if (!photo) {
      refImageCocktail = "img_cocktail/michaelOeser.jpg";
      nouveauCocktail.photo = refImageCocktail;

      if (
        nouveauCocktail.nom !== "" &&
        nouveauCocktail.verre !== "" &&
        nouveauCocktail.ingredients[0] !== "" &&
        nouveauCocktail.etapes[0] !== ""
      ) {
        postNvCocktail(nouveauCocktail);
      }
    } else {
      refImageCocktail = "img_cocktail/" + photo.name;
      // initialisation de la référence de l'image
      const imgRef = refStorage.child(refImageCocktail);
      //envoi de la photo sur firebase storage
      upload = imgRef.put(photo);

      // fonction spéciale qui attend que la photo soit postée sur firebase avant de faire la suite
      upload.on(
        "state_changed",

        function progress() {},
        function error() {
          console.log("error uploading file");
        },
        function complete() {
          nouveauCocktail.photo = refImageCocktail;

          if (
            nouveauCocktail.nom !== "" &&
            nouveauCocktail.verre !== "" &&
            nouveauCocktail.ingredients[0] !== "" &&
            nouveauCocktail.etapes[0] !== ""
          ) {
            postNvCocktail(nouveauCocktail);
          }
        }
      );
    }
  };

  const handleChangeRadioButton = event => {
    setValueRadioButton(event.target.value);
  };

  return (
    <>
      {user && bar && bar.droits === true ? (
        <>
          <div id="titre-ajout-cocktail">Ajout de cocktail</div>
          <div id="nom-alcool">
            <div id="nom-nv-cocktail">
              <TextField id="nom-nv" label="Nom du cocktail" />
            </div>
            <div id="groupe-boutons-radio">
              <RadioGroup
                id="bouton-radio"
                name="alcool"
                value={valueRadioButton}
                onChange={handleChangeRadioButton}
                row
              >
                <FormControlLabel
                  value="Aalcool"
                  control={<Radio />}
                  label="Avec alcool"
                />
                <FormControlLabel
                  value="Salcool"
                  control={<Radio />}
                  label="Sans alcool"
                />
              </RadioGroup>
            </div>
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

          {listeVerres && (
            <div id="verre-nv-cocktail">
              <Autocomplete
                id="verre-nv"
                options={listeVerres}
                getOptionLabel={option => option.nom}
                style={{ width: 300 }}
                renderInput={params => <TextField {...params} label="Verre" />}
              />
            </div>
          )}

          <div id="div-ingredients">
            <div id="ingr-bouton">
              <div>Ingrédients (10 maximum)</div>
              <Button
                id="btn-ajout-supp"
                variant="contained"
                onClick={AjoutDivIngredient}
              >
                +
              </Button>
              <Button
                id="btn-ajout-supp"
                variant="contained"
                onClick={SupprimeDivIngredient}
              >
                -
              </Button>
            </div>

            <div id="box-ingredient">{mesIngredients}</div>
          </div>

          <div id="div-etapes-preparation">
            <div id="etapes-bouton">
              <div>Etapes Préparation (6 maximum)</div>
              <Button
                id="btn-ajout-supp"
                variant="contained"
                onClick={AjoutDivEtape}
              >
                +
              </Button>
              <Button
                id="btn-ajout-supp"
                variant="contained"
                onClick={SupprimeDivEtape}
              >
                -
              </Button>
            </div>
            <div id="box-etapes">{mesEtapes}</div>
          </div>
          <Button
            id="btn-ajout-nv-cocktail"
            variant="contained"
            onClick={ajoutCocktailBD}
          >
            Ajouter !!
          </Button>
        </>
      ) : (
        <div>Vous devez avoir les droits pour accéder à cette page</div>
      )}
    </>
  );
};

export default AjoutCocktail;
