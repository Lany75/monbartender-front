import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";

import apiBaseURL from "../../env";

import ImageCocktail from "../imageCocktail/ImageCocktail";

import "./PageRecette.css";
import "./PageRecetteDesktop.css";

const PageRecette = () => {
  const [recetteCocktail, setRecetteCocktail] = useState();
  const [nbrVerre, setNbrVerre] = useState(1);
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

  const recupererNbrVerre = () => {
    setNbrVerre(parseInt(document.getElementById("nbr-verre").value));
  };

  React.useEffect(() => {
    getRecetteCocktail(id);
  }, [id]);

  return recetteCocktail ? (
    recetteCocktail.length === 0 ? (
      <div>Ce cocktail n&apos;existe pas</div>
    ) : (
      <div id="recette-cocktail">
        <div id="titre-cocktail">{recetteCocktail.nom.toUpperCase()}</div>
        <ImageCocktail
          classe="img-cocktail"
          reference={recetteCocktail.photo}
          nom={recetteCocktail.nom}
        />
        <div id="ingredients-verre">
          <div id="liste-ingredients">
            <div id="titre-quantite">
              <div id="titre-ingredients">Ingredients</div>
              <div>
                <select id="nbr-verre" onChange={recupererNbrVerre}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
            </div>
            {recetteCocktail.ingredients.map((rc, index) => {
              return (
                <div className="ingredient" key={index}>
                  <div>{rc.nom} </div>
                  {rc.quantite && (
                    <>
                      <div>&nbsp;({rc.quantite * nbrVerre}</div>
                      <div>&nbsp;{rc.unite})</div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
          <div id="verre">
            <div id="titre-verre">Verre</div>
            <div id="nom-verre">{recetteCocktail.verre.nom}</div>
          </div>
        </div>
        <div className="etapes-preparation">
          <div id="titre-preparation">Preparation</div>
          <div id="etapes">
            {recetteCocktail.etapesPreparation.map((rc, index) => {
              return (
                <div className="num-etape" key={index}>
                  <div className="titre-etape">Etape {index + 1} : </div>
                  <div className="texte-etape">{rc.texte}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    )
  ) : (
    <div>Chargement</div>
  );
};

export default PageRecette;
