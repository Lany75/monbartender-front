import React, { useState } from "react";

import apiBaseURL from "../../env";
import Axios from "axios";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField, Button } from "@material-ui/core";

import "./AjoutAdmin.css";
import { useHistory } from "react-router-dom";

const AjoutAdmin = () => {
  const [listeUsers, setListeUsers] = useState();
  let history = useHistory();

  const ajoutAdmin = () => {
    const nvAdmin = document.getElementById("users").value;

    if (nvAdmin !== "") {
      Axios.put(`${apiBaseURL}/api/v1/gestion/admin/${nvAdmin}`, {
        action: "ajouter"
      });
      history.push("/gestion");
    }
  };

  const getUsersList = () => {
    Axios.get(`${apiBaseURL}/api/v1/gestion/users/`)
      .then(reponse => {
        setListeUsers(reponse.data);
      })
      .catch(error => {
        console.log("vous avez une erreur : ", error);
      });
  };

  React.useEffect(() => {
    getUsersList();
  }, []);

  return listeUsers ? (
    <>
      <div id="titre-admin-ajoute">Ajout d&apos;un admin</div>
      <div>
        <Autocomplete
          id="users"
          options={listeUsers}
          getOptionLabel={option => option.personneId}
          style={{ width: 300 }}
          renderInput={params => <TextField {...params} label="nouvel admin" />}
        />
      </div>

      <Button id="bouton-ajout-admin" variant="contained" onClick={ajoutAdmin}>
        Valider l&apos;ajout
      </Button>
    </>
  ) : (
    <div>Chargement</div>
  );
};

export default AjoutAdmin;
