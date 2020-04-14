import React from "react";
//import { Link } from "react-router-dom";

const Gestion = () => {
  return (
    <div>
      <div>Gestion</div>
      <div id="gestion-cocktail-moment">
        <div>Cocktail du moment</div>

        {/* <Link to="/gestion/cocktail-moment">modification cocktail du moment</Link> */}
      </div>
    </div>
  );
};

/* import React, { useContext, useState } from "react";
import { Button, TextField, TextareaAutosize, Input } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

import { AuthContext } from "../../context/authContext";
import { BarContext } from "../../context/barContext";

import "./Gestion.css";
import "./GestionDesktop.css";

// eslint-disable-next-line no-undef
const apiBaseURL = process.env.REACT_APP_BASE_API;

const Gestion = () => {
  const { user } = useContext(AuthContext);
  const { bar } = useContext(BarContext);
  const [verres, setVerres] = useState();

  const getAllVerres = () => {
    // on récupère tous les verres existants dans la base de données

    fetch(`${apiBaseURL}/api/verres/`, {
      method: "GET"
    })
      .then(reponse => {
        return reponse.json();
      })
      .then(data => {
        setVerres(data);
      })
      .catch(error => {
        console.log("vous avez une erreur : ", error);
      });
  };

  // console.log("verres : ", verres);

  React.useEffect(() => {
    getAllVerres();
  }, []);

  return (
    <>
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
    </>
  );
};*/

export default Gestion;
