/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";

import "./ListeCocktailsComponent.css";

// eslint-disable-next-line no-undef
const apiBaseURL = process.env.REACT_APP_BASE_API;

const ListeCocktailsComponent = ({ cocktails }) => {
  return (
    <>
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

export default ListeCocktailsComponent;
