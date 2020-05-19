import React, { useState } from "react";
import { TextField, TextareaAutosize } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

import "./AjoutCocktail.css";
import "./AjoutCocktailDesktop.css";
import Axios from "axios";

/*, { useContext, useState } 
import { Button, TextField, TextareaAutosize, Input } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

import { AuthContext } from "../../context/authContext";
import { BarContext } from "../../context/barContext";

import "./Gestion.css";
import "./GestionDesktop.css";*/

// eslint-disable-next-line no-undef
const apiBaseURL = process.env.REACT_APP_BASE_API;

const AjoutCocktail = () => {
  const [verres, setVerres] = useState();
  const [ingredients, setIngredients] = useState();

  const getAllVerres = () => {
    // on récupère tous les verres existants dans la base de données
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

  React.useEffect(() => {
    getAllVerres();
    getAllIngredients();
  }, []);

  return (
    <>
      <div>Ajout de cocktail</div>
      {/* <form method="POST" id="ajout-cocktail"> */}
      <TextField id="nom-nv-cocktail" label="Nom du cocktail" />

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
        <Autocomplete
          id="verre-nv-cocktail"
          // freeSolo
          options={verres}
          getOptionLabel={option => option.nom}
          style={{ width: 300 }}
          renderInput={params => <TextField {...params} label="Verre" />}
        />
      )}

      <div id="div-ingredients">
        <div>Ingrédients</div>
        <div id="box-ingredient">
          <Autocomplete
            className="ingredient-nv-cocktail"
            freeSolo
            options={ingredients}
            getOptionLabel={option => option.nom}
            style={{ width: 300 }}
            renderInput={params => (
              <TextField {...params} label="Ingrédient 1" />
            )}
          />
          <Autocomplete
            className="ingredient-nv-cocktail"
            freeSolo
            options={ingredients}
            getOptionLabel={option => option.nom}
            style={{ width: 300 }}
            renderInput={params => (
              <TextField {...params} label="Ingrédient 2" />
            )}
          />
          <Autocomplete
            className="ingredient-nv-cocktail"
            freeSolo
            options={ingredients}
            getOptionLabel={option => option.nom}
            style={{ width: 300 }}
            renderInput={params => (
              <TextField {...params} label="Ingrédient 3" />
            )}
          />
          <Autocomplete
            className="ingredient-nv-cocktail"
            freeSolo
            options={ingredients}
            getOptionLabel={option => option.nom}
            style={{ width: 300 }}
            renderInput={params => (
              <TextField {...params} label="Ingrédient 4" />
            )}
          />
          <Autocomplete
            className="ingredient-nv-cocktail"
            freeSolo
            options={ingredients}
            getOptionLabel={option => option.nom}
            style={{ width: 300 }}
            renderInput={params => (
              <TextField {...params} label="Ingrédient 5" />
            )}
          />
          <Autocomplete
            className="ingredient-nv-cocktail"
            freeSolo
            options={ingredients}
            getOptionLabel={option => option.nom}
            style={{ width: 300 }}
            renderInput={params => (
              <TextField {...params} label="Ingrédient 6" />
            )}
          />
          {/* <TextField className="ingredient-nv-cocktail" label="ingrédient 6" /> */}
        </div>
        {/* <button
          onClick={() => {
            document.createElement("input");
          }}
        >
          Ajouter
        </button> */}
      </div>

      <div id="div-etapes-preparation">
        <div>Etapes de Préparation</div>
        <TextareaAutosize
          className="etape-nv-cocktail"
          rowsMin={2}
          aria-label="Etape 1"
          placeholder="Etape 1"
        />
        <TextareaAutosize
          className="etape-nv-cocktail"
          rowsMin={2}
          aria-label="Etape 2"
          placeholder="Etape 2"
        />
        <TextareaAutosize
          className="etape-nv-cocktail"
          rowsMin={2}
          aria-label="Etape 3"
          placeholder="Etape 3"
        />
        <TextareaAutosize
          className="etape-nv-cocktail"
          rowsMin={2}
          aria-label="Etape 4"
          placeholder="Etape 4"
        />
        <TextareaAutosize
          className="etape-nv-cocktail"
          rowsMin={2}
          aria-label="Etape 5"
          placeholder="Etape 5"
        />
        <TextareaAutosize
          className="etape-nv-cocktail"
          rowsMin={2}
          aria-label="Etape 6"
          placeholder="Etape 6"
        />
        {/* <button
          onClick={() => {
            document.createElement("input");
          }}
        >
          Ajouter
        </button> */}
      </div>

      <button>Ajouter !!</button>

      {/* </form> */}
    </>
  );

  /*  const { user } = useContext(AuthContext);
  const { bar } = useContext(BarContext);


  

  // console.log("verres : ", verres);

   */

  /*   return (
    {<>
      {user && bar && bar.droits === true ? (
        <>
          <div id="titre-ajout-cocktail">Ajout d&apos;un nouveau cocktail</div>
          <form id="ajout-cocktail">
            <TextField id="nom-nv-cocktail" label="Nom du cocktail" />

            <div id="div-photo">
              <div>Photo</div>
              <Button variant="contained" size="small">
                selectionnez un fichier
              </Button>
            </div>

            {verres && (
              <Autocomplete
                id="verre-nv-cocktail"
                // freeSolo
                options={verres}
                getOptionLabel={option => option.nom}
                style={{ width: 300 }}
                renderInput={params => <TextField {...params} label="verre" />}
              />
            )}

            <div>Ingrédients</div>

            <div id="etapes-preparation">
              <div id="titre-etapes-preparation">Etapes de préparation</div>
              <div id="etapes">
                <TextareaAutosize
                  className="text-etape"
                  rowsMin={2}
                  aria-label="Etape 1"
                  placeholder="Etape 1"
                />
                <TextareaAutosize
                  className="text-etape"
                  rowsMin={2}
                  aria-label="Etape 2"
                  placeholder="Etape 2"
                />
                <TextareaAutosize
                  className="text-etape"
                  rowsMin={2}
                  aria-label="Etape 3"
                  placeholder="Etape 3"
                />
                <TextareaAutosize
                  className="text-etape"
                  rowsMin={2}
                  aria-label="Etape 4"
                  placeholder="Etape 4"
                />
                <TextareaAutosize
                  className="text-etape"
                  rowsMin={2}
                  aria-label="Etape 5"
                  placeholder="Etape 5"
                />
                <TextareaAutosize
                  className="text-etape"
                  rowsMin={2}
                  aria-label="Etape 6"
                  placeholder="Etape 6"
                />
              </div>
            </div>
            <div id="btn-ajout-nouveau-cocktail">
              <Button variant="contained">
                c&apos;est parti pour l&apos;ajout !!
              </Button>
            </div>
          </form>
        </>
      ) : (
        <div>Seul l&apos;administrateur a accès à cette page</div>
      )}
    </>}
  ); */
};

export default AjoutCocktail;
