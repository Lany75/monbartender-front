import React, { useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import Axios from "axios";

import apiBaseURL from "../../env";
import { TextField } from "@material-ui/core";

import "./ModifierVerre.css";
import { AuthContext } from "../../context/authContext";
import { VerreContext } from "../../context/verreContext";

const ModifierVerre = () => {
  const { id } = useParams();
  const { accessToken } = useContext(AuthContext);
  const [verreModifie, setVerreModifie] = useState();
  const { listeVerres, setListeVerres } = useContext(VerreContext);
  let history = useHistory();

  const getVerreModifie = verreId => {
    Axios.get(`${apiBaseURL}/api/v1/verres/${verreId}`)
      .then(reponse => {
        setVerreModifie(reponse.data);
      })
      .catch(error => {
        console.log("vous avez une erreur : ", error);
      });
  };

  const modifierVerreBD = () => {
    const divNomVerre = document.getElementById("nom-verre-modifie");
    let verreExistant = false;

    if (divNomVerre.value !== "" && divNomVerre.value !== verreModifie.nom) {
      const nvNomVerre = {
        nom: divNomVerre.value.replace(
          /(^\w|\s\w)(\S*)/g,
          (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
        )
      };

      // On vérifie que le nom du verre n'existe pas déja
      for (let i = 0; i < listeVerres.length; i++) {
        if (listeVerres[i].nom === nvNomVerre.nom) {
          verreExistant = true;
        }
      }

      if (verreExistant === false) {
        Axios.put(`${apiBaseURL}/api/v1/verres/${id}`, nvNomVerre, {
          headers: {
            authorization: accessToken
          }
        }).then(reponse => {
          setListeVerres(reponse.data);
          history.push("/gestion");
        });
      } else {
        alert("MODIFICATION IMPOSSIBLE : ce nom de verre existe déja");
      }
    }
  };

  React.useEffect(() => {
    getVerreModifie(id);
  }, [id]);

  return (
    <>
      {verreModifie ? (
        verreModifie.length === 0 ? (
          <div>Ce verre n&apos;existe pas</div>
        ) : (
          <>
            <div id="titre-modif-verre">Modification du verre</div>
            <div id="donnees-verre">
              <div>id : {verreModifie.id}</div>
              <TextField
                id="nom-verre-modifie"
                label="Nom du verre"
                defaultValue={verreModifie.nom}
              />
            </div>
            <button id="btn-modif-verre" onClick={modifierVerreBD}>
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

export default ModifierVerre;
