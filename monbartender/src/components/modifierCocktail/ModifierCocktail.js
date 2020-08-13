import React, { useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import Axios from "axios";
import { TextField } from "@material-ui/core";

import { firebase, refStorage } from "../../firebaseConfig";
import apiBaseURL from "../../env";

import "./ModifierCocktail.css";

import { AuthContext } from "../../context/authContext";
import { CocktailContext } from "../../context/cocktailContext";
//import Autocomplete from "@material-ui/lab/Autocomplete";

const ModifierCocktail = () => {
  let history = useHistory();
  const { accessToken } = useContext(AuthContext);
  const { setListeCocktails, getCocktailsMoment } = useContext(CocktailContext);

  const [cocktailModifie, setCocktailModifie] = useState();
  const [imgUrl, setImgUrl] = useState();
  // const [verres, setVerres] = useState();
  const { id } = useParams();

  const getCocktailModifie = cocktailId => {
    Axios.get(`${apiBaseURL}/api/v1/cocktails/${cocktailId}`)
      .then(reponse => {
        setCocktailModifie(reponse.data);
        getImageFirebase(reponse.data.photo);
      })
      .catch(error => {
        console.log("vous avez une erreur : ", error);
      });
  };

  const getImageFirebase = async reference => {
    const imgRef = firebase.storage().ref(reference);
    await imgRef.getDownloadURL().then(url => {
      setImgUrl(url);
    });
  };

  const putCocktail = donneesCocktail => {
    Axios.put(`${apiBaseURL}/api/v1/gestion/cocktails`, donneesCocktail, {
      headers: {
        authorization: accessToken
      }
    })
      .then(reponse => {
        setListeCocktails(reponse.data);
        getCocktailsMoment();
      })
      .catch(error => {
        console.log("vous avez une erreur : ", error);
      });
  };

  const modifierCocktailBD = () => {
    const donneesCocktail = { id: cocktailModifie.id, nom: "", photo: "" };
    let refImageCocktail;
    let upload;

    //modification du nom
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

    //modification de l'image du cocktail
    const photo = document.getElementById("photo-cocktail").files[0];

    if (photo) {
      refImageCocktail = "img_cocktail/" + photo.name;
      // initialisation de la référence de l'image
      const imgRef = refStorage.child("img_cocktail/" + photo.name);
      //envoi de la nouvelle photo sur firebase storage
      upload = imgRef.put(photo);

      upload.on(
        "state_changed",

        function progress() {},
        function error() {
          console.log("error uploading file");
        },
        function complete() {
          donneesCocktail.photo = refImageCocktail;

          if (donneesCocktail.nom !== "" || donneesCocktail.photo !== "") {
            putCocktail(donneesCocktail);
          }
        }
      );
    } else {
      if (donneesCocktail.nom !== "" || donneesCocktail.photo !== "") {
        putCocktail(donneesCocktail);
      }
    }

    // console.log(donneesCocktail);

    history.push("/gestion");
  };

  React.useEffect(() => {
    getCocktailModifie(id);
    // getAllVerres();
  }, [id]);

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
            <div>
              <div>photo:</div>
              <img
                id="img-cocktail-modif"
                src={imgUrl}
                alt={cocktailModifie.nom}
              />
              <input
                id="photo-cocktail"
                type="file"
                name="photo-cocktail"
                accept="image/png, image/jpeg"
              />
            </div>

            {/* <div>
              <div>Verre : {cocktailModifie.Verre.nom} </div>

              {verres && (
                <div id="verre-nv-cocktail">
                  <Autocomplete
                    id="verre-nv"
                    options={verres}
                    getOptionLabel={option => option.nom}
                    style={{ width: 300 }}
                    renderInput={params => (
                      <TextField {...params} label="Verre" />
                    )}
                  />
                </div>
              )}
            </div> */}
            {/*  <div>
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
