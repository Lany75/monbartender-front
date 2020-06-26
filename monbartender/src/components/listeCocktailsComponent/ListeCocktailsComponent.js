/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";

import "./ListeCocktailsComponent.css";
import "./ListeCocktailsComponentDesktop.css";
import ImageCocktail from "../imageCocktail/ImageCocktail";

const ListeCocktailsComponent = ({ cocktails }) => {
  return (
    <div id="liste-cocktails">
      {cocktails &&
        cocktails.map((c, index) => {
          const to = "/cocktail/" + c.id;

          return (
            <Link to={to} key={index}>
              <div className="cocktail">
                <ImageCocktail
                  classe="img-cocktail"
                  reference={c.photo}
                  nom={c.nom}
                />
                <div className="nom-cocktail">{c.nom}</div>
              </div>
            </Link>
          );
        })}
    </div>
  );
};

export default ListeCocktailsComponent;
