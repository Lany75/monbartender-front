/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";

import "./ListeCocktailsComponent.css";
import "./ListeCocktailsComponentDesktop.css";

// eslint-disable-next-line no-undef
const apiBaseURL = process.env.REACT_APP_BASE_API;

const ListeCocktailsComponent = ({ cocktails }) => {
  return (
    <>
      <div id="liste-cocktails">
        {cocktails &&
          cocktails.map((c, index) => {
            const to = "/cocktail/" + c.id;

            return (
              <Link to={to} key={index}>
                <div className="cocktail">
                  <img
                    className="img-cocktail"
                    src={`${apiBaseURL}${c.photo}`}
                    alt="un cocktail"
                  />
                  <div className="nom-cocktail">{c.nom}</div>
                </div>
              </Link>
            );
          })}
      </div>
    </>
  );
};

export default ListeCocktailsComponent;
