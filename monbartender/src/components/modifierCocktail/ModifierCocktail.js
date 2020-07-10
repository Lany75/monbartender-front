import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { TextField } from "@material-ui/core";

//import { firebase } from "../../firebaseConfig";
import apiBaseURL from "../../env";

import "./ModifierCocktail.css";

import { AuthContext } from "../../context/authContext";

const ModifierCocktail = () => {
  // let history = useHistory();
  const { accessToken } = useContext(AuthContext);

  const [cocktailModifie, setCocktailModifie] = useState();
  // const [imgUrl, setImgUrl] = useState();
  const { id } = useParams();

  const getCocktailModifie = cocktailId => {
    Axios.get(`${apiBaseURL}/api/v1/cocktails/${cocktailId}`)
      .then(reponse => {
        setCocktailModifie(reponse.data);
        // console.log(reponse.data.photo);
        //getImageFirebase(reponse.data.photo);
      })
      .catch(error => {
        console.log("vous avez une erreur : ", error);
      });
  };

  /*  const getImageFirebase = async reference => {
    const imgRef = firebase.storage().ref(reference);
    await imgRef.getDownloadURL().then(url => {
      setImgUrl(url);
    });
  }; */

  const modifierCocktailBD = () => {
    const donneesCocktail = { id: cocktailModifie.id, nom: "" };

    const divNomCocktail = document.getElementById("nom-cocktail");
    if (
      divNomCocktail.value !== "" &&
      divNomCocktail.value !== cocktailModifie.nom
    ) {
      donneesCocktail.nom = divNomCocktail.value.replace(
        /(^\w|\s\w)(\S*)/g,
        (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
      );
    }

    console.log(donneesCocktail);

    if (donneesCocktail.nom !== "") {
      console.log("on fait un Axios pour modifier le cocktail");
      Axios.put(`${apiBaseURL}/api/v1/gestion/cocktails`, donneesCocktail, {
        headers: {
          authorization: accessToken
        }
      })
        .then(reponse => {
          // console.log(reponse.data);
          setCocktailModifie(reponse.data);
        })
        .catch(error => {
          console.log("vous avez une erreur : ", error);
        });
    }
    //history.push("/gestion");
  };

  React.useEffect(() => {
    getCocktailModifie(id);
  }, [id]);

  //console.log(cocktailModifie);

  return (
    <>
      {cocktailModifie ? (
        <>
          <div id="titre-modif-cocktail">Modification du cocktail</div>
          <div id="donnees-cocktails">
            <div>id : {cocktailModifie.id}</div>
            <TextField
              id="nom-cocktail"
              label="Nom du cocktail"
              defaultValue={cocktailModifie.nom}
            />
            {/*<div>
              <div>photo:</div>
              <img
                id="img-cocktail-modif"
                src={imgUrl}
                alt={cocktailModifie.nom}
              />
              <input
                type="file"
                name="photo-cocktail"
                accept="image/png, image/jpeg"
              />
            </div>
            <input type="text" defaultValue={cocktailModifie.Verre.nom} />
            <div>
              <div>ingrédients : </div>
              <ul>
                {cocktailModifie.Ingredients &&
                  cocktailModifie.Ingredients.map((i, index) => {
                    return <li key={index}>{i.nom}</li>;
                  })}
              </ul>
            </div>
            <div>
              <div>étapes de préparation : </div>
              <div>
                {cocktailModifie.EtapesPreparations &&
                  cocktailModifie.EtapesPreparations.map((ep, index) => {
                    return (
                      <div key={index}>
                        {ep.numEtape} - {ep.texte}
                      </div>
                    );
                  })}
              </div>
            </div>*/}
          </div>
          <button id="btn-modif-cocktail" onClick={modifierCocktailBD}>
            Modifier !!
          </button>
        </>
      ) : (
        <div>chargement</div>
      )}
    </>
  );
};

export default ModifierCocktail;
