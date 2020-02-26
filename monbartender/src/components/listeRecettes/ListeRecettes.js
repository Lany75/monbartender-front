import React, { useState } from "react";

import "./ListeRecettes.css";

const ListeRecettes = () => {
  const [cocktails, setCocktails] = useState([]);

  const getCocktailsdata = () => {
    fetch("/api/cocktails")
      .then(reponse => {
        return reponse.json();
      })
      .then(data => {
        console.log(data);
        setCocktails(data);

        /*const [{ id, nom, photo, etapesPreparation }] = data;
        console.log("id", id);
        console.log("nom", nom);
        console.log("photo", photo);
        console.log("etapesPreparation", etapesPreparation);*/

        //setCocktails(data);
        //console.log("cocktails : ", cocktails);
      })
      .catch(error => {
        console.log("vous avez une erreur : ", error);
      });
  };
  React.useEffect(() => {
    getCocktailsdata();
  }, []);

  return (
    <>
      <h2>Liste des recettes</h2>
      <div className="listeCocktails">
        {cocktails &&
          cocktails.map((c, index) => {
            return (
              <div className='cocktail' key={index}>
                <img className="imagecocktail" src={c.photo} />
                <div className="nomcocktail">{c.nom}</div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ListeRecettes;
