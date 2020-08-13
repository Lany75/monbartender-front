import React, { useState, useContext } from "react";
import { TextField } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Axios from "axios";

import { AuthContext } from "../../context/authContext";
import { BarContext } from "../../context/barContext";
import { VerreContext } from "../../context/verreContext";

import apiBaseURL from "../../env";

import "./AjoutVerre.css";

const AjoutVerre = () => {
  const { user, accessToken } = useContext(AuthContext);
  const { bar } = useContext(BarContext);
  const { setListeVerres } = useContext(VerreContext);

  let history = useHistory();

  const [nbVerre, setNbVerre] = useState(1);
  const lesVerres = [];
  const tableauVerresAjoute = [];

  for (let i = 1; i <= nbVerre; i++) {
    const id = "nom-verre-" + i;
    const label = "Nom Verre " + i;
    lesVerres.push(<TextField id={id} key={i} label={label} />);
  }

  const ajoutVerreBD = () => {
    for (let i = 1; i <= nbVerre; i++) {
      const verreAjoute = document.getElementById("nom-verre-" + i);
      if (verreAjoute.value !== "")
        tableauVerresAjoute.push({
          nom: verreAjoute.value.replace(
            /(^\w|\s\w)(\S*)/g,
            (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
          )
        });
    }
    if (tableauVerresAjoute.length > 0) {
      tableauVerresAjoute.map(va => {
        Axios.post(
          `${apiBaseURL}/api/v1/verres?nom=${va.nom}`,
          {},
          {
            headers: {
              authorization: accessToken
            }
          }
        )
          .then(reponse => {
            setListeVerres(reponse.data);
          })
          .catch(error => {
            console.log("vous avez une erreur : ", error);
          });
      });
    }
    history.push("/gestion");
  };

  const AjoutDivVerre = () => {
    if (nbVerre < 10) setNbVerre(nbVerre + 1);
  };
  const SupprimeDivVerre = () => {
    if (nbVerre > 1) setNbVerre(nbVerre - 1);
  };

  return (
    <>
      {user && bar && bar.droits === true ? (
        <>
          <div id="titre-verre-ajoute">Ajout de verre</div>
          <div id="verre-bouton">
            <button id="btn-ajout-supp" onClick={AjoutDivVerre}>
              +
            </button>
            <button id="btn-ajout-supp" onClick={SupprimeDivVerre}>
              -
            </button>
          </div>
          <div id="box-verre">{lesVerres}</div>

          <button id="btn-ajout-nv-verre" onClick={ajoutVerreBD}>
            Ajouter !!
          </button>
        </>
      ) : (
        <div>Vous devez avoir les droits pour accéder à cette page</div>
      )}
    </>
  );
};

export default AjoutVerre;
