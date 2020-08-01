import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";

import apiBaseURL from "../../env";
import { TextField } from "@material-ui/core";

import "./ModifierVerre.css";

const ModifierVerre = () => {
  const { id } = useParams();
  const [verreModifie, setVerreModifie] = useState();

  const getVerreModifie = verreId => {
    Axios.get(`${apiBaseURL}/api/v1/verres/${verreId}`)
      .then(reponse => {
        setVerreModifie(reponse.data);
      })
      .catch(error => {
        console.log("vous avez une erreur : ", error);
      });
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
            <button id="btn-modif-verre" /* onClick={modifierCocktailBD} */>
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
