import React from "react";

const ListeRecettesParNom = () => {
  return (
    <>
      <h2>Liste des recettes</h2>
      <div className="listeCocktails">
        {cocktails &&
          cocktails.map((c, index) => {
            const to = "/" + c.id;

            return (
              <Link to={to} key={index}>
                <div className="cocktail">
                  <img
                    className="imagePageListeRecette"
                    src={`${apiBaseURL}${c.photo}`}
                    alt="un cocktail"
                  />
                  <div className="nomcocktail">{c.nom}</div>
                </div>
              </Link>
            );
          })}
      </div>
    </>
  );
};

export default ListeRecettesParNom;
