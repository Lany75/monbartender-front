import React, { useState } from "react";
import Axios from "axios";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import "./GestionAdmin.css";
import "./GestionAdminDesktop.css";

import apiBaseURL from "../../env";
import { useHistory } from "react-router-dom";

const GestionAdmin = () => {
  const [listeAdmin, setListeAdmin] = useState();
  let history = useHistory();

  const ajouterAdmin = () => {
    history.push("/gestion/ajouter-admin");
  };

  const supprimerAdmin = mail => {
    Axios.put(`${apiBaseURL}/api/v1/gestion/admin/${mail}`, {
      action: "supprimer"
    }).then(reponse => {
      setListeAdmin(reponse.data);
    });
  };

  const getListeAdmin = () => {
    Axios.get(`${apiBaseURL}/api/v1/gestion/admin/`)
      .then(reponse => {
        setListeAdmin(reponse.data);
      })
      .catch(error => {
        console.log("vous avez une erreur : ", error);
      });
  };

  React.useEffect(() => {
    getListeAdmin();
  }, []);

  return (
    <div id="gestion-admin">
      <div id="titre-btn-admin">
        <div id="titre-ajout-admin">Liste admin</div>
        <AddCircleIcon id="icon-ajout-admin" onClick={ajouterAdmin} />
      </div>
      <div id="items-admin">
        {listeAdmin &&
          listeAdmin.map((la, index) => {
            return (
              <div className="item-admin" key={index}>
                <div id="nom-admin-gestion">{la.personneId}</div>
                <div>
                  <DeleteForeverIcon
                    id="icon-suppression-admin"
                    onClick={() => supprimerAdmin(la.personneId)}
                  />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default GestionAdmin;
