import React, { useState } from "react";
import { useParams } from "react-router-dom";

import "./PageRecette.css";
import "./PageRecetteDesktop.css";
import Axios from "axios";

// eslint-disable-next-line no-undef
const apiBaseURL = process.env.REACT_APP_BASE_API;

const initialState = {
  nom: "",
  photo: "",
  etapesPreparation: "",
  Verre: {
    nom: ""
  },
  Ingredients: [
    {
      nom: ""
    }
  ]
};

const PageRecette = () => {
  const [recetteCocktail, setRecetteCocktail] = useState(initialState);
  const { id } = useParams();

  const getRecetteCocktail = cocktailId => {
    Axios.get(`${apiBaseURL}/api/v1/cocktails/${cocktailId}`)
      .then(reponse => {
        setRecetteCocktail(reponse.data);
      })
      .catch(error => {
        console.log("vous avez une erreur : ", error);
      });
  };

  React.useEffect(() => {
    getRecetteCocktail(id);
  }, [id]);

  return (
    <div id="recette-cocktail">
      <div id="titre-cocktail">{recetteCocktail.nom}</div>
      <img
        className="img-cocktail-recette"
        src={`${apiBaseURL}${recetteCocktail.photo}`}
        alt={recetteCocktail.nom}
      />
      <div id="ingredients-verre">
        <div id="liste-ingredients">
          <div id="titre-ingredients">Ingredients</div>
          {recetteCocktail.Ingredients &&
            recetteCocktail.Ingredients.map((rc, index) => {
              return (
                <div className="ingredient" key={index}>
                  {rc.nom}
                </div>
              );
            })}
        </div>
        <div id="verre">
          <div id="titre-verre">Verre</div>
          <div id="nom-verre">{recetteCocktail.Verre.nom}</div>
        </div>
      </div>
      <div className="etapes-preparation">
        <div id="titre-preparation">Preparation</div>
        <div id="etapes">
          {recetteCocktail.EtapesPreparation &&
            recetteCocktail.EtapesPreparation.etape1 && (
              <div className="num-etape">
                <div className="titre-etape">Etape 1 : </div>
                <div className="texte-etape">
                  {recetteCocktail.EtapesPreparation &&
                    recetteCocktail.EtapesPreparation.etape1}
                </div>
              </div>
            )}
          {recetteCocktail.EtapesPreparation &&
            recetteCocktail.EtapesPreparation.etape2 && (
              <div className="num-etape">
                <div className="titre-etape">Etape 2 : </div>
                <div className="texte-etape">
                  {recetteCocktail.EtapesPreparation &&
                    recetteCocktail.EtapesPreparation.etape2}
                </div>
              </div>
            )}
          {recetteCocktail.EtapesPreparation &&
            recetteCocktail.EtapesPreparation.etape3 && (
              <div className="num-etape">
                <div className="titre-etape">Etape 3 : </div>
                <div className="texte-etape">
                  {recetteCocktail.EtapesPreparation &&
                    recetteCocktail.EtapesPreparation.etape3}
                </div>
              </div>
            )}
          {recetteCocktail.EtapesPreparation &&
            recetteCocktail.EtapesPreparation.etape4 && (
              <div className="num-etape">
                <div className="titre-etape">Etape 4 : </div>
                <div className="texte-etape">
                  {recetteCocktail.EtapesPreparation &&
                    recetteCocktail.EtapesPreparation.etape4}
                </div>
              </div>
            )}
          {recetteCocktail.EtapesPreparation &&
            recetteCocktail.EtapesPreparation.etape5 && (
              <div className="num-etape">
                <div className="titre-etape">Etape 5 : </div>
                <div className="texte-etape">
                  {recetteCocktail.EtapesPreparation &&
                    recetteCocktail.EtapesPreparation.etape5}
                </div>
              </div>
            )}
          {recetteCocktail.EtapesPreparation &&
            recetteCocktail.EtapesPreparation.etape6 && (
              <div className="num-etape">
                <div className="titre-etape">Etape 6 : </div>
                <div className="texte-etape">
                  {recetteCocktail.EtapesPreparation &&
                    recetteCocktail.EtapesPreparation.etape6}
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default PageRecette;
